import axios from "axios";

export async function getWordMetadata(word) {
  try {
    // Call DictionaryAPI directly
    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if (Array.isArray(res.data) && res.data.length > 0) {
      return { valid: true, data: res.data };
    } else {
      return { valid: false };
    }
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return { valid: false };
  }
}
