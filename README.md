# MDX Starter Template

A minimal, modern MDX starter template built with Next.js 15 and Tailwind CSS.

## Features

- **Next.js 15** - Latest App Router and React Server Components
- **MDX** - Write content using Markdown + React components
- **Code Highlighting** - Syntax highlighting with copy-to-clipboard
- **Dark Mode** - Built-in dark mode with system preference detection
- **Anchor Links** - Clickable heading anchors for easy sharing
- **Metadata Support** - Built-in frontmatter-style metadata for MDX files
- **Shadcn/UI** - Beautiful and accessible components
- **TypeScript** - Full type safety and modern development features
- **Tailwind CSS** - Utility-first CSS framework
- **Mobile-First** - Responsive design for all devices

## Quick Start

```bash
# Clone the repository
git clone https://github.com/brijr/mdx.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Documentation

### File Structure

```
mdx/
├── app/                # Next.js App Router
│   ├── (markdown)/    # MDX content routes
│   └── page.tsx       # Landing page
├── components/        # React components
│   ├── mdx/          # MDX-specific components
│   └── theme/        # Theme components
└── styles/           # Global styles
```

### Writing Content

Create new `.mdx` files in the `app/(markdown)` directory. Each file automatically becomes a route.

#### Basic MDX Example

```mdx
# My New Page

Welcome to my **MDX** page!

\`\`\`typescript
// Code with syntax highlighting
function hello(name: string) {
  return `Hello, ${name}!`;
}
\`\`\`
```

#### Adding Metadata

Add metadata to your MDX files for better SEO and content organization:

```mdx
import { Meta } from "@/components/mdx/meta";

export const metadata = {
  title: "Your Page Title",
  description: "A brief description of your page",
  date: "2025-01-09",
  author: "Your Name",
  tags: ["mdx", "next.js", "react"],
};

<Meta {...metadata} />

# Your content here
```

The metadata component will automatically display:
- Title and description
- Publication date
- Author information
- Tags with a beautiful pill-style design

### Features

#### Code Blocks
- Syntax highlighting for multiple languages
- Copy-to-clipboard button
- Dark mode support

#### Anchor Links
- Clickable `#` next to headings
- Automatically copies URL with anchor
- Perfect for sharing specific sections

#### Dark Mode
- System preference detection
- Manual toggle option
- Persists across sessions

#### Metadata Support
- TypeScript interfaces for type safety
- Customizable metadata fields
- Beautiful component for displaying metadata
- SEO-friendly structure

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbrijr%2Fmdx)

## Contributing

Pull requests are welcome! Feel free to open an issue for any bugs or feature requests.

## License

MIT License - feel free to use this in your own projects!

---

Made by [Bridger](https://bridger.to)
