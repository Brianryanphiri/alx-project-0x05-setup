import React from 'react';
import { ImageData } from "@/interfaces";

interface ImageCardProps {
  data: ImageData;
  onClick: (image: ImageData) => void;
  className?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ data, onClick, className = '' }) => {
  return (
    <div 
      className={`group relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      onClick={() => onClick(data)}
    >
      <img
        src={data.url}
        alt={data.prompt || 'Generated image'}
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end p-4">
        <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
          {data.prompt}
        </p>
      </div>
    </div>
  );
};

export default ImageCard;
