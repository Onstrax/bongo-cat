# 🐾 Bongo Cat View for Obsidian

Give your sidebar the companion it deserves! **Bongo Cat View** brings a reactive, customizable, and 100% private companion to your workspace that drums along as you type.

## ✨ Key Features

* **Real-Time Reactive Typing**: The cat drums its paws instantly as you type in any editor leaf.
* **Smart Animation States**:
* **Work Mode**: Rapidly alternates paws during active typing.
* **Idle (Customizable)**: Raises both paws after a period of inactivity.
* **Deep Idle (Customizable)**: Rests both paws on the desk for a "sleep" state.

* **Total Customization**:
* **Resize**: Adjust the cat's size to fit your sidebar perfectly.
* **Custom Sprites**: Swap the default cat for your own images using Base64 strings.
* **Live Refresh**: Changes in settings apply instantly to the view—no restart required.

* **Privacy First**: 100% offline. No external network requests. All images are stored locally in your plugin settings.

---

## ⚙️ Customization

Bongo Cat is fully adaptable to your aesthetic. Navigate to **Settings -> Community Plugins -> Bongo Cat View** to find:

| Setting | Description |
| --- | --- |
| **Idle Timeout** | How many seconds before the cat raises its paws (supports decimals). |
| **Deep Idle Timeout** | Seconds of inactivity before the cat goes into "sleep" mode. |
| **Cat Size** | Adjust the width (px) of your companion. |
| **Custom Sprites** | Paste your own **Base64 Data URI** strings to change the cat's appearance. |

> [!TIP]
> **Pro Tip**: Use a "Reset to Defaults" button in the settings if you want to revert to the original Bongo Cat look instantly.

---

## 🚀 How to Use

1. **Open the View**: Click the **Cat icon** in the left ribbon or use the command `Open Bongo Cat`.
2. **Placement**: Drag the Bongo Cat leaf to your preferred sidebar or location.
3. **Write**: Start typing in any note, and watch your new friend go to work!

---

## 🛠 Installation

### From the Marketplace (Coming Soon)

1. Open **Settings** > **Community Plugins**.
2. Click **Browse** and search for `Bongo Cat View`.
3. Click **Install**, then **Enable**.

### Manual Installation (Beta)

1. Download `main.js`, `manifest.json`, and `styles.css` from the [Latest Release](https://github.com/Onstrax/obsidian-bongo-cat/releases).
2. Inside your vault, go to `.obsidian/plugins/` and create a folder named `obsidian-bongo-cat`.
3. Move the files into that folder.
4. Reload Obsidian and enable the plugin.

---

## 🔒 Technical Design & Privacy

* **Zero Latency**: The animation logic is decoupled from the main editor thread to ensure zero impact on typing performance.
* **No External Fetch**: Unlike other plugins, images are not fetched from GitHub or external CDNs. They are embedded as Base64, ensuring your vault remains functional even without an internet connection.
* **Clean Cleanup**: All timers and event listeners are properly disposed of when the view is closed to prevent memory leaks.

---

## 🏗 Development

If you'd like to build the plugin yourself:

```bash
npm install
npm run build

```

---

**Developed with ❤️ by [Onstrax**](https://github.com/Onstrax)
*Inspired by the legendary Bongo Cat meme.*
