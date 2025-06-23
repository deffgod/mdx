import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { Main, Section, Container, Article, Prose, Box } from "@/components/craft";
import { Craft } from "@/components/craft";
import { Accordion } from "@/components/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimateText } from "@/components/animations/animate-text";
import { Counter } from "@/components/animations/counter";
import { Calendar } from "@/components/cards/calendar";
import { GoogleInput } from "@/components/inputs/google";
import { PasswordStrength } from "@/components/inputs/password-strength";
import { Sparkles } from "@/components/buttons/sparkles";
import { StatusButton } from "@/components/buttons/status-button";
import { ThemeSwitcher } from "@/components/shared/mode-toggle";


export default function WhitepaperPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <div className="font-bold">PROTOCOL</div>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Overview
              </Link>
              <Link href="/docs/components" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Components
              </Link>
              <Link href="/docs/hooks" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Hooks
              </Link>
              <Link href="/docs/examples" className="transition-colors hover:text-foreground/80 text-foreground/60">
                Examples
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Mobile menu could go here */}
            </div>
            <nav className="flex items-center">
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <div className="w-full">
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Getting Started
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs"
                  >
                    Introduction
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/installation"
                  >
                    Installation
                  </Link>
                </div>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Components
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/components/animations"
                  >
                    Animations
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/components/cards"
                  >
                    Cards
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/components/inputs"
                  >
                    Inputs
                  </Link>
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/components/buttons"
                  >
                    Buttons
                  </Link>
                </div>
              </div>
              <div className="pb-4">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                  Hooks
                </h4>
                <div className="grid grid-flow-row auto-rows-max text-sm">
                  <Link
                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-muted-foreground"
                    href="/docs/hooks"
                  >
                    Overview
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}