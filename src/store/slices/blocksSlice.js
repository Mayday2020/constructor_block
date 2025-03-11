import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid"

const localState = localStorage.getItem('state')
const initialState = localState ? JSON.parse(localState) : {
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
}


const blocksSlice = createSlice({
    name: "blocks",
    initialState,
    reducers: {
        addBlock: (state, action) => {
            // TODO: Реализовать добавление блока
            switch (action.payload) {
                case 'text': {
                    const newBlock = {
                        id: uuidv4(),
                        type: action.payload,
                        content: {
                            text: 'Новый текстовый блок'
                        }
                    }
                    state.blocks.push(newBlock)
                    localStorage.setItem('state', JSON.stringify(state))
                    break
                }
                case 'title': {
                    const newBlock = {
                        id: uuidv4(),
                        type: "title",
                        content: {
                            title: "Добро пожаловать в конструктор блоков!",
                            image:
                                "https://cdn.tbank.ru/static/pages/files/67fdf053-90ea-4ffc-8da0-f58726560f50.png",
                        },
                    }
                    localStorage.setItem('state', JSON.stringify(state))
                    state.blocks.push(newBlock)
                    break
                }
                case 'test': {
                    const newBlock = {
                        id: uuidv4(),
                        type: "test",
                        content: {
                            question: "Новый вопрос",
                            options: [
                                {text: 'Вариант 1'},
                                {text: 'Вариант 2'},
                                {text: 'Вариант 3'}
                            ]
                        },
                    }
                    state.blocks.push(newBlock)
                    localStorage.setItem('state', JSON.stringify(state))
                    break
                }
                default: {
                    break
                }
            }
        },
        updateBlock: (state, action) => {
            // TODO: Реализовать обновление блока
            const updateBlockItem = state.blocks.find(el => el.id === action.payload.id)
            updateBlockItem.content = action.payload.content
            localStorage.setItem('state', JSON.stringify(state))
        },
        removeBlock: (state, action) => {
            // TODO: Реализовать удаление блока
            const newState = state.blocks.filter(el => el.id !== action.payload.id)
            localStorage.setItem('state', JSON.stringify({blocks: [...newState]}))
            return {blocks: [...newState]}
        },
        clearBlocks: (state) => {
            // TODO: Реализовать очистку всех блоков
            localStorage.clear()
            return {blocks: []}
        },
        moveBlock: (state, action) => {
            // TODO: Реализовать перемещение блока (drag-n-drop)
        },
        moveBlockUp: (state, action) => {
            // TODO: Реализовать перемещение блока вверх
            let index = 0
            state.blocks.forEach((el, i) => {
                if (el.id === action.payload.id) {
                    index = i
                }
            })
            let copyBlock = state.blocks[index - 1]
            state.blocks[index - 1] = state.blocks[index]
            state.blocks[index] = copyBlock
            localStorage.setItem('state', JSON.stringify(state))
        },
        moveBlockDown: (state, action) => {
            // TODO: Реализовать перемещение блока вниз
            let index = 0
            state.blocks.forEach((el, i) => {
                if (el.id === action.payload.id) {
                    index = i
                }
            })
            let copyBlock = state.blocks[index + 1]
            state.blocks[index + 1] = state.blocks[index]
            state.blocks[index] = copyBlock
            localStorage.setItem('state', JSON.stringify(state))
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
