import ActionsType from "./../utils/actions.type"
const INITIAL_STATE = {
  currentUser: null,
  balance: 0,
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
    case ActionsType.SET_BALANCE:
      return {
        ...state,
        balance: action.payload,
      }
    default:
      return state
  }
}

export default userReducer
