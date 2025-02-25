import Link from "next/link";
import Image from "next/image";
import Screenshot from "@/public/screenshot.jpg";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function HomePage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <ToDelete />
      <div className="fixed bottom-6 right-6">
        <ThemeToggle />
      </div>
    </main>
  );
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
