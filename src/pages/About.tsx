
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-flyingbus-purple">About The Flying Bus</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl mb-6">
            Welcome to The Flying Bus: News for Kids, By Kids – a safe and engaging platform where young journalists aged 8-14 can express themselves through age-appropriate news content.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-flyingbus-purple">Our Mission</h2>
          <p>
            We believe that children have important perspectives to share with the world. Our mission is to provide a platform where young voices can be heard, while developing critical thinking and writing skills in a safe, moderated environment.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-flyingbus-purple">For Young Journalists</h2>
          <p>
            If you're a young writer interested in joining our team, you'll need an invitation from one of our administrators. Once you're on board, you can write articles that will be reviewed by our moderators before being published.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-flyingbus-purple">For Parents</h2>
          <p>
            The Flying Bus provides a safe space for children to develop their writing and critical thinking skills. All content is reviewed by moderators before publication, and our commenting system is carefully monitored to ensure a positive environment.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4 text-flyingbus-purple">Our Categories</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Headliners:</strong> The top stories written by our young journalists</li>
            <li><strong>Debates:</strong> Thoughtful discussions on topics that matter to kids</li>
            <li><strong>Spice It Up:</strong> Fun and interesting stories that add flavor to your day</li>
            <li><strong>Storyboard:</strong> Creative writing and stories from our young authors</li>
            <li><strong>In the Neighborhood:</strong> Local news and events reported by kids</li>
            <li><strong>Learning:</strong> Educational content and resources for curious minds</li>
            <li><strong>School News:</strong> Updates and stories from schools around the world</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
