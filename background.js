chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "translate") {
    (async () => {
      try {
        const settings = await chrome.storage.sync.get([
          "apiKey",
          "targetLang",
        ]);
        const apiKey =
          settings.apiKey || "d9868f13-7878-43b3-80b8-29290ea9ed31:fx";
        const target = msg.target || settings.targetLang || "EN";

        const url = "https://api-free.deepl.com/v2/translate";
        const params = new URLSearchParams();
        params.append("auth_key", apiKey);
        params.append("text", msg.text);
        params.append("target_lang", target);

        const res = await fetch(url, { method: "POST", body: params });
        const data = await res.json();

        sendResponse({
          success: true,
          translatedText: data?.translations?.[0]?.text || "No translation",
          detectedLanguage:
            data?.translations?.[0]?.detected_source_language || "auto",
        });
      } catch (err) {
        sendResponse({ success: false, error: err.toString() });
      }
    })();

    return true;
  }
});
