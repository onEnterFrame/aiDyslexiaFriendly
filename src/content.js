console.log("Content script loaded");
document.addEventListener("selectionchange", () => {
  const selectedText = window.getSelection().toString();
  console.log("Content Selected text", selectedText.length);
  chrome.runtime.sendMessage({ text: selectedText });
});
