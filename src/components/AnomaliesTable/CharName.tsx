import React from "react";

export type CharNameProps = {
	charName: string;
	removeChar: (charName: string) => void;
};

export class CharName extends React.Component<CharNameProps> {
	render(): React.ReactNode {
		return (
			<div className="charName">
				<button className="deleteCharButton" onClick={() => this.props.removeChar(this.props.charName)}>
					X
				</button>
				{this.props.charName}
			</div>
		);
	}
}
