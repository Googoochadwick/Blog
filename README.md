# Astro Personal Template

A minimal, English-only personal blog built with Astro. The existing layout, posts, notes, categories, theme toggle, Markdown/MDX rendering, and static output are retained.

## Requirements

- Node.js 22.12 or newer
- pnpm

## Development

```sh
pnpm install
pnpm dev
```

## Production build

```sh
pnpm build
pnpm preview
```

## Deploy to Vercel

Import this project into Vercel and use the default Astro framework settings. Build command: `pnpm build`; output directory: `dist`. No GitHub Actions or repository configuration is included.

## Content

- Blog posts: `src/content/post/en/`
- Notes: `src/content/note/en/`
- Site title, description, social links, and navigation: `src/data/config.json`

The English routes currently live under `/en/`; the root page redirects there. Add Markdown or MDX files using the existing content frontmatter as a starting point.

## License

The source archive did not include a root-level `LICENSE` file. Add the license you intend to use before publishing.
