import { useEffect, useState } from "react";
import { getDreams } from "../../utils/MainApi";
import "../../../blocks/my-dreams.css";

function MyDreams() {
  const [dreams, setDreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Você precisa estar logada para ver seus sonhos.");
      setIsLoading(false);
      return;
    }

    getDreams(token)
      .then((data) => {
        setDreams(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <main className="my-dreams">Carregando seus sonhos...</main>;
  }

  if (error) {
    return <main className="my-dreams">{error}</main>;
  }

  return (
    <main className="my-dreams">
      <h1 className="my-dreams__title">Meus Sonhos</h1>

      {dreams.length === 0 ? (
        <p>Você ainda não registrou nenhum sonho.</p>
      ) : (
        <ul className="my-dreams__list">
          {dreams.map((dream) => (
            <li className="my-dreams__item" key={dream._id}>
              <strong className="my-dreams__symbol">{dream.symbol.name}</strong>

              <span className="my-dreams__date">
                {new Date(dream.date).toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                })}
              </span>

              <p className="my-dreams__description">{dream.description}</p>

              <span className="my-dreams__recurring">
                {dream.recurring ? "Recorrente" : "Não recorrente"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyDreams;
