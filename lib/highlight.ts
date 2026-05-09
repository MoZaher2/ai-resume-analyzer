export function highlightKeywords(text: string, keywords: string[]): string {
  if (!text || !keywords || keywords.length === 0) return text;
  
  // Escape HTML to prevent XSS
  const escapeHtml = (unsafe: string) => {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  };

  let escapedText = escapeHtml(text);
  
  // Create a regex to match all keywords (case-insensitive) safely
  const escapedKeywords = keywords
    .filter(k => k.trim() !== '')
    .map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    
  if (escapedKeywords.length === 0) return escapedText;

  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');
  return escapedText.replace(regex, '<mark class="bg-yellow-200 text-yellow-900 rounded-sm px-1 font-medium transition-colors hover:bg-yellow-300">$1</mark>');
}
