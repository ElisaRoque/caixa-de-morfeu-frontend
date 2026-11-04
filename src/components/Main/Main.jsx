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

    const originalSymbol = symbol.trim();

    if (!originalSymbol) {
      setError("Digite um símbolo para pesquisar.");
      setNotFound(false);
      return;
    }

    setError("");
    setNotFound(false);
    setIsLoading(true);

    translateText(cleanSymbol(originalSymbol), "pt", "en")
      .then((translationData) => {
        const translatedSymbol =
          translationData?.responseData?.translatedText?.trim();

        if (!translatedSymbol) {
          throw new Error("TRANSLATION_ERROR");
        }

        console.log("SÍMBOLO ORIGINAL:", originalSymbol);
        console.log("SÍMBOLO TRADUZIDO:", translatedSymbol);

        return getDreamSymbol(cleanSymbol(translatedSymbol));
      })
      .then((data) => {
        console.log("RESPOSTA DA ASTERWISE:", data);

        if (!data?.success || !data?.data) {
          throw new Error("NOT_FOUND");
        }

        const dream = data.data;

        return Promise.all([
          translateText(dream.emotional_tone || "", "en", "pt"),
          translateText(dream.jungian_archetype || "", "en", "pt"),
          translateText(dream.jungian_meaning || "", "en", "pt"),
          translateText((dream.themes || []).join(", "), "en", "pt"),
          translateText(dream.vedic_meaning || "", "en", "pt"),
        ]).then((translations) => {
          const translatedDream = {
            ...dream,
            name:
              originalSymbol.charAt(0).toUpperCase() + originalSymbol.slice(1),
            emotional_tone: translations[0].responseData.translatedText,
            jungian_archetype: translations[1].responseData.translatedText,
            jungian_meaning: translations[2].responseData.translatedText,
            themes: translations[3].responseData.translatedText,
            vedic_meaning: translations[4].responseData.translatedText,
          };

          localStorage.setItem("dreamSymbol", JSON.stringify(translatedDream));

          navigate("/simbolo", {
            state: translatedDream,
          });
        });
      })
      .catch((error) => {
        console.error("ERRO NA PESQUISA:", error);

        if (error.message === "NOT_FOUND" || error.status === 404) {
          setNotFound(true);
          return;
        }

        if (error.message === "TRANSLATION_ERROR") {
          setError(
            "Não conseguimos traduzir o símbolo. Tente novamente mais tarde.",
          );
          return;
        }

        setError(
          "Desculpe, ocorreu um erro durante a pesquisa. Verifique sua conexão e tente novamente.",
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

          <button className="search__button" type="submit" disabled={isLoading}>
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
