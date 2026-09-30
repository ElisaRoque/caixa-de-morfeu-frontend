const BASE_URL = "/api/v1";

export function getDreamSymbol(symbol) {
  return fetch(`${BASE_URL}/dreams/symbol/${symbol}`).then((response) => {
    if (!response.ok) {
      const error = new Error(`Erro da API: ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return response.json();
  });
}
