chrome.storage.sync.get({ targetLang: "en" }, (items) => {
  document.getElementById("targetLang").value = items.targetLang;
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const lang = document.getElementById("targetLang").value;
  chrome.storage.sync.set({ targetLang: lang }, () => {
    alert("Settings saved!");
  });
});
