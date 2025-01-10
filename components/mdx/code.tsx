"use client";

import { cn } from "@/lib/utils";
import { Highlight, themes } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CodeProps {
  children: string;
  className?: string;
  language?: string;
}

export function Code({
  children,
  className,
  language = "typescript",
}: CodeProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(children);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="group relative">
      {/* Language badge */}
      <div className="absolute right-4 top-4 z-10 rounded bg-muted/50 px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        {language}
      </div>
      {/* Copy button - moved to left to avoid overlap */}
      <button
        onClick={copyToClipboard}
        className="absolute right-20 top-4 z-20 h-8 w-8 rounded-md border bg-muted p-2 transition-opacity opacity-0 group-hover:opacity-100 hover:bg-muted/80"
        aria-label="Copy code"
      >
        {hasCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <Highlight
        theme={themes.nightOwl}
        code={children.trim()}
        language={language}
      >
        {({
          className: _className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <pre
            className={cn(
              "overflow-x-auto rounded-lg bg-[#011627] p-4 my-6",
              className
            )}
            style={style}
          >
            <code className="block text-sm">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
}
