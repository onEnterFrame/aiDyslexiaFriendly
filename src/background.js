const prePrompt = `Transform this text into a format that’s more dyslexia-friendly and easier to read. Focus on simplifying the language, breaking down complex sentences, and using clear headings and bullet points. Here are some general guidelines to follow:
### **1. Break Long Sentences into Shorter Ones** - Identify sentences with multiple ideas or clauses. - Rewrite them into shorter sentences, each containing one main idea. --- ### **2. Simplify Sentence Structure** - Use plain language and avoid unnecessary phrases. - Focus on the Subject-Verb-Object structure to keep sentences clear. --- ### **3. Use Short Paragraphs** - Limit each paragraph to one main idea or closely related points. - Aim for 2–4 sentences per paragraph to reduce visual clutter. --- ### **4. Avoid Complex Vocabulary and Jargon** - Replace difficult or uncommon words with simpler alternatives where possible. --- ### **5. Keep Terminology Consistent** - Use the same word or phrase throughout instead of synonyms, which can confuse readers. --- ### **6. Use Headings or Subheadings** - Break the text into sections with descriptive headings. - Headings help readers understand the structure and find information quickly. --- ### **7. Turn Lists into Bullets** - Convert any list or series of items into bullet points to make them easier to scan. --- ### **8. Avoid Italics or Underlining** - Use **bold text** for emphasis instead of italics or underlining, which can be harder to read.
Do NOT reply with the instructions.
`;
let selectedText = "";
let port = null;
let activePort = null;

// Handle panel behavior
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Handle port connections
chrome.runtime.onConnect.addListener((port) => {
  console.log("onConnect Port connected", port);
  if (port.name === "text_stream") {
    activePort = port; // Store the active port connection

    port.onDisconnect.addListener(() => {
      activePort = null;
    });

    port.onMessage.addListener(async (message) => {
      console.log("bg Message received", message.type);
      if (message.type === "EXTRACT_TEXT") {
        try {
          // Create a new AI language model session with a system prompt
          const session = await ai.languageModel.create({
            systemPrompt: prePrompt,
          });
          if (!selectedText) {
            activePort.postMessage({
              type: "error",
              content: "No text to process",
            });
            return;
          }
          console.log("Session created", selectedText.length);
          // Start streaming the response from the AI model
          const stream = await session.promptStreaming(
            "Content to be transformed:\n" + selectedText
          );
          console.log("Streaming started", stream);

          // Iterate over each chunk of the streamed response
          for await (const chunk of stream) {
            console.log("Processing chunk", activePort);
            if (activePort) {
              activePort.postMessage({
                type: "chunk",
                content: chunk,
              });
            }
          }
          if (activePort) {
            activePort.postMessage({ type: "complete" });
          }
        } catch (error) {
          if (activePort) {
            activePort.postMessage({
              type: "error",
              content:
                error instanceof Error
                  ? error.message
                  : "Unknown error occurred",
            });
          }
        }
      }
    });
  }
});
/*  */

chrome.runtime.onMessage.addListener((message) => {
  if (message.text) {
    selectedText = message.text;
  }
});
