import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../blocks/symbol.css";
import "../../../blocks/dream-form.css";
import DreamForm from "../DreamForm/DreamForm";

function Symbol({ currentUser, onOpenAuthModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dream =
    location.state || JSON.parse(localStorage.getItem("dreamSymbol"));

  const [visibleCards, setVisibleCards] = useState(3);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const cards = [
    {
      title: "Tom emocional",
      content: dream.emotional_tone,
    },
    {
      title: "Arquétipo junguiano",
      content: dream.jungian_archetype,
    },
    {
      title: "Significado junguiano",
      content: dream.jungian_meaning,
    },
    {
      title: "Temas",
      content: dream.themes,
    },
    {
      title: "Perspectiva védica",
      content: dream.vedic_meaning,
    },
  ];

  return (
    <main className="symbol">
      <h1 className="symbol__title">{dream.name}</h1>

      <div className="symbol__cards">
        {cards.slice(0, visibleCards).map((card) => (
          <section className="symbol__card" key={card.title}>
            <h4 className="symbol__subtitle">{card.title}</h4>
            <p className="symbol__text">{card.content}</p>
          </section>
        ))}
      </div>

      {visibleCards < cards.length && (
        <button
          className="symbol__more"
          type="button"
          onClick={() => setVisibleCards(visibleCards + 3)}
        >
          Mostrar mais
        </button>
      )}

      {currentUser ? (
        <button
          className="symbol__save"
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          Registrar sonho
        </button>
      ) : (
        <section className="symbol__cta">
          <h2 className="symbol__cta-title">Seu sonho merece ser lembrado.</h2>

          <p className="symbol__cta-text">
            Registre seus sonhos, acompanhe os símbolos que se repetem e
            construa seu próprio diário.
          </p>

          <div className="symbol__cta-actions">
            <button
              className="symbol__cta-button"
              type="button"
              onClick={() => onOpenAuthModal("register")}
            >
              Criar minha conta
            </button>

            <button
              className="symbol__cta-login"
              type="button"
              onClick={() => onOpenAuthModal("login")}
            >
              Já tem uma conta? Entre aqui.
            </button>
          </div>
        </section>
      )}

      {isFormOpen && (
        <div className="dream-form__overlay">
          <DreamForm
            symbol={dream}
            onDreamCreated={() => {}}
            onClose={() => setIsFormOpen(false)}
            onGoToDreams={() => navigate("/meus-sonhos")}
          />
        </div>
      )}
    </main>
  );
}

export default Symbol;
