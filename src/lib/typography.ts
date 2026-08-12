/**
 * Headline typography helper.
 *
 * `text-wrap: balance` (see global.css) evens out line lengths but happily
 * breaks a phrase after an article or a preposition — "on a / Utah road",
 * "una carretera / de Utah" — which reads like a mistake in a big headline.
 *
 * `nb()` glues those short function words to the word that follows, with a
 * non-breaking space, so the line can only break at a meaningful point. It
 * works in both languages from one word list, so new copy is covered without
 * anyone remembering to hand-place a &nbsp;.
 */

/** Words that must never end a line: they belong to what comes after. */
const TIE = new Set([
  // Spanish
  'de', 'del', 'en', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
  'y', 'e', 'o', 'u', 'a', 'al', 'con', 'por', 'para', 'sin', 'que', 'su',
  'tu', 'mi', 'lo', 'se', 'no', 'ni', 'más',
  // English
  'an', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'and', 'or', 'but',
  'with', 'from', 'we', 'you', 'your', 'our', 'my', 'it', 'is', 'if',
]);

/**
 * Longest run we are willing to make unbreakable. Past this a narrow phone
 * would overflow, which is worse than an awkward break.
 */
const MAX_RUN = 16;

/** Explicit, so nobody mistakes it for a normal space when editing. */
const NBSP = '\u00A0';

/** Bare lowercase form of a word, so "Utah," or "¿Tuviste" compare cleanly. */
function key(word: string): string {
  return word.toLowerCase().replace(/[^\p{L}\p{M}]/gu, '');
}

/**
 * Editorial line break inside a headline. Copy can mark where the phrase is
 * allowed to split — usually a clause boundary — with a `|`:
 *
 *   'Si pasó en una carretera de Utah,|podemos ayudar'
 *
 * The break is honoured from `sm` up, where the headline has room; on a phone
 * the lines flow together and `nb()` keeps the phrases from splitting badly.
 */
export const BREAK = '|';

/** A headline's lines, each already protected against dangling short words. */
export function headlineLines(text: string): string[] {
  return text
    .split(BREAK)
    .map((line) => nb(line.trim()))
    .filter(Boolean);
}

export function nb(text: string): string {
  const words = text.split(/\s+/).filter(Boolean);
  const out: string[] = [];
  let run = '';

  for (const word of words) {
    if (run) {
      const joined = run + NBSP + word;
      if (joined.length <= MAX_RUN) {
        run = joined;
        // A tie word keeps the run open; anything else closes it.
        if (!TIE.has(key(word))) {
          out.push(run);
          run = '';
        }
        continue;
      }
      out.push(run);
      run = '';
    }
    if (TIE.has(key(word))) run = word;
    else out.push(word);
  }

  if (run) out.push(run);
  return out.join(' ');
}
