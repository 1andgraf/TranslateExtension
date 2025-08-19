const targetLangSelect = document.getElementById("targetLang");

chrome.storage.sync.get(["targetLang"], (data) => {
  if (data.targetLang) targetLangSelect.value = data.targetLang;
});

targetLangSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ targetLang: targetLangSelect.value });
});
