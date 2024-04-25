/**
 * Entry point of the application.
 * Renders the main App component within the Redux store and React Alert Provider.
 * @module index
 */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { GlobalProvider } from "./context/globalcontext";

const options = {
	timeout: 5000,
	position: positions.BOTTOM_CENTER,
	transition: transitions.SCALE,
};

/**
 * Render the main App component within the Redux store and React Alert Provider.
 * @function render
 */
// console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
ReactDOM.render(
	<Provider store={store}>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<GlobalProvider>
				<AlertProvider
					template={AlertTemplate}
					{...options}>
					<App />
				</AlertProvider>
			</GlobalProvider>
		</GoogleOAuthProvider>
	</Provider>,
	document.getElementById("root")
);
