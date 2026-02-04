import { useEffect } from 'react';

// All videos used across the application
const VIDEO_URLS = [
  // User walkthrough videos
  '/videos/adoption-v2.mp4',
  '/videos/petsVET_1.mp4',
  '/videos/pet-training.mp4',
  '/videos/pet-boarding-new.mp4',
  '/videos/pawsome-mart.mp4',
  '/videos/pet-sunset.mp4',
  // Vendor onboarding videos
  '/videos/step1.mov',
  '/videos/step2.mov',
  '/videos/step3.mov',
  '/videos/step4.mov',
  '/videos/step5.mov',
  '/videos/step6.mov',
  '/videos/step7.mov',
];

export const useVideoPreloader = (enabled: boolean = true) => {
  useEffect(() => {
    if (!enabled) return;

    const preloadVideosSequentially = async () => {
      // 1. Initial Delay: Wait 5 seconds to allow critical assets (hero image, fonts, JS) to load first.
      await new Promise(resolve => setTimeout(resolve, 5000));

      // 2. Sequential Loading: Load videos one by one to avoid bandwidth saturation.
      // This is superior to setTimeout chaining because it adapts to the user's network speed.
      for (const url of VIDEO_URLS) {
        // Check network status - pause/abort if user is on slow connection (Data Saver)
        // @ts-expect-error - navigator.connection is inclusive to Chrome/Android
        if (navigator.connection?.saveData) {
            console.log('Warmpawz: Skipping video preload due to Data Saver mode');
            return;
        }

        try {
          await new Promise<void>((resolve) => {
            const video = document.createElement('video');
            video.src = url;
            video.preload = 'auto'; // 'auto' tells browser to download the whole file
            video.muted = true;
            video.style.display = 'none';
            
            const cleanup = () => {
              // Remove listeners
              video.removeEventListener('loadeddata', cleanup);
              video.removeEventListener('error', cleanup);
              
              // Remove from DOM to free memory (browser cache keeps the file)
              if (document.body.contains(video)) {
                document.body.removeChild(video);
              }
              resolve(); 
            };

            // Event listeners
            // 'canplaythrough' or 'loadeddata' indicates sufficient buffer
            // We use 'loadeddata' which is earlier, to just get it started and cached
            video.addEventListener('loadeddata', cleanup);
            video.addEventListener('error', cleanup);
            
            document.body.appendChild(video);
            video.load();

            // Timeout fallback: If a single video takes >15s, kill it and move on
            // This prevents a stuck download from blocking the queue forever
            setTimeout(cleanup, 15000);
          });

          // 3. Inter-video Delay: Breathe time between requests
          // Allows other user interactions (like clicking links) to slip in
          await new Promise(resolve => setTimeout(resolve, 1000));

        } catch (e) {
          console.warn(`Warmpawz: Failed to preload ${url}`, e);
        }
      }
    };

    if ('requestIdleCallback' in window) {
       // @ts-expect-error
       window.requestIdleCallback(() => preloadVideosSequentially());
    } else {
       preloadVideosSequentially();
    }

  }, [enabled]);
};
