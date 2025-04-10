
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { getArticleById } from '@/data/mockArticles';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DebateVote from '@/components/Articles/DebateVote';

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

  // Map categories to colors for badge
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

  // Sample article content - in a real app, this would come from the database
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
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`${getCategoryColor(article.category)}`}>
                {article.category}
              </Badge>
              {article.readingLevel && (
                <Badge className="bg-white border text-flyingbus-purple">
                  Reading Level: {article.readingLevel}
                </Badge>
              )}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-flyingbus-muted-text mb-4">
              <span className="mr-4">By {article.author}</span>
              <span className="flex items-center mr-4">
                <CalendarDays size={16} className="mr-1" />
                {article.publishDate}
              </span>
              <span className="flex items-center mr-4">
                <Clock size={16} className="mr-1" />
                5 min read
              </span>
              <span className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                {article.commentCount} comments
              </span>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Article Content */}
          <div 
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
          
          {/* Debate Section */}
          {isDebate && (
            <div className="my-12">
              <DebateVote 
                debateId={article.id} 
                topicTitle={article.title}
                initialVotes={{ yes: 55, no: 45 }} 
              />
            </div>
          )}
          
          {/* Share Buttons */}
          <div className="flex items-center justify-between border-t border-b py-4 my-8">
            <div>
              <span className="text-flyingbus-muted-text mr-2">Share this article:</span>
              <Button variant="ghost" size="sm" className="rounded-full">
                <Share2 size={18} />
              </Button>
            </div>
            
            <Button className="bg-flyingbus-purple hover:bg-purple-600 rounded-full">
              <MessageSquare size={18} className="mr-2" />
              Comment
            </Button>
          </div>
        </div>
      </article>
    </MainLayout>
  );
};

export default ArticlePage;
