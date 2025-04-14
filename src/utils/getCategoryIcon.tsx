
import React from 'react';
import { Newspaper, MessagesSquare, FileText, BookText, HomeIcon, BookOpen, Info, Menu, Book } from "lucide-react";

export const getCategoryIcon = (text: string) => {
  const categoryIcons: {[key: string]: React.ReactNode} = {
    'Headliners': <Newspaper size={16} className="mr-2" />,
    'Debates': <MessagesSquare size={16} className="mr-2" />,
    'Spice It Up': <FileText size={16} className="mr-2" />,
    'Storyboard': <BookText size={16} className="mr-2" />,
    'In the Neighborhood': <HomeIcon size={16} className="mr-2" />,
    'Learning Resources': <BookOpen size={16} className="mr-2" />,
    'School News': <Newspaper size={16} className="mr-2" />,
    'About': <Info size={16} className="mr-2" />,
    'Categories': <Menu size={16} className="mr-2" />,
    'Learning': <Book size={16} className="mr-2" />
  };
  
  return categoryIcons[text] || <FileText size={16} className="mr-2" />;
};
