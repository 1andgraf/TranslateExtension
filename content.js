let hoverTooltip = null;
let selectionTooltip = null;
let lastWord = "";
let hoverTimeout = null;

function createTooltip(text, x, y, type = "hover") {
  if (!text) return;

  let tooltip = type === "hover" ? hoverTooltip : selectionTooltip;

  if (tooltip) {
    tooltip.remove();
    if (type === "hover") hoverTooltip = null;
    else selectionTooltip = null;
  }

  tooltip = document.createElement("div");
  tooltip.className = "hover-tooltip";
  tooltip.innerHTML = "Translating...";
  document.body.appendChild(tooltip);

  const offset = 15;
  tooltip.style.top = y + offset + "px";
  tooltip.style.left = x + offset + "px";

  requestAnimationFrame(() => tooltip.classList.add("show"));

  if (type === "hover") hoverTooltip = tooltip;
  else selectionTooltip = tooltip;

  chrome.storage.sync.get(["apiKey", "targetLang"], (settings) => {
    chrome.runtime.sendMessage(
      {
        action: "translate",
        text: text,
        apiKey: settings.apiKey,
        target: settings.targetLang || "EN",
      },
      (response) => {
        if (!tooltip) return;
        if (chrome.runtime.lastError) {
          tooltip.innerHTML = "Error: " + chrome.runtime.lastError.message;
          return;
        }
        if (response && response.success) {
          tooltip.innerHTML =
            response.translatedText +
            `<span class="source-lang">Original language: ${response.detectedLanguage}</span>`;
        } else {
          tooltip.innerHTML = "Error: " + (response?.error || "Unknown error");
        }
      }
    );
  });
}

function removeTooltip(type = "hover") {
  let tooltip = type === "hover" ? hoverTooltip : selectionTooltip;
  if (tooltip) {
    tooltip.classList.remove("show");
    setTimeout(() => {
      if (tooltip) {
        tooltip.remove();
        if (type === "hover") hoverTooltip = null;
        else selectionTooltip = null;
      }
    }, 200);
  }
}

document.addEventListener("mousemove", (e) => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    removeTooltip("hover");
    return;
  }

  const range = document.caretRangeFromPoint(e.clientX, e.clientY);
  if (!range || !range.startContainer || !range.startContainer.textContent) {
    removeTooltip("hover");
    return;
  }

  const textNode = range.startContainer;
  const text = textNode.textContent;
  const offset = range.startOffset;

  if (!text.trim()) {
    removeTooltip("hover");
    return;
  }

  let start = offset;
  while (start > 0 && /\w/.test(text[start - 1])) start--;
  let end = offset;
  while (end < text.length && /\w/.test(text[end])) end++;

  const word = text.slice(start, end).trim();
  if (!word) {
    removeTooltip("hover");
    return;
  }

  const wordRange = document.createRange();
  wordRange.setStart(textNode, start);
  wordRange.setEnd(textNode, end);
  const rects = wordRange.getClientRects();
  wordRange.detach();

  let inside = false;
  for (const rect of rects) {
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      inside = true;
      break;
    }
  }

  if (!inside) {
    removeTooltip("hover");
    lastWord = "";
    return;
  }

  if (word === lastWord) return;
  lastWord = word;

  if (hoverTimeout) clearTimeout(hoverTimeout);
  hoverTimeout = setTimeout(
    () => createTooltip(word, e.pageX, e.pageY, "hover"),
    100
  );
});

document.addEventListener("mouseup", (e) => {
  const selectionText = window.getSelection().toString().trim();
  if (!selectionText) return;

  createTooltip(selectionText, e.pageX, e.pageY, "selection");
});

document.addEventListener("selectionchange", () => {
  const selectionText = window.getSelection().toString().trim();
  if (!selectionText) removeTooltip("selection");
});

document.addEventListener("mouseleave", () => removeTooltip("hover"));
document.addEventListener("scroll", () => {
  const selectionText = window.getSelection().toString().trim();
  if (!selectionText) removeTooltip("hover");
});
