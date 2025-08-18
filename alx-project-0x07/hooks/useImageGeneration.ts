import { useState, useCallback, useEffect, useRef } from 'react';
import { ImageData } from '@/interfaces';
import { API_ENDPOINTS, APP_CONSTANTS, ERROR_MESSAGES } from '@/constants';
import { v4 as uuidv4 } from 'uuid';

interface UseImageGenerationReturn {
  // State
  prompt: string;
  setPrompt: (prompt: string) => void;
  loading: boolean;
  error: string | null;
  generatedImages: ImageData[];
  selectedImage: ImageData | null;
  showModal: boolean;
  
  // Actions
  generateImage: (promptText: string) => Promise<ImageData | null>;
  handleImageClick: (image: ImageData) => void;
  closeModal: () => void;
  clearError: () => void;
  retryLastGeneration: () => Promise<ImageData | null | undefined>;
}

const useImageGeneration = (): UseImageGenerationReturn => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Store the last prompt for retry functionality
  const lastPromptRef = useRef<string>('');

  // Load saved images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('generatedImages');
    if (savedImages) {
      try {
        setGeneratedImages(JSON.parse(savedImages));
      } catch (err) {
        console.error('Failed to load saved images', err);
      }
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (generatedImages.length > 0) {
      localStorage.setItem('generatedImages', JSON.stringify(generatedImages));
    }
  }, [generatedImages]);

  const generateImage = useCallback(async (promptText: string): Promise<ImageData | null> => {
    if (!promptText.trim()) {
      setError(ERROR_MESSAGES.INVALID_INPUT);
      return null;
    }

    // Store the current prompt for potential retry
    lastPromptRef.current = promptText.trim();
    
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.GENERATE_IMAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: lastPromptRef.current,
          n: 1,
          size: APP_CONSTANTS.DEFAULT_IMAGE_SIZE,
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(ERROR_MESSAGES.RATE_LIMIT);
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || ERROR_MESSAGES.IMAGE_GENERATION_FAILED);
      }

      const data = await response.json();
      
      // Add timestamp and ID to the image data
      const newImage = {
        ...data.data[0],
        id: uuidv4(),
        createdAt: Date.now(),
        prompt: lastPromptRef.current,
      };
      
      const newImages = [newImage, ...generatedImages];
      setGeneratedImages(newImages);
      
      // Clear the prompt after successful generation
      setPrompt('');
      
      return newImage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.GENERIC;
      setError(errorMessage);
      console.error('Error generating image:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [generatedImages]);

  const handleImageClick = useCallback((image: ImageData) => {
    setSelectedImage(image);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedImage(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Function to retry the last image generation
  const retryLastGeneration = useCallback(async () => {
    if (lastPromptRef.current) {
      return generateImage(lastPromptRef.current);
    }
  }, [generateImage]);

  return {
    // State
    prompt,
    setPrompt,
    loading,
    error,
    generatedImages,
    selectedImage,
    showModal,
    
    // Actions
    generateImage,
    handleImageClick,
    closeModal,
    clearError,
    retryLastGeneration,
  };
};

export default useImageGeneration;
