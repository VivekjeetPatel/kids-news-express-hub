
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  items: {
    label: string;
    href?: string;
    active?: boolean;
  }[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn("flex items-center text-sm text-gray-500", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <li className="flex items-center">
                <ChevronRight size={14} className="mx-1 text-gray-400" />
              </li>
            )}
            <li className="flex items-center">
              {item.href && !item.active ? (
                <Link 
                  to={item.href} 
                  className="hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(
                  "font-medium", 
                  item.active ? "text-gray-700" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
