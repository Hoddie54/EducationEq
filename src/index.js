import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import SpinnerPage from "./pages/spinner/spinner.component";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
