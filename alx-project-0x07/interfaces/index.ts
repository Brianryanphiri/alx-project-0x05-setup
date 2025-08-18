import * as React from "react";

export interface ReactComponentProps {
  children: React.ReactNode;
}

export interface ImageData {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
  createdAt?: number;
}

export interface ImageCardProps {
  data: ImageData;
}

export interface ImageGenerationRequest {
  prompt: string;
  n?: number;
  size?: string;
}

export interface ImageGenerationResponse {
  created: number;
  data: Array<{
    url: string;
    prompt: string;
    size: string;
    timestamp: string;
  }>;
}

export interface GalleryState {
  images: ImageData[];
  loading: boolean;
  error: string | null;
  selectedImage: ImageData | null;
}

export interface ImageGenerationState {
  prompt: string;
  n: number;
  size: string;
  loading: boolean;
  error: string | null;
}

export interface AppState {
  gallery: GalleryState;
  generation: ImageGenerationState;
}
