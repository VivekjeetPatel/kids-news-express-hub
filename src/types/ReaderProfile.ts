
// Reader profile type definitions
export interface ReaderProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio?: string;
  joinedDate: Date;
  
  // Comment activity
  commentCount: number;
  
  // Future gamification fields (placeholder)
  badges?: string[];
  achievements?: string[];
  readingStreak?: number;
}

export interface PrivacySettings {
  showCommentHistory: boolean;
  showReadingActivity: boolean;
  profileVisibility: 'public' | 'private';
}
