const TRANSLATOR_URL = "https://api.mymemory.translated.net/get";

export function translateText(text, source, target) {
  const url = `${TRANSLATOR_URL}?q=${encodeURIComponent(
    text,
  )}&langpair=${source}|${target}`;

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Erro na tradução: ${response.status}`);
    }

    return response.json();
  });
}
