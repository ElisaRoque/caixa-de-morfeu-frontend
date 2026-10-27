import { useEffect, useState } from "react";
import { getDreams, updateDream, deleteDream } from "../../utils/MainApi";
import "../../../blocks/my-dreams.css";

function MyDreams() {
  const [dreams, setDreams] = useState([]);
  const [isLoading, setIsLoading] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );
  const [error, setError] = useState(() =>
    localStorage.getItem("token")
      ? ""
      : "Você precisa estar logada para ver seus sonhos.",
  );
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: "",
    description: "",
    recurring: false,
  });
  const [actionError, setActionError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    getDreams(token)
      .then((data) => setDreams(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleEdit = (dream) => {
    setEditingId(dream._id);
    setEditForm({
      date: new Date(dream.date).toISOString().slice(0, 10),
      description: dream.description,
      recurring: dream.recurring,
    });
    setActionError("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setActionError("");
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (event, dreamId) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setActionError("Sua sessão expirou. Entre novamente.");
      return;
    }

    setIsSaving(true);
    setActionError("");

    updateDream(dreamId, editForm, token)
      .then((updatedDream) => {
        setDreams((previous) =>
          previous.map((dream) =>
            dream._id === dreamId ? updatedDream : dream,
          ),
        );
        setEditingId(null);
      })
      .catch((err) => setActionError(err.message))
      .finally(() => setIsSaving(false));
  };

  const handleDelete = (dreamId) => {
    const confirmed = window.confirm(
      "Tem certeza de que deseja excluir este sonho? Essa ação não pode ser desfeita.",
    );

    if (!confirmed) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setActionError("Sua sessão expirou. Entre novamente.");
      return;
    }

    setDeletingId(dreamId);
    setActionError("");

    deleteDream(dreamId, token)
      .then(() => {
        setDreams((previous) =>
          previous.filter((dream) => dream._id !== dreamId),
        );

        if (editingId === dreamId) {
          setEditingId(null);
        }
      })
      .catch((err) => setActionError(err.message))
      .finally(() => setDeletingId(null));
  };

  if (isLoading) {
    return <main className="my-dreams">Carregando seus sonhos...</main>;
  }

  if (error) {
    return <main className="my-dreams">{error}</main>;
  }

  return (
    <main className="my-dreams">
      <h1 className="my-dreams__title">Meus Sonhos</h1>

      {actionError && (
        <p className="my-dreams__error" role="alert">
          {actionError}
        </p>
      )}

      {dreams.length === 0 ? (
        <p>Você ainda não registrou nenhum sonho.</p>
      ) : (
        <ul className="my-dreams__list">
          {dreams.map((dream) => (
            <li className="my-dreams__item" key={dream._id}>
              <strong className="my-dreams__symbol">{dream.symbol.name}</strong>

              {editingId === dream._id ? (
                <form
                  className="my-dreams__edit-form"
                  onSubmit={(event) => handleSave(event, dream._id)}
                >
                  <label>
                    Data do sonho
                    <input
                      type="date"
                      name="date"
                      value={editForm.date}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Descrição
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      name="recurring"
                      checked={editForm.recurring}
                      onChange={handleChange}
                    />
                    Sonho recorrente
                  </label>

                  <button type="submit" disabled={isSaving}>
                    {isSaving ? "Salvando..." : "Salvar alterações"}
                  </button>

                  <button type="button" onClick={handleCancelEdit}>
                    Cancelar
                  </button>
                </form>
              ) : (
                <>
                  <span className="my-dreams__date">
                    {new Date(dream.date).toLocaleDateString("pt-BR", {
                      timeZone: "UTC",
                    })}
                  </span>

                  <p className="my-dreams__description">{dream.description}</p>

                  <span className="my-dreams__recurring">
                    {dream.recurring ? "Recorrente" : "Não recorrente"}
                  </span>

                  <div className="my-dreams__actions">
                    <button type="button" onClick={() => handleEdit(dream)}>
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(dream._id)}
                      disabled={deletingId === dream._id}
                    >
                      {deletingId === dream._id ? "Excluindo..." : "Excluir"}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default MyDreams;
