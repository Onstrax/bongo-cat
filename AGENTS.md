# Bongo Cat View - Obsidian Plugin

## Project overview

- **Target**: Obsidian Community Plugin (TypeScript → bundled JavaScript).
- **Goal**: A sidebar view featuring a Bongo Cat that reacts to typing with specific idle and work states.
- **Entry point**: `src/main.ts` compiled to `main.js`.
- **Core Feature**: Custom `ItemView` with a state-machine for animations (Idle-Up, Idle-Down, and alternating Work-Down states).

## Environment & tooling

- **Node.js**: LTS recommended.
- **Package manager**: npm.
- **Bundler**: esbuild (configured via `esbuild.config.mjs`).
- **Assets**: Images are embedded as Base64 strings in `src/view.ts` for offline compatibility and performance.

### Essential Commands

```bash
npm install      # Install dependencies
npm run dev      # Build and watch for changes
npm run build    # Production build

```

## File & folder conventions

* **Source folder**: `src/`
* **File structure**:
```
src/
  main.ts           # Plugin lifecycle & event registration (editor-change).
  view.ts           # BongoCatView logic, animation states, and Base64 assets.
  settings.ts       # Plugin settings tab and interface.

```


* **Do not commit**: `node_modules/`, `main.js`, `.DS_Store`.

## Animation Logic (State Machine)

The plugin uses a sophisticated timing system in `view.ts`:

1. **Work State**: Alternates between `left-down` and `right-down` on every `editor-change` event.
2. **Idle State 1 (1s)**: If no typing occurs for 1 second, the cat switches to `both-up`.
3. **Idle State 2 (10s)**: If no typing occurs for 10 seconds, the cat switches to `both-down`.
4. **Debouncing**: All timers are cleared and reset upon any keystroke to ensure fluid transitions.

## Manifest rules (`manifest.json`)

* **ID**: `bongo-cat`
* **Version**: Follows SemVer.
* **isDesktopOnly**: `true` (due to focus on sidebar view interactions).

## Testing & Deployment

* **Manual Install**: Copy `main.js`, `manifest.json`, and `styles.css` to `<Vault>/.obsidian/plugins/bongo-cat/`.
* **Releases**: Assets must be attached individually to the GitHub Release (not zipped).

## Security & Privacy

* **Local First**: The plugin operates entirely offline. No data is sent to external servers.
* **Embedded Assets**: Images are hardcoded in Base64 to prevent external network requests during runtime.
* **Clean Up**: All `setTimeout` and `registerEvent` listeners are properly disposed of in `onClose` and `onunload`.

## Coding Conventions

* **Sentence Case**: All UI strings (commands, settings, view titles) use sentence case (e.g., "Open Bongo cat").
* **Minimal main.ts**: Logic is delegated to `BongoCatView`. `main.ts` only handles the `editor-change` bridge.
* **Strict TypeScript**: Type assertions (`as string`) are used to ensure image sources are never undefined.

## Troubleshooting

* **Image not appearing**: Ensure the Base64 string includes the `data:image/png;base64,` prefix.
* **Animation lag**: Check the `setTimeout` clearing logic in `view.ts` to prevent overlapping timer execution.
* **Plugin not loading**: Verify the folder name in `.obsidian/plugins/` matches the `id` in `manifest.json`.
