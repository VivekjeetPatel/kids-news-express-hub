
import React from 'react';
import { Link } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import { NavItem } from '@/components/Layout/menuItems';
import { getCategoryIcon } from '@/utils/getCategoryIcon';

interface MobileMenuItemsProps {
  items: NavItem[];
}

const MobileMenuItems: React.FC<MobileMenuItemsProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      {items.map((item) => {
        if (item.items && item.items.length > 0) {
          return (
            <div key={item.text} className="space-y-3">
              {item.items.map((subItem) => (
                <SheetClose asChild key={subItem.text}>
                  <Link 
                    to={subItem.to} 
                    className="flex items-center text-base py-2"
                  >
                    {getCategoryIcon(subItem.text)}
                    <div className="font-medium">{subItem.text}</div>
                  </Link>
                </SheetClose>
              ))}
            </div>
          );
        }
        
        return (
          <SheetClose asChild key={item.text}>
            <Link 
              to={item.to || "#"} 
              className="flex items-center text-base py-2 font-medium"
            >
              {getCategoryIcon(item.text)}
              {item.text}
            </Link>
          </SheetClose>
        );
      })}
    </div>
  );
};

export default MobileMenuItems;
