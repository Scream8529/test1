import { createStore } from 'redux'

const ADD_NEW_COLOR = 'ADD_NEW_COLOR'
const CHANGE_COLOR = 'CHANGE_COLOR'
const DELETE_COLOR = 'DELETE_COLOR'
const TOGGLE_IS_CHANGE = 'TOGGLE_IS_CHANGE'

const initialState = {
    palette: [
    ]
}

const paletteReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_COLOR:
            const newColor = {
                id: Date.now(),
                color: '#FFFB00',
                isChange: true
            }
            return { ...state, palette: [...state.palette, newColor] }
        case CHANGE_COLOR:
            return {
                ...state, palette: state.palette.map(p => {
                    if (action.id === p.id) {
                        return { ...p, color: action.color }
                    }
                    return p
                })
            }
        case TOGGLE_IS_CHANGE:
            return {
                ...state, palette: state.palette.map(p => {
                    if (action.id === p.id) {
                        return { ...p, isChange: action.isChange }
                    }
                    return p
                })
            }
        case DELETE_COLOR:
            let newPalette = state.palette.filter(e => e.id !== action.id)
            return {...state, palette:newPalette}
        default:
            return state
    }
}

export const addNewColorAC = () => ({ type: ADD_NEW_COLOR })
export const toggleIsChangeAC = (id, isChange) => ({ type: TOGGLE_IS_CHANGE, id, isChange })
export const changeColorAC = (id, color) => ({ type: CHANGE_COLOR, id, color })
export const deleteColorAC = (id) => ({ type: DELETE_COLOR, id })

let store = createStore(paletteReducer)
export default store


