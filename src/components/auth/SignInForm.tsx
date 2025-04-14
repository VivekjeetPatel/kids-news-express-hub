
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Key, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockReaderProfiles } from '@/data/readers';

interface SignInFormProps {
  onSwitchTab: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSwitchTab }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: '',
  });

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication with mock data
    const user = mockReaderProfiles.find(
      u => u.username === signInForm.username
    );
    
    if (user) {
      toast({
        title: "Welcome back!",
        description: `You're now signed in as ${user.displayName}.`,
      });
      
      // Redirect to user profile or home
      setTimeout(() => {
        navigate(`/profile/${user.username}`);
      }, 1500);
    } else {
      toast({
        title: "Sign in failed",
        description: "Invalid username or password. Try 'curious_reader' for demo.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <CardContent className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="signin-username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="signin-username" 
              name="username"
              placeholder="Your username" 
              className="pl-10"
              value={signInForm.username}
              onChange={handleSignInChange}
              required
            />
          </div>
          <p className="text-xs text-gray-500">Demo: try "curious_reader"</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="signin-password" 
              name="password"
              type="password" 
              placeholder="Your password" 
              className="pl-10"
              value={signInForm.password}
              onChange={handleSignInChange}
              required
            />
          </div>
          <p className="text-xs text-gray-500">Any password will work in demo mode</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4">
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <Button 
          type="button" 
          variant="link" 
          onClick={onSwitchTab}
          className="text-xs"
        >
          Don't have an account? Sign up
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignInForm;
