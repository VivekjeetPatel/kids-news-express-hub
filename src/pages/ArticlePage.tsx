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
    <h1>Kids from Around the World Unite for Climate Change Action</h1>
    
    <p>Young activists from over 20 countries participated in a virtual summit to discuss and propose solutions for climate change. Their innovative ideas are gaining attention from world leaders and environmental organizations globally.</p>
    
    <h2>A Global Movement Led by Youth</h2>
    
    <p>The two-day event, organized entirely by students aged 10-14, featured presentations on renewable energy, waste reduction, and conservation efforts that kids can lead in their communities. Participants joined from six continents, representing diverse perspectives and local environmental challenges.</p>
    
    <blockquote>
      "We may be young, but we understand what's happening to our planet. Climate change will affect our future more than anyone else's, so we deserve a voice in how it's addressed," said 12-year-old organizer Mia Johnson.
    </blockquote>
    
    <p>The summit was conducted entirely online, which not only reduced the carbon footprint of the event but also allowed for greater participation from young people in remote or economically disadvantaged areas.</p>
    
    <h3>Key Issues Addressed</h3>
    
    <p>The young activists focused on several critical environmental issues during their discussions:</p>
    
    <ul>
      <li><strong>Renewable Energy Solutions</strong> - Students presented affordable solar and wind power projects that could be implemented in schools</li>
      <li><strong>Plastic Pollution</strong> - Innovative ideas for reducing single-use plastics in daily life</li>
      <li><strong>Food Waste Reduction</strong> - Strategies for composting and mindful consumption</li>
      <li><strong>Habitat Conservation</strong> - Local projects to protect endangered species and their ecosystems</li>
    </ul>
    
    <p>Each topic was approached with both global perspective and localized solutions that could be implemented by kids in their own communities, regardless of resources available.</p>
    
    <h4>Community-Based Initiatives</h4>
    
    <p>Participants shared projects they've already started in their own neighborhoods. These grassroots efforts have shown remarkable success with minimal resources:</p>
    
    <ol>
      <li>Community gardens that provide fresh produce while sequestering carbon</li>
      <li>School-wide recycling programs that have diverted tons of waste from landfills</li>
      <li>Energy conservation challenges that reduced electricity usage by up to 25%</li>
      <li>Educational campaigns that have increased environmental awareness among peers</li>
    </ol>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1621451537984-a935a96fdbcc?w=600&auto=format&fit=crop" alt="Kids planting trees in a community garden" />
      <figcaption>Summit participants from Brazil planting native trees as part of their local conservation project.</figcaption>
    </figure>
    
    <h5>Political Engagement</h5>
    
    <p>The summit culminated in a joint declaration addressed to world leaders, calling for more ambitious climate targets and greater inclusion of young voices in environmental policy discussions. The document was co-signed by all participating students and has been sent to political representatives in each of their countries.</p>
    
    <pre><code>// Example of the summit's impact calculation
function calculateCarbonOffset(trees, years) {
  return trees * 21.7 * years; // kg of CO2
}

// 5000 trees planted by summit participants over 10 years
calculateCarbonOffset(5000, 10); // = 1,085,000 kg CO2 offset</code></pre>
    
    <h2>Adult Reaction and Support</h2>
    
    <p>Several political leaders and environmental experts attended the virtual event, and many came away impressed by the children's knowledge and passion.</p>
    
    <blockquote>
      "I was honestly surprised by how well these kids understand complex climate issues," said environmental scientist Dr. Eleanor Rivera. "Their solutions are practical and innovative. We adults could learn a lot from them."
    </blockquote>
    
    <p>Dr. Rivera wasn't alone in her assessment. Several attending politicians have committed to reviewing the students' proposals and incorporating them into upcoming environmental legislation.</p>
    
    <h3>Media Coverage and Public Response</h3>
    
    <p>The summit received positive coverage from major news outlets around the world. Social media hashtags related to the event trended for three consecutive days, bringing even more attention to the young environmentalists' cause.</p>
    
    <p>Public response has been overwhelmingly supportive, with many adults expressing admiration for the students' initiative and commitment. Several environmental organizations have reached out to offer mentorship and resources to help expand the youth-led projects.</p>
    
    <h2>Looking Forward: Future Plans</h2>
    
    <p>The young activists show no signs of slowing down. They've already begun planning follow-up activities:</p>
    
    <ul>
      <li>Regional mini-summits to focus on area-specific environmental challenges</li>
      <li>Monthly virtual check-ins to share progress on local projects</li>
      <li>A resource-sharing platform where students can exchange ideas and success stories</li>
      <li>A global tree-planting day with coordinated events across all participating countries</li>
    </ul>
    
    <p>"This is just the beginning," Johnson emphasized. "We're building a movement that will continue growing as more kids realize they have the power to make a difference."</p>
    
    <h2>How You Can Get Involved</h2>
    
    <p>The group has created a website where other kids can learn about climate issues and join local action groups. To participate:</p>
    
    <ol>
      <li>Visit their website at <a href="#">KidsForClimateAction.org</a></li>
      <li>Join their weekly online discussions every Saturday</li>
      <li>Start a climate club at your school using their free starter guide</li>
      <li>Share your own environmental projects on their social media platforms</li>
    </ol>
    
    <p>The group welcomes participants of all ages, though leadership positions are reserved for those under 15 years old to maintain their youth-led focus.</p>
    
    <p>"Anyone can make a difference," Johnson concluded. "Even small actions add up to big changes when we all work together. The future of our planet depends on what we do today, and we're proving that kids can lead the way."</p>
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
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-left">
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
                className="article-content prose prose-lg max-w-none mb-12 
                  prose-headings:font-display prose-headings:text-gray-900
                  prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:leading-tight
                  prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                  prose-a:text-flyingbus-purple prose-a:no-underline prose-a:border-b prose-a:border-flyingbus-purple hover:prose-a:border-b-2
                  prose-strong:font-semibold prose-strong:text-gray-900
                  prose-blockquote:border-l-4 prose-blockquote:border-flyingbus-purple prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:rounded-r-md
                  prose-ul:list-disc prose-ul:mt-4 prose-ul:mb-6 prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:mt-4 prose-ol:mb-6 prose-ol:pl-6
                  prose-li:mb-2 prose-li:text-gray-800
                  prose-hr:my-8 prose-hr:border-gray-200
                  prose-figure:my-8 prose-figure:mx-auto
                  prose-figcaption:text-center prose-figcaption:text-gray-600 prose-figcaption:mt-2 prose-figcaption:text-sm
                  prose-img:rounded-md prose-img:mx-auto"
                dangerouslySetInnerHTML={{ __html: articleContent }}
              />
              
              {isDebate && (
                <div className="my-12 bg-gray-50 p-6 rounded-xl shadow-sm">
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
