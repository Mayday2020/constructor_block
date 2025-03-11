import {useState} from "react";
import {useDispatch} from "react-redux";
import {
    updateBlock,
    removeBlock,
    moveBlockUp,
    moveBlockDown
} from "../../store/slices/blocksSlice";
import EditorModal from "../EditorModal/EditorModal";
import styles from "./Block.module.scss";

const Block = ({block, isFirst, isLast}) => {
    const selectedVariant = localStorage.getItem(`selectedAnswers_${block.id}`)
    const viewAnswer = localStorage.getItem(`showAnswer_${block.id}`)

    const [isEditing, setIsEditing] = useState(false);
    const [showAnswer, setShowAnswer] = useState(viewAnswer ? JSON.parse(viewAnswer) : false);
    const [selectedAnswers, setSelectedAnswers] = useState(selectedVariant ? JSON.parse(selectedVariant) : []);
    const dispatch = useDispatch();

    // TODO: Реализовать функцию редактирования блока
    const handleEdit = () => {
        setShowAnswer(false)
        setIsEditing(true);
    };

    // TODO: Реализовать функцию сохранения изменений блока
    const handleSave = (newData) => {
        const data = {content: {...newData}, id: block.id}
        dispatch(updateBlock(data))
        setIsEditing(!isEditing)
    };

    // TODO: Реализовать функцию удаления блока
    const handleDelete = () => {
        if (window.confirm("Вы уверены, что хотите удалить этот блок?")) {
            dispatch(removeBlock(block))
            localStorage.removeItem(`selectedAnswers_${block.id}`)
            localStorage.removeItem(`showAnswer_${block.id}`)
        }
    };

    // TODO: Реализовать функцию перемещения блока вверх
    const handleMoveUp = () => {
        dispatch(moveBlockUp(block))
    };

    // TODO: Реализовать функцию перемещения блока вниз
    const handleMoveDown = () => {
        dispatch(moveBlockDown(block))
    };

    // TODO: Реализовать функцию обработки изменения ответа
    const handleAnswerChange = (index, checked) => {
        if (!isMultipleChoice()) {
            setSelectedAnswers([index])
        } else {
            if (!selectedAnswers.includes(index)) {
                setSelectedAnswers([...selectedAnswers, index])
            } else {
                setSelectedAnswers(selectedAnswers.filter(el => el !== index))
            }
        }
    };

    // TODO: Реализовать функцию проверки ответа
    const handleCheckAnswer = () => {
        setShowAnswer(true)
        localStorage.setItem(`selectedAnswers_${block.id}`, JSON.stringify(selectedAnswers))
        localStorage.setItem(`showAnswer_${block.id}`, JSON.stringify(true))
    };

    // TODO: Реализовать определение типа теста (множественный выбор)
    const isMultipleChoice = () => {
        if (block.type === 'test') {
            return block.content.options.filter(el => el.correctAnswer).length > 1
        }
        return false
    }

    // TODO: Реализовать проверку правильности ответа
    const isAnswerCorrect = (index) => {
        return showAnswer && block.content.options[index].correctAnswer
    };

    // TODO: Реализовать проверку неправильности ответа
    const isAnswerIncorrect = (index) => {
        return showAnswer && !block.content.options[index].correctAnswer && selectedAnswers.includes(index);
    };

    const renderContent = () => {
        switch (block.type) {
            case "title":
                return (
                    <div className={styles.titleBlock}>
                        <h2>{block.content.title}</h2>
                        <img src={block.content.image} alt={block.content.title}/>
                    </div>
                );
            case "text":
                return (
                    <div className={styles.textBlock}>
                        <p>{block.content.text}</p>
                    </div>
                );
            case "test":
                return (
                    <div className={styles.testBlock}>
                        <h3>{block.content.question}</h3>
                        <div className={styles.options}>
                            {block.content.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`${styles.option} ${
                                        isAnswerCorrect(index) ? styles.correct : ""
                                    } ${isAnswerIncorrect(index) ? styles.incorrect : ""}`}
                                >
                                    <label>
                                        <input
                                            type={isMultipleChoice() ? "checkbox" : "radio"}
                                            name={`test-${block.id}`}
                                            checked={selectedAnswers.includes(index)}
                                            onChange={(e) =>
                                                handleAnswerChange(index, e.target.checked)
                                            }
                                            disabled={showAnswer}
                                        />
                                        {option.text}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {!showAnswer && selectedAnswers.length > 0 && (
                            <button
                                onClick={handleCheckAnswer}
                                className={styles.checkButton}
                            >
                                Проверить
                            </button>
                        )}
                        {showAnswer && (
                            <div className={styles.result}>
                                {/* TODO: Реализовать отображение результата */}
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.block}>
            <div className={styles.controls}>
                <button className={styles.editButton} onClick={handleEdit}>
                    ✎
                </button>
                <button className={styles.deleteButton} onClick={handleDelete}>
                    ✕
                </button>
                {!isFirst && (
                    <button className={styles.moveButton} onClick={handleMoveUp}>
                        ↑
                    </button>
                )}
                {!isLast && (
                    <button className={styles.moveButton} onClick={handleMoveDown}>
                        ↓
                    </button>
                )}
            </div>
            {renderContent()}
            <EditorModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                block={block}
                onSave={handleSave}
            />
        </div>
    );
};

export default Block;
