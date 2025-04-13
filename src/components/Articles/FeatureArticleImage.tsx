
import React, { useState } from 'react';

interface FeatureArticleImageProps {
  imageUrl: string;
  title: string;
}

const FeatureArticleImage = ({ imageUrl, title }: FeatureArticleImageProps) => {
  const [hasError, setHasError] = useState(false);
  
  const fallbackImage = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D";
  
  return (
    <div className="relative aspect-[16/9]">
      <img 
        src={hasError ? fallbackImage : imageUrl} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
    </div>
  );
};

export default FeatureArticleImage;
