import * as Craft from "@/components/craft";

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Craft.Main>
      <Craft.Section>
        <Craft.Container>
          <Craft.Prose>{children}</Craft.Prose>
        </Craft.Container>
      </Craft.Section>
    </Craft.Main>
  );
}
