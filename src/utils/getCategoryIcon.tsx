
import React from 'react';
import { Newspaper, MessagesSquare, FileText, BookText, HomeIcon, BookOpen, Info, Menu, Book } from "lucide-react";

export const getCategoryIcon = (text: string) => {
  const categoryIcons: {[key: string]: React.ReactNode} = {
    'Headliners': <Newspaper size={14} className="mr-1.5" />,
    'Debates': <MessagesSquare size={14} className="mr-1.5" />,
    'Spice It Up': <FileText size={14} className="mr-1.5" />,
    'Storyboard': <BookText size={14} className="mr-1.5" />,
    'In the Neighborhood': <HomeIcon size={14} className="mr-1.5" />,
    'Learning Resources': <BookOpen size={14} className="mr-1.5" />,
    'School News': <Newspaper size={14} className="mr-1.5" />,
    'About': <Info size={14} className="mr-1.5" />,
    'Categories': <Menu size={14} className="mr-1.5" />,
    'Learning': <Book size={14} className="mr-1.5" />
  };
  
  return categoryIcons[text] || <FileText size={14} className="mr-1.5" />;
};
