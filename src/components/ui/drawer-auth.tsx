
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Key, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface DrawerAuthProps {
  triggerComponent: React.ReactNode;
  defaultTab?: 'sign-in' | 'sign-up';
}

export function DrawerAuth({ triggerComponent, defaultTab = 'sign-in' }: DrawerAuthProps) {
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>(defaultTab);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: '',
  });

  const [signUpForm, setSignUpForm] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await login(signInForm.username);
      
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        
        // Reset form
        setSignInForm({ username: '', password: '' });
        
        // Close drawer is handled by the DrawerClose component
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid username or password. Try 'curious_reader' for demo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    setTimeout(async () => {
      try {
        // In a real app, we would create the user first, then log them in
        // For demo, just log them in as "curious_reader"
        await login("curious_reader");
        
        toast({
          title: "Account created!",
          description: "Welcome to The Flying Bus! You're now a reader.",
        });
        
        // Reset form
        setSignUpForm({
          username: '',
          displayName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        
        // Close drawer is handled by the DrawerClose component
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {triggerComponent}
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-flyingbus-purple">
              {activeTab === 'sign-in' ? 'Sign In' : 'Create Account'}
            </DrawerTitle>
            <DrawerDescription>
              {activeTab === 'sign-in' 
                ? 'Welcome back! Please sign in to continue.' 
                : 'Join The Flying Bus community!'}
            </DrawerDescription>
          </DrawerHeader>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'sign-in' | 'sign-up')}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-in">
              <form onSubmit={handleSignIn} className="space-y-4 p-4">
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Any password will work in demo mode</p>
                </div>
                
                <DrawerFooter className="px-0">
                  <DrawerClose asChild>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="sign-up">
              <form onSubmit={handleSignUp} className="space-y-4 p-4">
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>
                
                <DrawerFooter className="px-0">
                  <DrawerClose asChild>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </DrawerClose>
                  <DrawerClose asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Cancel
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
