import { useDispatch } from "react-redux";
import { addBlock } from "../../store/slices/blocksSlice";
import styles from "./BlockSelector.module.scss";

const BlockSelector = () => {
  const dispatch = useDispatch();

  // TODO: Реализуйте логику добавления блока
  const handleAddBlock = (type) => {
    type && dispatch(addBlock(type))
  };

  // TODO: Реализуйте логику получения начального содержимого
  const getInitialContent = (type) => {
  };

  return (
    <div className={styles.blockSelector}>
      <h2>Добавить блок</h2>
      <div className={styles.buttons}>
        <button onClick={() => handleAddBlock("title")}>
          Заголовок с картинкой
        </button>
        <button onClick={() => handleAddBlock("text")}>Текст</button>
        <button onClick={() => handleAddBlock("test")}>Тест</button>
      </div>
    </div>
  );
};

export default BlockSelector;
