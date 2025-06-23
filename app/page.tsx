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
import AnimateText from "@/components/animations/animate-text";
import MagicCard from "@/components/magic-card";
import { Dock, type DockItemData } from "@/components/ui/dock";
import { useRouter } from "next/navigation";
import {
  Shield,
  FlaskConical,
  Gamepad2,
  FileText,
  Users,
  SquareCode,
} from "lucide-react";
import CreateNew from "@/components/buttons/create";
import Pill from "@/components/cards/pill";
import NotchTwo from "@/components/cards/notch-two";


const MenuItems = [
  { link: '/protocol', text: 'Protocol', image: 'https://picsum.photos/seed/picsum2/600/400' },
  { link: '/research', text: 'Research', image: 'https://picsum.photos/seed/picsum3/600/400' },
  { link: '/games', text: 'Games', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/docs', text: 'Docs', image: 'https://picsum.photos/seed/picsum1/600/400' },
  { link: '/about', text: 'About Us', image: 'https://picsum.photos/seed/picsum4/600/400' },
  { link: '/docs/examples', text: 'Examples', image: 'https://picsum.photos/seed/picsum5/600/400' }
];



export default function HomePage() {
  const router = useRouter();

  const iconMap: { [key: string]: React.ReactNode } = {
    '/protocol': <Shield size={32} />,
    '/research': <FlaskConical size={32} />,
    '/games': <Gamepad2 size={32} />,
    '/docs': <FileText size={32} />,
    '/about': <Users size={32} />,
    '/docs/examples': <SquareCode size={32} />,
  };

  const dockItems: DockItemData[] = MenuItems.map((item) => ({
    icon: iconMap[item.link] || <div />,
    label: item.text,
    onClick: () => router.push(item.link),
  }));

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="min-h-screen bg-black">
      <div className="container mx-auto p-2 h-full">
        <div className="text-center mb-2 h-full">
          <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen w-full p-2">
          <div className="flex flex-col items-center justify-center">
          <TextPressure className="rounded-lg m-2" />
          <h1 className="text-4xl font-bold text-white mb-6">
           PROTOCOL
        </h1> 

        <div className="flex flex-col items-center">
        <Entropy className="rounded-lg" />
        </div>
        <div className="flex flex-col items-center">        </div>
        <div className="flex flex-col items-center">
          </div>
        </div> 
        <div className="flex flex-col items-center justify-center">
        </div>
        <div className="flex flex-col items-center justify-center"> 
        <Dock items={dockItems} />
        </div>    
          <MagicCard className="rounded-lg m-2 w-full">
          </MagicCard>
        </div>
        
        </div>
      </div>
      </div>

      <div className="text-center p-8 rounded-xl border-solid border-purple-900/80">
      <FlowingMenu items={MenuItems} />

              <div className="space-y-4 font-mono text-[12px] leading-relaxed">
                <p className=" text-gray-400/80 p-6">This is a research project. Not intended for investment or profit. Use at your own risk. 
                  Developers are not responsible for any consequences.</p>
              </div>
                  </div>
    </main>
  )
}

const ToDelete = () => {
  return (
    <section className="p-6 sm:p-12 flex flex-col gap-4 text-center items-center max-w-screen-lg">
     
    <h1>
        <a
          className="underline underline-offset-2 hover:text-muted-foreground"
          href="https://github.com/brijr/mdx"
        >
          brijr/mdx
        </a>
      </h1>
      <h2>
        MDX and Next.js Starter made by{" "}
        <a
          className="underline underline-offset-2 hover:text-muted-foreground"
          href="https://bridger.to"
        >
          Bridger
        </a>{" "}
        at{" "}
        <a
          className="underline underline-offset-2 hover:text-muted-foreground"
          href="https://wipdes.com"
        >
          WIP
        </a>
        . View an{" "}
        <Link
          className="underline underline-offset-2 hover:text-muted-foreground"
          href="/example"
        >
          example page
        </Link>
        .
      </h2>

      {/* Screenshot */}
      <Image
        src={Screenshot}
        alt="MDX Starter Screenshot"
        placeholder="blur"
        className="my-4 sm:my-8 border rounded-md"
      />

      {/* Vercel Deploy */}
      <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbrijr%2Fmdx">
        <img
          width="103"
          height="32"
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
        />
      </a>
      <p className="text-sm text-muted-foreground">
        Deploy with{" "}
        <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbrijr%2Fmdx">
          Vercel
        </a>
      </p>
    </section>
  );
};
