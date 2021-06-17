import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import lessonReducer from "./lesson/lesson.reducer";
import topicReducer from "./topic/topic.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  lessons: lessonReducer,
  topic: topicReducer,
});

export default persistReducer(persistConfig, rootReducer);
