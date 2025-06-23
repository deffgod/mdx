'use client'
import React, { useState, useEffect } from 'react';
import FlowingMenu from "@/components/flowing-menu";
import MagicCard from '@/components/magic-card';
import NotchTwo from '@/components/cards/notch-two';

const demoItems = [
  { link: '/', text: 'Home', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/protocol', text: 'Protocol', image: 'https://picsum.photos/seed/picsum2/600/400' },
  { link: '/research', text: 'Research', image: 'https://picsum.photos/seed/picsum3/600/400' },
  { link: '/games', text: 'Games', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/docs', text: 'Docs', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/about', text: 'About Us', image: 'https://picsum.photos/seed/picsum4/600/400' },
  { link: '/menu', text: 'Menu', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/docs/examples', text: 'Examples', image: 'https://picsum.photos/seed/picsum5/600/400' },
  { link: '/intros', text: 'Intros', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/whitepaper', text: 'Whitepaper', image: 'https://picsum.photos/seed/picsum1/600/400' },
];

const FlowingMenuDemo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <style jsx global>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marqueeScroll 25s linear infinite;
        }
      `}</style>

      <div className="flex flex-col w-full min-h-screen justify-center items-center bg-gray-100 dark:bg-neutral-900 p-4 transition-colors duration-300">
    

        <div
          className="relative shadow-xl rounded-lg overflow-hidden"
          style={{ height: '600px', width: '100%', maxWidth: '450px' }}
        >
          <FlowingMenu items={demoItems} />
          <MagicCard className="rounded-lg m-2 w-full">
            <NotchTwo />
          </MagicCard>
        </div>
      </div>
    </>
  );
};

export default FlowingMenuDemo;