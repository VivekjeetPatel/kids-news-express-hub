
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import MobileMenuItems from './MobileMenuItems';
import MobileNavAuth from './MobileNavAuth';
import { NavItem } from '@/components/Layout/menuItems';

interface MobileNavbarProps {
  logo: React.ReactNode;
  menuItems: NavItem[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ logo, menuItems }) => {
  return (
    <div className="flex items-center justify-between md:hidden">
      {logo}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto w-full">
          <SheetHeader className="flex justify-between items-center">
            <SheetTitle className="flex items-center">
              {logo}
            </SheetTitle>
          </SheetHeader>
          
          <div className="py-6">
            <div className="text-xl font-semibold flex items-center mb-6">
              <Menu className="mr-2" />
              <span>Categories</span>
            </div>
            
            <MobileMenuItems items={menuItems} />
            
            <Separator className="my-6" />
            
            <div className="text-xl font-semibold mb-6">
              Account
            </div>
            
            <MobileNavAuth />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
