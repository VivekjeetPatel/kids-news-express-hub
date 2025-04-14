
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/Layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import SignUpForm from '@/components/auth/SignUpForm';
import SignInForm from '@/components/auth/SignInForm';
import AuthCardHeader from '@/components/auth/AuthCardHeader';

const ReaderAuth = () => {
  const location = useLocation();
  
  // Get the tab from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<string>(
    tabParam === 'sign-in' ? 'sign-in' : 'sign-up'
  );

  // Update activeTab when URL parameters change
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'sign-in' || tab === 'sign-up') {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleSwitchToSignUp = () => {
    setActiveTab('sign-up');
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center py-10">
        <Card className="w-full max-w-md">
          <AuthCardHeader />
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sign-up">
              <SignUpForm />
            </TabsContent>
            
            <TabsContent value="sign-in">
              <SignInForm onSwitchTab={handleSwitchToSignUp} />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReaderAuth;
