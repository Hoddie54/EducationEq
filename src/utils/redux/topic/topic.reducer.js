import ActionsType from "./../utils/actions.type";
const INITIAL_STATE = {
  currentTopic: null,
};

const topicReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionsType.SET_CURRENT_TOPIC:
      return {
        ...state,
        currentTopic: action.payload,
      };
    default:
      return state;
  }
};

export default topicReducer;
