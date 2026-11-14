/**
 * Renders data copy that marks emphasis with **double asterisks** as
 * <strong> runs, e.g. "Cut cycle time **25%**". No other markdown.
 */
export function renderBold(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => (i % 2 === 0 ? part : <strong key={i}>{part}</strong>));
}
