
import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DrawerSignInForm from "@/components/auth/DrawerSignInForm";
import DrawerSignUpForm from "@/components/auth/DrawerSignUpForm";

interface DrawerAuthProps {
  triggerComponent: React.ReactNode;
  defaultTab?: 'sign-in' | 'sign-up';
}

export function DrawerAuth({ triggerComponent, defaultTab = 'sign-in' }: DrawerAuthProps) {
  const [activeTab, setActiveTab] = useState<'sign-in' | 'sign-up'>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              <DrawerSignInForm 
                isSubmitting={isSubmitting} 
                setIsSubmitting={setIsSubmitting} 
              />
            </TabsContent>
            
            <TabsContent value="sign-up">
              <DrawerSignUpForm 
                isSubmitting={isSubmitting} 
                setIsSubmitting={setIsSubmitting} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
