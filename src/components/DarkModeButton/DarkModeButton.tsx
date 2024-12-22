import React from "react";
import ButtonImg from "./dark-mode-button.png";
import ButtonImgInv from "./dark-mode-button-inverted.png";

type DarkModeButtonProps = {
	darkTheme: boolean;
	enableDarkTheme: () => void;
	disableDarkTheme: () => void;
};

export class DarkModeButton extends React.Component<DarkModeButtonProps> {
	render(): React.ReactNode {
		return (
			<img
				className={"h-5 w-5 fixed bottom-1 right-1 cursor-pointer"}
				alt='Темная тема'
				src={this.props.darkTheme ? ButtonImgInv : ButtonImg}
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
