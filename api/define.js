const DICT_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export default async function handler(req, res) {
  try {
    const word = (req.query.word || '').trim();
    if (!word) return res.status(400).json({ valid: false });

    const r = await fetch(`${DICT_BASE}/${encodeURIComponent(word)}`);
    const data = await r.json();
    return res.status(200).json({ valid: Array.isArray(data) && data.length > 0, data });
  } catch {
    return res.status(500).json({ valid: false });
  }
}
