import { useState } from "react";
import { createDream } from "../../utils/MainApi";
import "../../../blocks/dream-form.css";

function getLocalDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DreamForm({ symbol, onDreamCreated, onClose, onGoToDreams }) {
  const [data, setData] = useState({
    date: getLocalDate(),
    description: "",
    recurring: false,
  });

  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Você precisa estar logada para registrar um sonho.");
      return;
    }

    const dream = {
      date: data.date,
      description: data.description,
      symbol: {
        name: symbol.name,
        slug: symbol.slug,
      },
      recurring: data.recurring,
    };

    createDream(dream, token)
      .then((newDream) => {
        onDreamCreated(newDream);
        setIsSaved(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="dream-form">
      <div className="dream-form__header">
        <h2>{isSaved ? "Sonho registrado" : "Registrar sonho"}</h2>

        <button
          className="dream-form__close"
          type="button"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
      </div>

      {isSaved ? (
        <div className="dream-form__success">
          <p>
            Seu sonho com <strong>{symbol.name}</strong> foi salvo com sucesso.
          </p>

          <button type="button" onClick={onClose}>
            Continuar lendo
          </button>

          <button type="button" onClick={onGoToDreams}>
            Meus sonhos
          </button>
        </div>
      ) : (
        <>
          <p className="dream-form__symbol">
            Símbolo: <strong>{symbol.name}</strong>
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="date">Data</label>

            <input
              id="date"
              name="date"
              type="date"
              value={data.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">O que aconteceu no sonho?</label>

            <textarea
              id="description"
              name="description"
              placeholder="Conte o que você lembra..."
              value={data.description}
              onChange={handleChange}
              required
            />

            <label>
              <input
                name="recurring"
                type="checkbox"
                checked={data.recurring}
                onChange={handleChange}
              />
              Esse símbolo aparece com frequência nos meus sonhos
            </label>

            {error && <p className="dream-form__error">{error}</p>}

            <button type="submit">Registrar sonho</button>
          </form>
        </>
      )}
    </div>
  );
}

export default DreamForm;
