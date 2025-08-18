import React, { useState, useEffect } from 'react';
import ImageCard from '@/components/common/ImageCard';
import Alert from '@/components/common/Alert';
import useImageGeneration from '@/hooks/useImageGeneration';
import { ERROR_MESSAGES } from '@/constants';

const Home: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'error' | 'success' | 'info' | 'warning'>('error');
  const [alertMessage, setAlertMessage] = useState('');

  const {
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
  } = useImageGeneration();

  // Show alert when there's an error
  useEffect(() => {
    if (error) {
      setAlertType('error');
      setAlertMessage(error);
      setShowAlert(true);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      const result = await generateImage(prompt);
      if (result) {
        setAlertType('success');
        setAlertMessage('Image generated successfully!');
        setShowAlert(true);
      }
    }
  };

  const handleDismissAlert = () => {
    setShowAlert(false);
    clearError();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <Alert 
            type={alertType}
            message={alertMessage}
            onDismiss={handleDismissAlert}
            autoDismiss={alertType !== 'error'}
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Generate Stunning AI Images
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Create beautiful, unique images with the power of AI. Just describe what you want to see!
          </p>
          <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
            Transform your ideas into stunning AI-generated images with a simple text prompt.
          </p>
        </div>
      </div>

      {/* Generation Form */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-white shadow-xl rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Describe the image you want to generate
              </label>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="A futuristic city at sunset, digital art"
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : 'Generate'}
                  </button>
                </div>
                {error && (
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-red-600">{error}</span>
                    <button 
                      type="button" 
                      onClick={clearError}
                      className="ml-2 text-red-500 hover:text-red-700"
                      aria-label="Dismiss error"
                    >
                      &times;
                    </button>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No images yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by generating your first image above.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Generate First Image
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {generatedImages.map((image, index) => (
                  <div 
                    key={`${image.id}-${index}`} 
                    className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                      <ImageCard 
                        data={image} 
                        onClick={handleImageClick}
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {image.prompt || 'Generated image'}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(image.createdAt || Date.now()).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Image Modal */}
        {showModal && selectedImage && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div 
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                aria-hidden="true" 
                onClick={closeModal}
              ></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      {selectedImage.prompt}
                    </h3>
                    <div className="mt-2">
                      <img 
                        src={selectedImage.url} 
                        alt={selectedImage.prompt} 
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <a
                    href={selectedImage.url}
                    download={`ai-image-${new Date(selectedImage.timestamp).getTime()}.jpg`}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Image Modal */}
      {showModal && selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              onClick={closeModal}
            ></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    {selectedImage.prompt}
                  </h3>
                  <div className="mt-2">
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.prompt} 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Close
                </button>
                <a
                  href={selectedImage.url}
                  download={`ai-image-${new Date(selectedImage.timestamp).getTime()}.jpg`}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
