export default function Popup({ onClose, title, children }) {
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="popup" onMouseDown={handleOverlayClick}>
      <div
        className="popup__content"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          type="button"
          className="popup__close"
          aria-label="Fechar pop-up"
          onClick={onClose}
        />

        {title && <h2 className="popup__title">{title}</h2>}

        {children}
      </div>
    </div>
  );
}
