import React from "react";
import "./App.css";
import AnomaliesTable from "./components/AnomaliesTable/AnomaliesTable";
import { DarkModeButton } from "./components/DarkModeButton/DarkModeButton";

type AppState = {
	darkTheme: boolean;
};

export class App extends React.Component {
	state: AppState = JSON.parse(
		localStorage.getItem("dark-theme") ??
			JSON.stringify({
				darkTheme: false,
			})
	);

	enableDarkTheme() {
		let newState = { darkTheme: true };
		this.setState(newState);
		localStorage.setItem("dark-theme", JSON.stringify(newState));
	}

	disableDarkTheme() {
		let newState = { darkTheme: false };
		this.setState(newState);
		localStorage.setItem("dark-theme", JSON.stringify(newState));
	}

	render(): React.ReactNode {
		return [
			<AnomaliesTable darkTheme={this.state.darkTheme} />,
			<DarkModeButton
				darkTheme={this.state.darkTheme}
				disableDarkTheme={this.disableDarkTheme.bind(this)}
				enableDarkTheme={this.enableDarkTheme.bind(this)}
			/>,
		];
	}
}

export default App;
