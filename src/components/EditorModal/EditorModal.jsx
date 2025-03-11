import {useState, useEffect} from "react";
import {createPortal} from "react-dom";
import styles from "./EditorModal.module.scss";

const EditorModal = ({isOpen, onClose, block, onSave}) => {
    const [formData, setFormData] = useState(block.content);

    useEffect(() => {
        setFormData(block.content);
    }, [block]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Реализуйте логику сохранения
        onSave(formData)
    };

    // Функция возвращает значение полей в прежнее состояние при отмене или закрытии модального окна
    const handleCancer = () => {
        setFormData(block.content)
        onClose()
    }

    if (!isOpen) return null;

    // Пример реализации модального окна для заголовка
    // TODO: Реализовать модальные окна для других типов блоков
    switch (block.type) {
        case 'title': {
            return createPortal(
                <div
                    className={styles.overlay}
                    onClick={(e) => e.target === e.currentTarget && handleCancer()}
                >
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={handleCancer}>
                            ✕
                        </button>
                        <h2>Редактировать заголовок</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Заголовок:</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({...formData, title: e.target.value})
                                    }
                                    }
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>URL изображения:</label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({...formData, image: e.target.value})
                                    }
                                />
                            </div>
                            <div className={styles.buttons}>
                                <button type="submit" className={styles.saveButton}>
                                    Сохранить
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancer}
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
        }
        case 'text': {
            return createPortal(
                <div
                    className={styles.overlay}
                    onClick={(e) => e.target === e.currentTarget && handleCancer()}
                >
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={handleCancer}>
                            ✕
                        </button>
                        <h2>Редактировать текст</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Текст:</label>
                                <textarea
                                    value={formData.text}
                                    onChange={(e) => {
                                        setFormData({...formData, text: e.target.value})
                                    }
                                    }
                                />
                            </div>
                            <div className={styles.buttons}>
                                <button type="submit" className={styles.saveButton}>
                                    Сохранить
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancer}
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
        }
        case 'test': {
            return createPortal(
                <div
                    className={styles.overlay}
                    onClick={(e) => e.target === e.currentTarget && handleCancer()}
                >
                    <div className={styles.modal}>
                        <button className={styles.closeButton} onClick={handleCancer}>
                            ✕
                        </button>
                        <h2>Редактировать тест</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Вопрос:</label>
                                <input
                                    type="text"
                                    value={formData.question}
                                    onChange={(e) => {
                                        setFormData({...formData, question: e.target.value})
                                    }
                                    }
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Варианты ответов:</label>
                                {
                                    formData.options.map((el, i) => {
                                        const copyData = JSON.parse(JSON.stringify(formData))
                                        return <div className={styles.optionGroup} key={i}>
                                            <input
                                                type={'text'}
                                                value={formData.options[i].text}
                                                onChange={(e) => {
                                                    copyData.options[i].text = e.target.value
                                                    setFormData(copyData)
                                                }}
                                            />
                                            <input
                                                type={'checkbox'}
                                                checked={formData.options[i].correctAnswer}
                                                onChange={(e) => {
                                                    copyData.options[i].correctAnswer = !copyData.options[i].correctAnswer
                                                    setFormData(copyData)
                                                }}
                                            />
                                            <label>Правильный ответ</label>
                                            <button
                                                className={styles.removeButton}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    const value = copyData.options.filter((el, index) => index !== i)
                                                    setFormData({...copyData, options: value})
                                                }}>Удалить
                                            </button>
                                        </div>
                                    })
                                }
                            </div>
                            <button
                                className={styles.addButton}
                                onClick={(e) => {
                                    e.preventDefault()
                                    const variant = {
                                        text: "Дополнительный вариант",
                                        correctAnswer: false
                                    }
                                    const copyData = JSON.parse(JSON.stringify(formData))
                                    copyData.options.push(variant)
                                    setFormData(copyData)
                                }}
                            >Добавить вариант
                            </button>
                            <div className={styles.buttons}>
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                    disabled={
                                        formData.options.length < 2 ||
                                        formData.options.filter(el => el.correctAnswer).length === 0
                                    }
                                >
                                    Сохранить
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancer}
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
        }
    }
};

export default EditorModal;
