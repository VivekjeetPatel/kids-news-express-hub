
import React from 'react';

interface FeatureArticleImageProps {
  imageUrl: string;
  title: string;
}

const FeatureArticleImage = ({ imageUrl, title }: FeatureArticleImageProps) => {
  return (
    <div className="relative aspect-[16/9]">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
    </div>
  );
};

export default FeatureArticleImage;
