import React, { ChangeEvent, KeyboardEvent } from "react";

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
		(document.getElementById("char-addition-input") as HTMLTextAreaElement).value = "";
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		this.setState({ charName: event.currentTarget.value });
	}

	render(): React.ReactNode {
		return (
			<div className='ml-2 mt-1 mb-1 p-1 min-w-150 border-0 rounded-lg whitespace-nowrap shadow-sm bg-zinc-100 dark:bg-zinc-500'>
				<input
					id='char-addition-input'
					className='bg-transparent pl-0.5'
					placeholder='Введи имя персонажа'
					onChange={this.onChange.bind(this)}
					onKeyDown={this.onKeyDown.bind(this)}
					type='text'
				></input>
				<svg
					className="h-5 w-5 inline pb-0.5 text-nowrap cursor-pointer text-eastern-blue-500"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					onClick={() => this.addNewChar(this.state.charName)}>
					<polygon points="5 3 19 12 5 21 5 3" />
				</svg>
			</div>
		);
	}
}
