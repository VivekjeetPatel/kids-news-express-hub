
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NotFoundMessageProps {
  type: 'series' | 'episode';
  seriesId?: string;
}

const NotFoundMessage: React.FC<NotFoundMessageProps> = ({ type, seriesId }) => {
  const title = type === 'series' ? 'Series Not Found' : 'Episode Not Found';
  const message = type === 'series' 
    ? "Sorry, we couldn't find the series you're looking for."
    : "Sorry, we couldn't find the episode you're looking for.";
  
  const linkUrl = type === 'series' ? '/' : `/storyboard/${seriesId}`;
  const linkText = type === 'series' ? 'Back to Home' : 'Back to Series';
  
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-display font-bold mb-4">{title}</h1>
      <p className="mb-8">{message}</p>
      <Button asChild>
        <Link to={linkUrl}>{linkText}</Link>
      </Button>
    </div>
  );
};

export default NotFoundMessage;
