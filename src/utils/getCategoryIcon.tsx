
import React from 'react';
import { Newspaper, MessagesSquare, FileText, BookText, HomeIcon, BookOpen, Info, Menu, Book } from "lucide-react";

export const getCategoryIcon = (text: string, size: number = 12) => {
  const categoryIcons: {[key: string]: React.ReactNode} = {
    'Headliners': <Newspaper size={size} className="mr-1" />,
    'Debates': <MessagesSquare size={size} className="mr-1" />,
    'Spice It Up': <FileText size={size} className="mr-1" />,
    'Storyboard': <BookText size={size} className="mr-1" />,
    'In the Neighborhood': <HomeIcon size={size} className="mr-1" />,
    'Learning Resources': <BookOpen size={size} className="mr-1" />,
    'School News': <Newspaper size={size} className="mr-1" />,
    'About': <Info size={size} className="mr-1" />,
    'Categories': <Menu size={size} className="mr-1" />,
    'Learning': <Book size={size} className="mr-1" />
  };
  
  return categoryIcons[text] || <FileText size={size} className="mr-1" />;
};
