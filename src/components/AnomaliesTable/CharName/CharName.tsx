import React from "react";
import "./CharName.css";

export type CharNameProps = {
	charName: string;
	removeCharFromTable: (charName: string) => void;
};

export class CharName extends React.Component<CharNameProps> {
	render(): React.ReactNode {
		return (
			<div className='charName'>
				<button
					className='deleteCharButton'
					onClick={() => this.props.removeCharFromTable(this.props.charName)}
				>
					×
				</button>
				<span className="dark:text-zinc-200">{this.props.charName}</span>
			</div>
		);
	}
}
