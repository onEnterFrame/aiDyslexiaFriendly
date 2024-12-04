import { ref } from "vue";

export function useTextProcessing() {
  let port = null;
  const pageText = ref("");
  const isProcessing = ref(false);
  const error = ref(null);

  function setupPortConnection() {
    // Only create a new connection if one doesn't exist
    if (!port) {
      port = chrome.runtime.connect({ name: "text_stream" });
      console.log("useText Port connected", port);

      port.onDisconnect.addListener(() => {
        port = null;
        console.log("Port disconnected");
      });

      port.onMessage.addListener((message) => {
        console.log("useText Received message from background", message);
        switch (message.type) {
          case "chunk":
            pageText.value = message.content;
            break;
          case "complete":
            isProcessing.value = false;
            error.value = null;
            break;
          case "error":
            console.error("Error processing text:", message.content);
            error.value = message.content;
            isProcessing.value = false;
            break;
          default:
            console.log("Unknown message type:", message.type);
        }
      });
    }
    return port;
  }

  async function runAIOnSelectedText() {
    console.log("Running AI on selected text");
    const connection = setupPortConnection();
    if (connection) {
      isProcessing.value = true;
      connection.postMessage({
        type: "EXTRACT_TEXT",
      });
    }
  }

  function cleanup() {
    console.log("Cleaning up");
    if (port) {
      port.disconnect();
      port = null;
    }
  }

  return {
    pageText,
    isProcessing,
    error,
    runAIOnSelectedText,
    cleanup,
    setupPortConnection,
  };
}
