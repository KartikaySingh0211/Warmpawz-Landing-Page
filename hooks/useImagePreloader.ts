import { useEffect } from 'react';

// Critical images to preload for smooth navigation
const IMAGE_URLS = [
  // Core branding
  '/images/warmpawz logo.png',
  '/images/og-default.jpg',
  
  // Home page images
  '/images/left.png',
  '/images/right.png',
  
  // Service images (used in ServicesPhoneFrame)
  '/images/vet.png',
  '/images/grooming.png',
  '/images/training.png',
  '/images/boarding.png',
  '/images/adoption.png',
  '/images/food.png',
  '/images/product.png',
  '/images/cafe.png',
  '/images/behaviourist.png',
  
  // About page - Values icons
  '/images/Compassion .png',
  '/images/Trust.png',
  '/images/Convenience .png',
  '/images/Community.png',
  '/images/Warmth.png',
  
  // Vendor onboarding
  '/images/service_provider.png',
  
  // Careers page
  '/images/role1.png',
  '/images/role2.png',
  
  // Blog images
  '/images/blog-1.png',
  '/images/blog-2.png',
  '/images/blog-3.png',
  '/images/blog-4.png',
  '/images/blog-5.png',
  '/images/blog-6.png',
  '/images/blog-7.png',
  '/images/blog-8.png',
  '/images/blog-9.png',
  '/images/blog-10.png',
  '/images/blog-11.png',
  
  // App download badges
  '/images/apple.png',
  '/images/google.png',
];

export const useImagePreloader = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const preloadImagesSequentially = async () => {
      // Load images immediately (no initial delay) since they're critical for navigation

      for (const url of IMAGE_URLS) {
        // Skip on Data Saver
        // @ts-expect-error
        if (navigator.connection?.saveData) return;

        try {
          await new Promise<void>((resolve) => {
            const img = new Image();
            img.src = url;
            
            const cleanup = () => resolve();
            
            // We don't strict-await loading like video, just fire and wait a bit
            img.onload = cleanup;
            img.onerror = cleanup;
            
            // Timeout fallback (images should be fast)
            setTimeout(cleanup, 3000);
          });

          // Small breathe time between images
          await new Promise(resolve => setTimeout(resolve, 200));

        } catch (e) {
          console.warn(`Failed to preload image ${url}`, e);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      // @ts-expect-error
      window.requestIdleCallback(() => preloadImagesSequentially());
    } else {
      preloadImagesSequentially();
    }
  }, [enabled]);
};
