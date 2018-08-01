import { combineReducers } from "redux";
import { InfiniteScroll } from "../components";

const rootReducer = combineReducers({
  [InfiniteScroll.NAME]: InfiniteScroll.reducer
});

export default rootReducer;
