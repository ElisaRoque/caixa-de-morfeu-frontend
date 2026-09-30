import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDreamSymbol } from "../../utils/ThirdPartyApi";
import { translateText } from "../../utils/Translator";
import Preloader from "../Preloader/Preloader";
import bellIcon from "/images/Bell.svg";
import errorIcon from "/images/Error.svg";

function Main() {
  const [symbol, setSymbol] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  function cleanSymbol(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[.,!?;:]+$/g, "")
      .trim();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotFound(false);
    setIsLoading(true);

    translateText(cleanSymbol(symbol), "pt", "en")
      .then((data) => {
        const translatedSymbol = cleanSymbol(data.responseData.translatedText);

        console.log("SÍMBOLO TRADUZIDO:", translatedSymbol);

        return getDreamSymbol(translatedSymbol);
      })
      .then((data) => {
        console.log("RESPOSTA DA ASTERWISE:", data);

        if (!data.success || !data.data) {
          throw new Error("NOT_FOUND");
        }

        const dream = data.data;

        return Promise.all([
          translateText(dream.name, "en", "pt"),
          translateText(dream.emotional_tone, "en", "pt"),
          translateText(dream.jungian_archetype, "en", "pt"),
          translateText(dream.jungian_meaning, "en", "pt"),
          translateText(dream.themes.join(", "), "en", "pt"),
          translateText(dream.vedic_meaning, "en", "pt"),
        ]).then((translations) => {
          const translatedDream = {
            ...dream,
            name: translations[0].responseData.translatedText,
            emotional_tone: translations[1].responseData.translatedText,
            jungian_archetype: translations[2].responseData.translatedText,
            jungian_meaning: translations[3].responseData.translatedText,
            themes: translations[4].responseData.translatedText,
            vedic_meaning: translations[5].responseData.translatedText,
          };

          localStorage.setItem("dreamSymbol", JSON.stringify(translatedDream));

          navigate("/simbolo", {
            state: translatedDream,
          });
        });
      })
      .catch((error) => {
        console.error("ERRO NA PESQUISA:", error);

        if (error.status === 404) {
          setNotFound(true);
          return;
        }

        setError(
          "Desculpe, algo deu errado durante a solicitação. Pode haver um problema de conexão ou o servidor pode estar inativo. Por favor, tente novamente mais tarde.",
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && <Preloader />}
      <main className="main">
        <h1 className="main__title">
          O que você encontrou
          <br />
          enquanto dormia?
        </h1>

        <form className="search" onSubmit={handleSubmit}>
          <input
            className="search__input"
            type="search"
            placeholder="Pesquise um símbolo..."
            aria-label="Pesquisar um símbolo"
            value={symbol}
            onChange={(event) => setSymbol(event.target.value)}
          />

          <button className="search__button" type="submit">
            Pesquisar
          </button>
        </form>

        {error && (
          <div className="main__error">
            <img className="main__error-icon" src={errorIcon} alt="" />

            <p className="main__error-text">{error}</p>

            <button
              className="main__error-close"
              type="button"
              aria-label="Fechar mensagem de erro"
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        )}

        {notFound && (
          <div className="main__notification">
            <img className="main__notification-icon" src={bellIcon} alt="" />

            <p className="main__notification-text">
              Não encontramos na caixa...
            </p>

            <button
              className="main__notification-close"
              type="button"
              aria-label="Fechar notificação"
              onClick={() => setNotFound(false)}
            >
              ×
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Main;
