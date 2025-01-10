"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function Heading({ level, children, id, className = "" }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const router = useRouter();

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (id) {
        // Update URL with hash
        window.history.pushState({}, "", `#${id}`);
        // Copy URL to clipboard
        const url = `${window.location.href.split("#")[0]}#${id}`;
        navigator.clipboard.writeText(url);
      }
    },
    [id]
  );

  return (
    <Tag id={id} className={`group relative flex items-start gap-2 ${className}`}>
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          onClick={handleAnchorClick}
          className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
          aria-label={`Copy link to ${id}`}
        >
          #
        </a>
      )}
    </Tag>
  );
}
