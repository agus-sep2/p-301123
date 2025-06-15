
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  skeletonClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageSkeleton: React.FC<ImageSkeletonProps> = ({
  src,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <Skeleton 
          className={cn(
            "absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] animate-pulse",
            skeletonClassName
          )} 
        />
      )}
      
      {hasError ? (
        <div className={cn(
          "flex items-center justify-center bg-gray-800 text-gray-400",
          className
        )}>
          <span className="text-sm">Image failed to load</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default ImageSkeleton;
