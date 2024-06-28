// import Stack from "./Stack";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./rootSaga";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import allReducers from "./reducers";

// const sagaMiddleware = createSagaMiddleware();
// let store = createStore(allReducers, applyMiddleware(sagaMiddleware));

import { HashRouter as Router } from "react-router-dom";
import { NavigationProvider } from "./contexts/navigation";
import { AuthProvider, useAuth } from "./contexts/auth";
import Content from "./Content";
import UnauthenticatedContent from "./UnauthenticatedContent";
// import { ContextProvider } from './contexts/context-datagrid';
import { HelloDishAppProvider } from "./contexts/HelloDishAppProvider";

function App() {
  const { user, loading } = useAuth();
  // if (loading) {
  //   return <LoadPanel visible={true} />;
  // }

  if (user) {
    return <Content />;
  }
  return <UnauthenticatedContent />;
}

export default function Root() {
  return (
    <Router>
      <AuthProvider>
        <HelloDishAppProvider>
          <NavigationProvider>
            {/* <ContextProvider> */}
            <App />
            {/* </ContextProvider> */}
          </NavigationProvider>
        </HelloDishAppProvider>
      </AuthProvider>
    </Router>
  );
}
