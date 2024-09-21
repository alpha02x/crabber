import React, { ChangeEvent, KeyboardEvent } from "react";
import Arrow from "./arrow.svg";
import "./CharAdditionControl.css";

type CharAdditionControlProps = {
	addChar: (char: string) => void;
};

type CharAdditionControlState = {
	charName: string;
};

export class CharAdditionControl extends React.Component<CharAdditionControlProps, CharAdditionControlState> {
	state = { charName: "" };
	onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			this.addNewChar(this.state.charName);
		}
	}

	addNewChar(char: string) {
		if (char === "") return;
		this.props.addChar(char);
		(document.getElementById("charAdditionControl") as HTMLTextAreaElement).value = "";
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ charName: event.currentTarget.value });
	}

	render(): React.ReactNode {
		return (
			<div className="charAdditionControl">
				{" "}
				<input
					id="charAdditionControl"
					className="charAdditionControl"
					placeholder="Введи имя персонажа"
					onChange={this.onChange.bind(this)}
					onKeyDown={this.onKeyDown.bind(this)}
					type="text"
				></input>
				<img src={Arrow} alt="Ввод" onClick={() => this.addNewChar(this.state.charName)} className="addCharButton" />
			</div>
		);
	}
}
