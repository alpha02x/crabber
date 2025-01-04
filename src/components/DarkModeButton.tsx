import React from "react";
import ButtonImg from "../assets/dark-mode-button.png";
import { AppStateManagementContext } from "../AppStateManagementContext";
import { Translation } from "react-i18next";

type DarkModeButtonProps = {
	darkTheme: boolean;
};

export class DarkModeButton extends React.Component<DarkModeButtonProps> {
	static readonly contextType = AppStateManagementContext;
	declare context: React.ContextType<typeof AppStateManagementContext>

	render(): React.ReactNode {
		return (
			<Translation>{t =>
				<img
					className={"h-5 w-5 fixed bottom-1 right-1 cursor-pointer dark:invert"}
					alt={t("dark_theme")}
					src={ButtonImg}
					onClick={() => {
						if (this.props.darkTheme) {
							this.context.disableDarkTheme();
						} else {
							this.context.enableDarkTheme();
						}
					}}
				></img>
			}</Translation>
		);
	}
}
