export async function processText(text) {
  return text
    .split('. ')
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0)
    .join('.\n\n');
}