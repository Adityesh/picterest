import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./globals.scss";
import { store } from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById("root"),
);
