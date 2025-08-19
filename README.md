# Translator Tooltip Extension

A simple Chrome extension that translates text **on hover** (single words) or **on selection** (phrases/sentences).  
It automatically detects the source language and shows a tooltip near your cursor with the translation.

---

## ✨ Features
- 🔍 **Hover over a word** → shows its translation after a short delay.
- 📖 **Select text** → shows a translation of the entire phrase or sentence.
- 🌐 **Automatic language detection** → no need to choose source language.
- ⚙️ **Customizable target language** in settings (auto-saved).
- 🎨 Clean, modern UI with smooth tooltip animations.

---

## 📦 Installation (Development Mode)

1. Clone or download this repository.
   ```bash
   git clone https://github.com/yourusername/translator-extension.git
   ```
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension icon will appear in your toolbar.

---

## 🚀 Publishing

1. Create a ZIP of the extension folder (with `manifest.json` at root).
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. Pay the **$5 one-time developer fee** if not already done.
4. Upload the ZIP, fill out the description, add screenshots.
5. Click **Publish**. Google may take a few hours to review.

---

## 🛠 File Structure

```
translator-extension/
├── manifest.json      # Extension manifest
├── background.js      # Handles translation requests
├── content.js         # Injected into pages, shows tooltips
├── popup.html         # Extension settings UI
├── popup.js           # Saves target language settings
├── styles.css         # Tooltip and popup styling
```

---

## ⚙️ Settings

- Open the extension popup from the Chrome toolbar.
- Choose your **target language** (English, German, French, etc.).
- The setting is saved automatically — no need for a Save button.

---

## 🔒 Privacy & Permissions

- The extension only reads **selected or hovered text** on the active page to provide translations.  
- No browsing history or personal data is collected.  
- Requires access to the translation API (Google/DeepL/etc. depending on your setup).  

---

## 📸 Screenshots

*(Replace with actual screenshots)*  
![Tooltip Example](screenshots/tooltip.png)  
![Popup Settings](screenshots/popup.png)  

---

## 📜 License

MIT License — feel free to use, modify, and share.
