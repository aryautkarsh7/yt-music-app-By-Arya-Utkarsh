# 🎵 YT Music — Desktop App for Mac

> A custom YouTube Music desktop app for macOS with no ads, built entirely from scratch by **Arya Utkarsh**.

---

## 📖 About

I built this project to solve a simple problem — there is no official YouTube Music desktop app for Mac, and using it in a browser means dealing with ads constantly. So I built my own.

This app wraps YouTube Music in a native Mac desktop experience, automatically blocks and skips ads, and feels like a real app — with a custom icon, its own spot in the dock, and a proper menu bar.

---

## ✨ Features

- 🚫 **Ad blocker** — automatically skips and hides all ads
- 🖥️ **Native Mac app** — lives in your dock like Spotify or any real app
- 🎨 **Custom icon** — designed and built from scratch
- ⌨️ **Keyboard shortcuts** — `Cmd+Right` next, `Cmd+Left` previous, `Cmd+F` fullscreen
- 🔇 **Smart ad detection** — only skips actual ads, never your music
- 📦 **Installable DMG** — drag and drop to install, no setup needed

---

## 🛠️ Built With

| Technology | What I used it for |
|---|---|
| **Electron** | Wrapping the web app into a native Mac desktop app |
| **JavaScript** | App logic, ad detection, auto-skip |
| **HTML & CSS** | Hiding ad UI elements via injected styles |
| **electron-builder** | Packaging the app into an installable `.dmg` file |
| **Node.js** | Running the development environment |
| **Git & GitHub** | Version control and hosting the source code |
| **sips + iconutil** | Converting and building the Mac `.icns` icon |

---

## 🚀 How to Download & Install

1. Go to the [**Releases**](../../releases) page
2. Download `YT Music-1.0.0-arm64.dmg`
3. Open the DMG → drag **YT Music** into your Applications folder
4. Open it from Launchpad

> **Note:** macOS may say the app is from an unidentified developer. Go to **System Settings → Privacy & Security → Open Anyway** to launch it.

---

## 🧑‍💻 How to Run from Source

```bash
# Clone the repo
git clone https://github.com/aryautkarsh7/yt-music-app-By-Arya-Utkarsh.git
cd yt-music-app-By-Arya-Utkarsh

# Install dependencies
npm install

# Run the app
npm start

# Build the DMG
npm run build
```

---

## 💡 What I Learned

- How **Electron** works and how major apps like VS Code, Spotify and Discord are built
- How to intercept and manipulate web content inside a desktop app
- How to package and distribute a Mac app as a `.dmg`
- How **Git and GitHub** work for version control and open source distribution
- How ad detection works at the DOM and network level

---

## 👤 Author

**Arya Utkarsh**
- GitHub: [@aryautkarsh7](https://github.com/aryautkarsh7)

---

*Built from scratch — no templates, no shortcuts.*
