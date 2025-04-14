
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BookOpen, Mail, Key, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockReaderProfiles } from '@/data/readers';

const ReaderAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get the tab from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(
    tabParam === 'sign-in' ? 'sign-in' : 'sign-up'
  );
  
  // Sign up form state
  const [signUpForm, setSignUpForm] = useState({
    username: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Sign in form state
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: '',
  });

  // Update activeTab when URL parameters change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'sign-in' || tab === 'sign-up') {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInForm(prev => ({ ...prev, [name]: value }));
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
    // For now, we'll just show a success message and redirect to home
    toast({
      title: "Account created!",
      description: "Welcome to The Flying Bus! You're now a reader.",
    });
    
    // Simulate successful registration
    setTimeout(() => {
      // When we have a backend, we'd navigate to their new profile
      // For now, navigate home
      navigate('/');
    }, 1500);
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
    <MainLayout>
      <div className="flex justify-center items-center py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-orange-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-flyingbus-orange" />
              </div>
            </div>
            <CardTitle className="text-2xl">Join The Flying Bus</CardTitle>
            <CardDescription>
              Create an account to comment on articles and access reader features
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-up">
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
            </TabsContent>
            
            <TabsContent value="sign-in">
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
                    onClick={() => setActiveTab('sign-up')}
                    className="text-xs"
                  >
                    Don't have an account? Sign up
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReaderAuth;
