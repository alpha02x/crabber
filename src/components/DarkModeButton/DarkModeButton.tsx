import React from "react";
import DarkModeButtonImg from "./dark-mode-button.png";
import "./DarkModeButton.css";

type DarkModeButtonProps = {
	darkTheme: boolean;
	enableDarkTheme: () => void;
	disableDarkTheme: () => void;
};

export class DarkModeButton extends React.Component<DarkModeButtonProps> {
	render(): React.ReactNode {
		return (
			<img
				className={"darkModeButton " + (this.props.darkTheme ? "inverted" : "")}
				alt='Темная тема'
				src={DarkModeButtonImg}
				onClick={() => {
					if (this.props.darkTheme) {
						this.props.disableDarkTheme();
					} else {
						this.props.enableDarkTheme();
					}
				}}
			></img>
		);
	}
}
