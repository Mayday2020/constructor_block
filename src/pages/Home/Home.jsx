import { useSelector, useDispatch } from "react-redux";
import { clearBlocks } from "../../store/slices/blocksSlice";
import BlockSelector from "../../components/BlockSelector/BlockSelector";
import Block from "../../components/Block/Block";
import styles from "./Home.module.scss";


const Home = () => {
  const blocks = useSelector((state) => state.blocks.blocks);
  const dispatch = useDispatch();

  const handleClear = () => {
    if (window.confirm("Вы уверены, что хотите очистить все блоки?")) {
      dispatch(clearBlocks());
    }
  };

  return (
    <div className={styles.home}>
      <BlockSelector />
      <main className={styles.content}>
        <div className={styles.header}>
          {blocks.length > 0 && (
            <button className={styles.clearButton} onClick={handleClear}>
              Очистить страницу
            </button>
          )}
        </div>
        <div className={styles.blocksContainer}>
          {blocks.map((block, index) => (
            <div key={block.id} className={styles.blockWrapper}>
              <Block
                block={block}
                isFirst={index === 0}
                isLast={index === blocks.length - 1}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
