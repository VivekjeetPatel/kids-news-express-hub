
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface PrivacySettingsSectionProps {
  control: Control<any>;
}

const PrivacySettingsSection: React.FC<PrivacySettingsSectionProps> = ({ control }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Privacy Settings</h3>
      <p className="text-sm text-gray-500 mb-4">
        Control how your profile information is displayed to others.
      </p>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="showCommentHistory"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="showCommentHistory"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal cursor-pointer" htmlFor="showCommentHistory">
                Show my comment history on my profile
              </FormLabel>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="showReadingActivity"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="showReadingActivity"
                />
              </FormControl>
              <FormLabel className="text-sm font-normal cursor-pointer" htmlFor="showReadingActivity">
                Show my reading activity on my profile
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PrivacySettingsSection;
