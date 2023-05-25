import React, { KeyboardEvent } from "react";

type CharAdditionControlProps = {
	addChar: (char: string) => void;
};

export class CharAdditionControl extends React.Component<CharAdditionControlProps> {
	onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			if (event.currentTarget.value === "") return;
			this.addNewChar(event.currentTarget.value);
			event.currentTarget.value = "";
		}
	}

	addNewChar(char: string) {
		this.props.addChar(char);
	}

	render(): React.ReactNode {
		return <input className="charAdditionControl" placeholder="Введите имя персонажа" onKeyDown={this.onKeyDown.bind(this)} type="text"></input>;
	}
}
