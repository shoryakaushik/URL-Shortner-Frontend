import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

let store: Store<UrlState, UrlAction> & {
  dispatch: DispatchType;
} = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
