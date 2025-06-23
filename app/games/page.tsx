"use client"
import Link from "next/link";
import Image from "next/image";
import Screenshot from "@/public/screenshot.jpg";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import DocumentationHub from "@/components/documentation-hub";
import GamingAppMobile from "@/components/gaming-app-mobile";
import { Entropy } from "@/components/entropy";
import { FlipLinks } from "@/components/flip-links";
import FlowingMenu from "@/components/flowing-menu";
import { TextPressure } from "@/components/interactive-text-pressure";
import Overview from "@/components/cards/overview";
import { Button } from "@/components/ui/button";
import DemoShowcase from "@/components/demo-showcase";
import { AnimateText, Counter } from "@/components/animations";
import Calendar from "@/components/cards/calendar";
import { LinearCard, LinearCards } from "@/components/cards/linear-cards";
import image from "@/public/screenshot.jpg";




const MenuItems = [
  { link: '/protocol', text: 'Protocol', image: 'https://picsum.photos/seed/picsum2/600/400' },
  { link: '/research', text: 'Research', image: 'https://picsum.photos/seed/picsum3/600/400' },
  { link: '/casino', text: 'Games', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/docs', text: 'Docs', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/about', text: 'About Us', image: 'https://picsum.photos/seed/picsum4/600/400' },
];

export default function GamesPage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
    <LinearCards className="flex flex-col items-center justify-center">
    <LinearCard title="Animations" href="/docs/components/animations" image={Screenshot} />
    <LinearCard title="Cards" href="/docs/components/cards" image={image} />
    <LinearCard title="Buttons" href="/docs/components/buttons" image={image} />
    <LinearCard title="Inputs" href="/docs/components/inputs" image={image} />
    <LinearCard title="Shared" href="/docs/components/shared" image={image} /> 
    <LinearCard title="Animations" href="/docs/components/animations" image={image} />
    <LinearCard title="Cards" href="/docs/components/cards" image={image} />
    <LinearCard title="Buttons" href="/docs/components/buttons" image={image} />
    <LinearCard title="Inputs" href="/docs/components/inputs" image={image} />
    <LinearCard title="Shared" href="/docs/components/shared" image={image} />
    <LinearCard title="Animations" href="/docs/components/animations" image={image} />
    <LinearCard title="Cards" href="/docs/components/cards" image={image} />
    </LinearCards>

    </main>
  );
}

