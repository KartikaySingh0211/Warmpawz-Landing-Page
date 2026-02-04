import { ReactNode, CSSProperties } from 'react';
import { GRADIENTS, LAYOUT } from '@/config/constants';

interface PageLayoutProps {
  children: ReactNode;
  gradient?: keyof typeof GRADIENTS;
  className?: string;
}

/**
 * Standard page layout with gradient background and consistent padding
 * Handles the main content area with proper spacing for navbar
 */
export const PageLayout = ({ 
  children, 
  gradient = 'warm',
  className = '' 
}: PageLayoutProps) => {
  const gradientStyle: CSSProperties = {
    backgroundImage: GRADIENTS[gradient],
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    transition: 'background 0.3s ease-in-out',
  };

  return (
    <main 
      className={`min-h-screen relative ${className}`}
      style={gradientStyle}
    >
      <div className={LAYOUT.navbarHeight}>
        {children}
      </div>
    </main>
  );
};
