import React from "react";
import ButtonImg from "../assets/dark-mode-button.png";

type DarkModeButtonProps = {
	darkTheme: boolean;
	enableDarkTheme: () => void;
	disableDarkTheme: () => void;
};

export class DarkModeButton extends React.Component<DarkModeButtonProps> {
	render(): React.ReactNode {
		return (
			<img
				className={"h-5 w-5 fixed bottom-1 right-1 cursor-pointer dark:invert"}
				alt='Темная тема'
				src={ButtonImg}
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
