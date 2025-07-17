export function extractPersonality(content: string) {
  const match = content.match(
    /\[\[PERSONALITY\]\]([\s\S]*?)\[\[\/PERSONALITY\]\]/
  );

  if (!match) return { personality: null, clean: content };
  return {
    personality: match[1].trim(),
    clean: content.replace(match[0], "").trim(),
  };
}
