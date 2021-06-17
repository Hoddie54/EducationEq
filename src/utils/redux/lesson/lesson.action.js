import ActionsType from "./../utils/actions.type";
export const setLesson = (lessons) => ({
  type: ActionsType.SET_LESSON,
  payload: lessons,
});
