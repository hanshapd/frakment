# Contributing to Frakment

Thanks for considering a contribution. Frakment is a small project and every fix, doc improvement, and new component helps. It also satisfies the commercial-use requirement in the license (see the bottom of this file).

## Ways to contribute

- **Report a bug** - open an issue with steps to reproduce.
- **Suggest a feature** - open an issue describing the use case.
- **Fix a typo or improve docs** - open a pull request directly.
- **Add a test** - tests are always welcome.
- **Translate content** - open an issue first to coordinate.
- **Add a component** - open an issue to discuss scope before writing code.

## Development setup

Requirements: **Node.js 20+** and **npm**.

```bash
git clone https://github.com/hanshapd/frakment.git
cd frakment
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

### Project layout

- `registry/` - component source (the library)
- `cli/` - the `frakment` CLI
- `mcp/` - the MCP server
- `skills/` - agent skill files
- `app/`, `components/`, `content/` - the docs website
- `public/r/`, `public/skills/` - generated registry output

## Before opening a pull request

1. Run the typecheck and lint:

   ```bash
   npm run typecheck
   npm run check
   ```

   Both must pass with zero errors. If you touched `registry/` or `frakment.json`, also run:

   ```bash
   npm run registry:build
   ```

2. Pre-commit hooks (lefthook) will automatically run format, lint, typecheck, and registry build. If a hook fails, fix the issue and commit again. Do not bypass with `--no-verify`.

3. Use a conventional commit message. Examples:

   ```
   feat(registry): add terminal component
   fix(cli): handle missing components.json
   docs: clarify installation for Astro
   chore: bump dependencies
   ```

   Accepted types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, `perf`.

## Pull request guidelines

- **One PR, one concern.** Small and focused beats large and mixed.
- Include a short description of **what** and **why**, not just how.
- If UI changes, attach a screenshot or short screen recording.
- Link the related issue if one exists.
- Be patient - this is a small project maintained part-time.

## Code style

- **TypeScript strict** - no `any` unless genuinely necessary.
- **Tailwind CSS 4** - utility-first, no custom CSS unless required.
- **Ultracite** (oxlint + oxfmt) - run `npm run fix` to auto-format.
- Components follow the existing patterns in `registry/*.tsx` - read a few before writing a new one.

## Commercial use

One merged pull request is the only path to commercial use under [LICENSE](./LICENSE) Section 4. The contribution can be as small as a typo fix, a doc correction, or a test. There is no minimum size.

There is no sponsorship option and no written permission option for commercial use. If you cannot or will not contribute a pull request, you cannot use Frakment commercially.

## Questions

Open a GitHub issue or reach out to [@hanshapd](https://github.com/hanshapd) directly.
