
import React from 'react';
import { Play, Volume2, VolumeX, Maximize, Video } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
  // Determine if it's a YouTube video
  const isYoutubeVideo = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  
  return (
    <Card className="mb-8 overflow-hidden shadow-md bg-white">
      <CardContent className="p-0">
        <div className="relative">
          <AspectRatio ratio={16/9}>
            {isYoutubeVideo ? (
              <iframe 
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <video 
                controls
                className="w-full h-full object-cover"
                poster={videoUrl.endsWith('.mp4') ? undefined : videoUrl}
              >
                {videoUrl.endsWith('.mp4') && <source src={videoUrl} type="video/mp4" />}
                Your browser does not support the video tag.
              </video>
            )}
          </AspectRatio>
          
          {!isYoutubeVideo && !videoUrl.endsWith('.mp4') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 rounded-full bg-flyingbus-yellow bg-opacity-80 flex items-center justify-center">
                <Video size={40} className="text-black" />
              </div>
              <p className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                Video preview unavailable
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-flyingbus-yellow bg-opacity-10 border-t border-flyingbus-yellow">
          <p className="font-semibold flex items-center">
            <Play size={18} className="mr-2 text-flyingbus-yellow" />
            {title} - Video Report
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
