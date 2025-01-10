import * as Craft from "@/components/craft";

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Craft.Main>
      <Craft.Section>
        <Craft.Container>{children}</Craft.Container>
      </Craft.Section>
    </Craft.Main>
  );
}
