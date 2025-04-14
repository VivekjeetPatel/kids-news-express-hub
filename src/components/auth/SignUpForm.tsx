
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Mail, Key, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would typically call an API to create the account
    toast({
      title: "Account created!",
      description: "Welcome to The Flying Bus! You're now a reader.",
    });
    
    // Simulate successful registration
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSignUp}>
      <CardContent className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="username" 
              name="username"
              placeholder="Pick a username" 
              className="pl-10"
              value={signUpForm.username}
              onChange={handleSignUpChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="displayName" 
              name="displayName"
              placeholder="How should we call you?" 
              className="pl-10"
              value={signUpForm.displayName}
              onChange={handleSignUpChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="your@email.com" 
              className="pl-10"
              value={signUpForm.email}
              onChange={handleSignUpChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="password" 
              name="password"
              type="password" 
              placeholder="Create a password" 
              className="pl-10"
              value={signUpForm.password}
              onChange={handleSignUpChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              id="confirmPassword" 
              name="confirmPassword"
              type="password" 
              placeholder="Confirm your password" 
              className="pl-10"
              value={signUpForm.confirmPassword}
              onChange={handleSignUpChange}
              required
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;
