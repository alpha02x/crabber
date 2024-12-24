import React from "react";

export type CharNameProps = {
	charName: string;
	removeCharFromTable: (charName: string) => void;
};

export class CharName extends React.Component<CharNameProps> {
	render(): React.ReactNode {
		return (
			<div className='flex flex-row flex-nowrap w-full text-nowrap max-w-56'>
				<div
					className="flex-1 w-full dark:text-zinc-200 overflow-hidden text-nowrap overflow-ellipsis m-auto"
					title={this.props.charName}>
					{this.props.charName}
				</div>
				<div className="w-3 mx-3 mr-4">
					<button
						className="w-full text-red-700 dark:text-[#e96164]"
						onClick={() => this.props.removeCharFromTable(this.props.charName)}
					>
						×
					</button>
				</div>
			</div>
		);
	}
}
