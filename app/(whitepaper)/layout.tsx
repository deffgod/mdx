import * as Craft from "@/components/craft";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ThemeProvider } from "next-themes";
export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeToggle />
      <Craft.Main>
        <Craft.Section>
          <Craft.Container>{children}</Craft.Container>
        </Craft.Section>
      </Craft.Main>
    </div>
  );
}
