import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { getArticleById } from '@/data/mockArticles';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MessageSquare, Share2, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DebateVote from '@/components/Articles/DebateVote';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id || '');

  if (!article) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Article Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the article you're looking for.</p>
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const getCategoryColor = (category: string) => {
    const categories: {[key: string]: string} = {
      'Headliners': 'bg-flyingbus-purple text-white',
      'Debates': 'bg-flyingbus-red text-white',
      'Spice It Up': 'bg-flyingbus-orange text-white',
      'Storyboard': 'bg-flyingbus-blue text-white',
      'In the Neighborhood': 'bg-flyingbus-green text-white',
      'Learning': 'bg-flyingbus-yellow text-black',
      'School News': 'bg-flyingbus-pink text-white'
    };
    
    return categories[category] || 'bg-gray-500 text-white';
  };

  const articleContent = `
    <p>Young activists from over 20 countries participated in a virtual summit to discuss and propose solutions for climate change. Their innovative ideas are gaining attention from world leaders.</p>
    
    <p>The two-day event, organized entirely by students aged 10-14, featured presentations on renewable energy, waste reduction, and conservation efforts that kids can lead in their communities.</p>
    
    <h2>Kids Taking Action</h2>
    
    <p>"We may be young, but we understand what's happening to our planet," said 12-year-old organizer Mia Johnson. "We want to show that kids can make a difference too."</p>
    
    <p>Participants shared projects they've started in their own neighborhoods, from community gardens to recycling programs at their schools. Many of these initiatives have already made measurable impacts.</p>
    
    <p>The summit culminated in a joint statement addressed to world leaders, calling for more ambitious climate targets and greater inclusion of young voices in environmental policy discussions.</p>
    
    <h2>Getting Adults' Attention</h2>
    
    <p>Several political leaders and environmental experts attended the virtual event, and many came away impressed by the children's knowledge and passion.</p>
    
    <p>"I was honestly surprised by how well these kids understand complex climate issues," said environmental scientist Dr. Eleanor Rivera. "Their solutions are practical and innovative. We adults could learn a lot from them."</p>
    
    <p>The young activists plan to hold regional follow-up meetings and track their progress on projects throughout the year.</p>
    
    <h2>How You Can Join</h2>
    
    <p>The group has created a website where other kids can learn about climate issues and join local action groups. They also plan to hold another global summit next year with even more participants.</p>
    
    <p>"Anyone can make a difference," Johnson said. "Even small actions add up to big changes when we all work together."</p>
  `;

  const isDebate = article.category === 'Debates';

  return (
    <MainLayout>
      <div className="bg-white">
        <div className="w-full bg-gradient-to-b from-flyingbus-background to-white py-12 mb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-2 mb-6">
                <Badge className={`${getCategoryColor(article.category)}`}>
                  {article.category}
                </Badge>
                {article.readingLevel && (
                  <Badge variant="outline" className="bg-white border text-flyingbus-purple">
                    Reading Level: {article.readingLevel}
                  </Badge>
                )}
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-flyingbus-muted-text mb-8">
                <span className="mr-4 font-medium">By {article.author}</span>
                <span className="flex items-center mr-4">
                  <CalendarDays size={16} className="mr-1" />
                  {article.publishDate}
                </span>
                <span className="flex items-center mr-4">
                  <Clock size={16} className="mr-1" />
                  5 min read
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-8">
              <div className="mb-8 rounded-xl overflow-hidden">
                <AspectRatio ratio={16/9} className="bg-gray-100">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>
              
              <div 
                className="prose prose-lg max-w-none mb-12 prose-headings:font-display prose-headings:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-flyingbus-purple"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />
              
              {isDebate && (
                <div className="my-12 bg-gray-50 p-6 rounded-xl">
                  <DebateVote 
                    debateId={article.id} 
                    topicTitle={article.title}
                    initialVotes={{ yes: 55, no: 45 }} 
                  />
                </div>
              )}
              
              <Separator className="my-8" />
              
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-flyingbus-muted-text">Share:</span>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Facebook size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Twitter size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                    <Share2 size={16} />
                  </Button>
                </div>
                
                <div className="flex items-center">
                  <span className="text-flyingbus-muted-text mr-2">
                    <MessageSquare size={16} className="inline mr-1" />
                    {article.commentCount} comments
                  </span>
                  <Button className="ml-2 bg-flyingbus-purple hover:bg-purple-600">
                    Join Discussion
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                    <p className="text-flyingbus-muted-text mb-4">
                      {article.author} is a young journalist passionate about sharing important stories.
                    </p>
                    <Button variant="outline" className="w-full">View Profile</Button>
                  </CardContent>
                </Card>
                
                <div className="bg-gray-100 rounded-xl p-6 text-center mb-6 min-h-[300px] flex items-center justify-center">
                  <div>
                    <p className="text-flyingbus-muted-text mb-2">Future Ad Space</p>
                    <p className="text-xs text-gray-500">This space reserved for ads or in-house CTAs</p>
                  </div>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="text-flyingbus-purple hover:underline">Young Scientists Create Eco-Friendly Plastic Alternative</a>
                      </li>
                      <li>
                        <a href="#" className="text-flyingbus-purple hover:underline">How to Start a Climate Club at Your School</a>
                      </li>
                      <li>
                        <a href="#" className="text-flyingbus-purple hover:underline">Kids Lead The Way in Community Clean-up Effort</a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticlePage;
