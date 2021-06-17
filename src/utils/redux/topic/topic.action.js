import ActionsType from "./../utils/actions.type";
export const setCurrentTopic = (topic) => ({
  type: ActionsType.SET_CURRENT_TOPIC,
  payload: topic,
});
