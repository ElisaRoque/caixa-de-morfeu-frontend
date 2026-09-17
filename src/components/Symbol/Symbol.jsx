import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../blocks/symbol.css";

function Symbol() {
  const location = useLocation();
  const dream =
    location.state || JSON.parse(localStorage.getItem("dreamSymbol"));

  const [visibleCards, setVisibleCards] = useState(3);

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
    </main>
  );
}

export default Symbol;
