
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getReaderByUsername } from '@/data/readers';
import { getCommentsByAuthor } from '@/data/comments';
import MainLayout from '@/components/Layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import ProfileTabs from './ProfileTabs';

const ReaderProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const reader = username ? getReaderByUsername(username) : undefined;
  const { currentUser } = useAuth();
  const isOwnProfile = currentUser?.username === username;
  const readerComments = username ? getCommentsByAuthor(username) : [];
  
  if (!reader) {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Reader profile not found
          </h1>
          <Link to="/" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to home
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto pb-12">
        <ProfileHeader reader={reader} isOwnProfile={isOwnProfile} />
        <ProfileInfo reader={reader} />
        <ProfileTabs reader={reader} readerComments={readerComments} />
      </div>
    </MainLayout>
  );
};

export default ReaderProfilePage;
