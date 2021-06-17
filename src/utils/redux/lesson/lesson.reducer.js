import ActionsType from "./../utils/actions.type";
const INITIAL_STATE = {
  lessons: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_LESSON:
      return {
        ...state,
        lessons: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
