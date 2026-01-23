# Bongo Cat View for Obsidian

Give your sidebar a companion! This plugin adds a cute Bongo Cat that reacts to your typing in real-time with fluid animations and smart idle states.

![Bongo Cat Preview](https://raw.githubusercontent.com/saatvik333/wayland-bongocat/main/assets/bongo-cat-both-up.png)

## Features

- **Reactive Typing**: The cat drums along as you write in any note.
- **Smart Animation States**:
  - **Work Mode**: Alternates paws quickly while you are actively typing.
  - **Idle (1s)**: The cat raises both paws after 1 second of inactivity.
  - **Sleep (10s)**: The cat rests both paws on the table after 10 seconds of inactivity.
- **Local & Private**: All assets are embedded as Base64 strings. No internet connection is required, and no data ever leaves your vault.
- **Performance Optimized**: Uses debounced timers to ensure smooth transitions without impacting editor speed.

## How to Use

1. **Open the View**: Click the **Cat icon** in the left ribbon (sidebar).
2. **Start Typing**: Open any note and start writing. The cat will automatically detect your keystrokes.
3. **Customize**: You can find basic settings in the plugin settings tab.

## Manual Installation

If you want to install this plugin manually:

1. Download `main.js`, `manifest.json`, and `styles.css` from the [Latest Release](https://github.com/Onstrax/obsidian-bongo-cat/releases).
2. Create a folder named `obsidian-bongo-cat` in your vault's plugin folder: `<vault>/.obsidian/plugins/`.
3. Move the downloaded files into that folder.
4. Reload Obsidian and enable the plugin in **Settings -> Community Plugins**.

## Development

If you want to contribute or modify the plugin:

- Install dependencies: `npm install`
- Run in dev mode: `npm run dev`
- Build for production: `npm run build`

## License

This project is licensed under the **ISC License**. See the `LICENSE` file for details.

---
**Made with ❤️ for the Obsidian community by [Onstrax](https://github.com/Onstrax)**
