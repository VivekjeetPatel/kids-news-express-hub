
import React from 'react';

interface FeatureArticleImageProps {
  imageUrl: string;
  title: string;
}

const FeatureArticleImage: React.FC<FeatureArticleImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="relative w-full" style={{ 
      height: "calc(100svh - var(--header-height) - 3rem)", 
      minHeight: "500px", 
      maxHeight: "800px" 
    }}>
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
    </div>
  );
};

export default FeatureArticleImage;
