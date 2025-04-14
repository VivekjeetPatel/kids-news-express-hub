
import React from 'react';
import { Label } from '@/components/ui/label';

interface PrivacySettingsSectionProps {
  showCommentHistory: boolean;
  showReadingActivity: boolean;
  onPrivacyChange: (field: string, value: boolean) => void;
}

const PrivacySettingsSection: React.FC<PrivacySettingsSectionProps> = ({
  showCommentHistory,
  showReadingActivity,
  onPrivacyChange
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
      <p className="text-sm text-gray-500 mb-4">
        Control how your profile information is displayed to others.
      </p>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showCommentHistory"
            checked={showCommentHistory}
            onChange={(e) => onPrivacyChange('showCommentHistory', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <Label htmlFor="showCommentHistory" className="text-sm font-normal cursor-pointer">
            Show my comment history on my profile
          </Label>
        </div>
        
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showReadingActivity"
            checked={showReadingActivity}
            onChange={(e) => onPrivacyChange('showReadingActivity', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <Label htmlFor="showReadingActivity" className="text-sm font-normal cursor-pointer">
            Show my reading activity on my profile
          </Label>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsSection;
