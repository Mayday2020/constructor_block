import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./EditorModal.module.scss";

const EditorModal = ({ isOpen, onClose, block, onSave }) => {
  const [formData, setFormData] = useState(block.content);

  useEffect(() => {
    setFormData(block.content);
  }, [block]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Реализуйте логику сохранения
  };

  if (!isOpen) return null;

  // Пример реализации модального окна для заголовка
  // TODO: Реализовать модальные окна для других типов блоков
  return createPortal(
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <h2>Редактировать заголовок</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Заголовок:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className={styles.formGroup}>
            <label>URL изображения:</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Сохранить
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditorModal;
