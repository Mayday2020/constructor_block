import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blocks: [
    {
      id: "default-block",
      type: "title",
      content: {
        title: "Добро пожаловать в конструктор блоков!",
        image:
          "https://cdn.tbank.ru/static/pages/files/67fdf053-90ea-4ffc-8da0-f58726560f50.png",
      },
    },
  ],
};

const blocksSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {
    addBlock: (state, action) => {
      // TODO: Реализовать добавление блока
    },
    updateBlock: (state, action) => {
      // TODO: Реализовать обновление блока
    },
    removeBlock: (state, action) => {
      // TODO: Реализовать удаление блока
    },
    clearBlocks: (state) => {
      // TODO: Реализовать очистку всех блоков
    },
    moveBlock: (state, action) => {
      // TODO: Реализовать перемещение блока (drag-n-drop)
    },
    moveBlockUp: (state, action) => {
      // TODO: Реализовать перемещение блока вверх
    },
    moveBlockDown: (state, action) => {
      // TODO: Реализовать перемещение блока вниз
    },
  },
});

export const {
  addBlock,
  updateBlock,
  removeBlock,
  clearBlocks,
  moveBlock,
  moveBlockUp,
  moveBlockDown,
} = blocksSlice.actions;

export default blocksSlice.reducer;
