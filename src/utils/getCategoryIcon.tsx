
import React from 'react';
import { Newspaper, MessagesSquare, FileText, BookText, HomeIcon, BookOpen, Info, Menu, Book } from "lucide-react";

export const getCategoryIcon = (text: string) => {
  const categoryIcons: {[key: string]: React.ReactNode} = {
    'Headliners': <Newspaper size={12} className="mr-1" />,
    'Debates': <MessagesSquare size={12} className="mr-1" />,
    'Spice It Up': <FileText size={12} className="mr-1" />,
    'Storyboard': <BookText size={12} className="mr-1" />,
    'In the Neighborhood': <HomeIcon size={12} className="mr-1" />,
    'Learning Resources': <BookOpen size={12} className="mr-1" />,
    'School News': <Newspaper size={12} className="mr-1" />,
    'About': <Info size={12} className="mr-1" />,
    'Categories': <Menu size={12} className="mr-1" />,
    'Learning': <Book size={12} className="mr-1" />
  };
  
  return categoryIcons[text] || <FileText size={12} className="mr-1" />;
};
