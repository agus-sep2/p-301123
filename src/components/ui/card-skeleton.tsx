
import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface CardSkeletonProps {
  className?: string;
  showImage?: boolean;
  showFooter?: boolean;
  lines?: number;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  showImage = true,
  showFooter = true,
  lines = 3
}) => {
  return (
    <div className={cn("glassmorphism overflow-hidden", className)}>
      {showImage && (
        <Skeleton className="h-52 w-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      )}
      
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
        
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i}
              className={cn(
                "h-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800",
                i === lines - 1 ? "w-2/3" : "w-full"
              )}
            />
          ))}
        </div>
        
        {showFooter && (
          <div className="flex items-center space-x-4 pt-2">
            <Skeleton className="h-3 w-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
            <Skeleton className="h-3 w-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
            <Skeleton className="h-3 w-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSkeleton;
