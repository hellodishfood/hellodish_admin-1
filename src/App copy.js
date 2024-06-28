import Stack from "./Stack";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";

const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

function App() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}

sagaMiddleware.run(rootSaga);
export default App;
