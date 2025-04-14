
import React from 'react';
import { Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileAchievementsTabProps {
  achievements?: string[];
}

const ProfileAchievementsTab: React.FC<ProfileAchievementsTabProps> = ({ achievements }) => {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        {achievements && achievements.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-purple-50 transition-colors"
              >
                <div className="h-12 w-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{achievement}</p>
                  <p className="text-xs text-gray-500">Unlocked achievement</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No achievements yet</p>
            <p className="text-sm text-gray-400 mt-1">Keep interacting with articles to earn achievements</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileAchievementsTab;
