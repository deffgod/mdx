import { Main, Section, Container } from "@/components/craft";

export default function MarkdownLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Main>
      <Section>
        <Container className="max-w-3xl">{children}</Container>
      </Section>
    </Main>
  );
}
