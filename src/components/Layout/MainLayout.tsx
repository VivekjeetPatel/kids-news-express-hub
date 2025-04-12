
import React from 'react';
import ModernHeader from './ModernHeader';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ModernHeader />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
