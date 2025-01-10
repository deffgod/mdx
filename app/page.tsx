import Link from "next/link";
import Image from "next/image";

import Screenshot from "@/public/screenshot.jpg";

export default function HomePage() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <ToDelete />
    </main>
  );
}

const ToDelete = () => {
  return (
    <section className="p-6 sm:p-24 flex flex-col gap-4 text-center items-center">
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
      </h2>

      {/* Screenshot */}
      <Image
        src={Screenshot}
        width={720}
        height={532.13}
        alt="MDX Starter Screenshot"
        placeholder="blur"
        className="border rounded-md overflow-hidden"
      />

      {/* Example Page */}
      <p>
        <Link
          className="underline underline-offset-2 hover:text-muted-foreground"
          href="/example"
        >
          View example page
        </Link>
      </p>

      {/* Vercel Deploy */}
      <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbrijr%2Fmdx-starter">
        <img
          width="103"
          height="32"
          src="https://vercel.com/button"
          alt="Deploy with Vercel"
        />
      </a>
    </section>
  );
};
