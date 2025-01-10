// craft-ds, v0.3.2
// This is a design system for building responsive layouts in React

import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Base interface for common props
interface BaseProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
}

// HTML props interface for dangerouslySetInnerHTML
interface HTMLProps {
  dangerouslySetInnerHTML?: { __html: string };
}

// Responsive property type
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Available breakpoints
type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

// Box-specific props
interface BoxProps extends BaseProps {
  direction?: ResponsiveValue<"row" | "col">;
  wrap?: ResponsiveValue<"wrap" | "nowrap">;
  gap?: ResponsiveValue<0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12>;
  cols?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
  rows?: ResponsiveValue<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
}

// Style configurations
const styles = {
  typography: {
    base: [
      "font-sans antialiased",
      // Headings
      "[&_h1]:text-4xl [&_h1]:font-medium [&_h1]:tracking-tight",
      "[&_h2]:text-3xl [&_h2]:font-medium [&_h2]:tracking-tight",
      "[&_h3]:text-2xl [&_h3]:font-medium [&_h3]:tracking-tight",
      "[&_h4]:text-xl [&_h4]:font-medium [&_h4]:tracking-tight",
      "[&_h5]:text-lg [&_h5]:font-medium [&_h5]:tracking-tight",
      "[&_h6]:text-base [&_h6]:font-medium [&_h6]:tracking-tight",
      // Text elements
      "[&_p]:text-base [&_p]:leading-7",
      "[&_strong]:font-medium",
      "[&_small]:text-sm [&_small]:font-medium [&_small]:leading-none",
      "[&_sub]:text-sm [&_sup]:text-sm",
    ],
    links: [
      "[&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-all hover:[&_a]:text-muted-foreground",
    ],
    lists: [
      "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2",
      "[&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2",
      "[&_dl_dt]:font-medium [&_dl_dt:not(:first-child)]:mt-2 [&_dl_dd]:ml-4",
    ],
    code: [
      "[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold",
      "[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted [&_pre]:p-4",
      "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
    ],
    tables: [
      "[&_table]:w-full [&_table]:overflow-y-auto",
      "[&_thead]:border-b [&_tr]:border-t [&_tr]:p-0",
      "[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold",
      "[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left [&_td]:text-muted-foreground",
    ],
    media: [
      "[&_img]:rounded-lg [&_img]:border",
      "[&_video]:rounded-lg [&_video]:border",
      "[&_figure_figcaption]:text-xs [&_figure_figcaption]:mt-2 [&_figure_figcaption]:text-muted-foreground",
    ],
    misc: [
      "[&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic",
      "[&_hr]:my-6",
      "[&_abbr]:cursor-help [&_abbr]:underline [&_abbr]:underline-offset-4",
      "[&_details]:rounded-lg [&_details]:border [&_details]:px-4 [&_details]:py-2",
      "[&_summary]:cursor-pointer [&_summary]:font-semibold",
      "[&_kbd]:rounded-md [&_kbd]:border [&_kbd]:bg-muted [&_kbd]:px-1.5 [&_kbd]:py-0.5 [&_kbd]:text-sm [&_kbd]:font-mono",
      "[&_mark]:bg-primary/10 [&_mark]:px-1",
      "[&_::selection]:bg-primary/10",
    ],
  },
  layout: {
    spacing: "[&>*+*]:mt-6",
    article: "max-w-prose",
    container: "max-w-5xl mx-auto p-6 sm:p-8",
    section: "py-8 md:py-12",
  },
};

// Combine all typography styles
const baseTypographyStyles = [
  ...styles.typography.base,
  ...styles.typography.links,
  ...styles.typography.lists,
  ...styles.typography.code,
  ...styles.typography.tables,
  ...styles.typography.media,
  ...styles.typography.misc,
];

// Components
export const Layout = ({ children, className }: BaseProps) => (
  <html
    lang="en"
    suppressHydrationWarning
    className={cn("scroll-smooth antialiased focus:scroll-auto", className)}
  >
    {children}
  </html>
);

export const Main = ({ children, className, id }: BaseProps) => (
  <main className={cn(baseTypographyStyles, className)} id={id}>
    {children}
  </main>
);

export const Section = ({ children, className, id }: BaseProps) => (
  <section className={cn(styles.layout.section, className)} id={id}>
    {children}
  </section>
);

export const Container = ({ children, className, id }: BaseProps) => (
  <div className={cn(styles.layout.container, className)} id={id}>
    {children}
  </div>
);

export const Article = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}: BaseProps & HTMLProps) => (
  <article
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    className={cn(
      baseTypographyStyles,
      styles.layout.spacing,
      styles.layout.article,
      className
    )}
    id={id}
  >
    {children}
  </article>
);

export const Prose = ({
  children,
  className,
  id,
  dangerouslySetInnerHTML,
}: BaseProps & HTMLProps) => (
  <div
    dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    className={cn(baseTypographyStyles, styles.layout.spacing, className)}
    id={id}
  >
    {children}
  </div>
);

// Utility function for responsive classes
const getResponsiveClass = <T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  classMap: Record<T, string>
): string => {
  if (!value) return "";
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([breakpoint, val]) => {
        const prefix = breakpoint === "base" ? "" : `${breakpoint}:`;
        return val ? `${prefix}${classMap[val as T]}` : "";
      })
      .filter(Boolean)
      .join(" ");
  }
  return classMap[value];
};

export const Box = ({
  children,
  className,
  direction = "row",
  wrap = "nowrap",
  gap = 0,
  cols,
  rows,
  id,
}: BoxProps) => {
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
  };

  const wrapClasses = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap",
  };

  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-11",
    12: "grid-cols-12",
  };

  return (
    <div
      className={cn(
        cols || rows ? "grid" : "flex",
        getResponsiveClass(direction, directionClasses),
        getResponsiveClass(wrap, wrapClasses),
        getResponsiveClass(gap, gapClasses),
        cols && getResponsiveClass(cols, colsClasses),
        rows && getResponsiveClass(rows, colsClasses),
        className
      )}
      id={id}
    >
      {children}
    </div>
  );
};
