
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import { 
  BookOpen, 
  MessageCircle, 
  Sparkles, 
  Home as HomeIcon, 
  GraduationCap, 
  School, 
  Newspaper
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const FontDemo = () => {
  const categoryIcons = {
    Headliners: <Newspaper size={32} />,
    Debates: <MessageCircle size={32} />,
    'Spice It Up': <Sparkles size={32} />,
    'In the Neighborhood': <HomeIcon size={32} />,
    'Learning Resources': <GraduationCap size={32} />,
    'School News': <School size={32} />,
    Other: <BookOpen size={32} />
  };

  const fontFamilies = [
    { name: 'Default (Open Sauce Sans)', class: '' },
    { name: 'Source Serif 4', class: 'font-serif' },
    { name: 'Junicode', class: 'font-junicode' },
    { name: 'EB Garamond', class: 'font-eb-garamond' },
  ];

  const categories = [
    'Headliners', 
    'Debates', 
    'Spice It Up', 
    'In the Neighborhood', 
    'Learning Resources', 
    'School News'
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="newspaper-title mb-8">Font Demo Page</h1>
        
        <section className="mb-12">
          <h2 className="category-title mb-4">Category Title Fonts (Standard Background)</h2>
          <div className="grid grid-cols-1 gap-8">
            {fontFamilies.map((font) => (
              <Card key={font.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{font.name}</h3>
                  <div className="grid gap-6">
                    {categories.map((category) => (
                      <div 
                        key={`${font.name}-${category}`}
                        className="flex items-center gap-3"
                      >
                        <span className="text-flyingbus-purple">
                          {categoryIcons[category]}
                        </span>
                        <h1 className={`text-3xl font-bold border-b-2 border-flyingbus-purple pb-1 ${font.class}`}>
                          {category}
                        </h1>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="category-title mb-4">Category Title Fonts (Image Background)</h2>
          <div className="grid grid-cols-1 gap-8">
            {fontFamilies.map((font) => (
              <Card key={`img-${font.name}`} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <div 
                      className="bg-cover bg-center p-6" 
                      style={{ 
                        backgroundImage: "url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2600&q=80')",
                        backgroundSize: "cover"
                      }}
                    >
                      <div className="bg-black/50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">{font.name}</h3>
                        <div className="grid gap-6">
                          {categories.map((category) => (
                            <div 
                              key={`img-${font.name}-${category}`}
                              className="flex items-center gap-3"
                            >
                              <span className="text-white">
                                {categoryIcons[category]}
                              </span>
                              <h1 className={`text-3xl font-bold border-b-2 border-white pb-1 text-white ${font.class}`}>
                                {category}
                              </h1>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />
        
        <section className="mb-12">
          <h2 className="category-title mb-4">Special Typography Classes Demo</h2>
          <div className="grid grid-cols-1 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6">Source Serif 4 Classes</h3>
                <h4 className="article-serif-title">Article Serif Title: The Flying Bus Latest</h4>
                <blockquote className="article-serif-quote">
                  "Article Serif Quote: This is an example of the article-serif-quote class that uses Source Serif 4 with italic styling and a blue left border."
                </blockquote>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6">Junicode Classes</h3>
                <h4 className="junicode-title">Junicode Title: The Flying Bus Latest</h4>
                <blockquote className="junicode-quote">
                  "Junicode Quote: This is an example of the junicode-quote class that uses Junicode with italic styling and a red left border."
                </blockquote>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-6">EB Garamond Classes</h3>
                <h4 className="eb-garamond-title">EB Garamond Title: The Flying Bus Latest</h4>
                <blockquote className="eb-garamond-quote">
                  "EB Garamond Quote: This is an example of the eb-garamond-quote class that uses EB Garamond with italic styling and a green left border."
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default FontDemo;
