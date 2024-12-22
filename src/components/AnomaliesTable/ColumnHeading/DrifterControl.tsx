import React from "react";
import TableColumn from "../../../models/TableColumn";

export type DrifterControlProps = {
	column: TableColumn;
	changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
};

enum DrifterState {
	None,
	MiniDrifter,
	BigDrifter
}

export class DrifterControl extends React.Component<DrifterControlProps> {
	render(): React.ReactNode {
		return (
			<div
				title={this.renderTitle()}
				className={(this.props.column.drifterKilled || this.props.column.miniDrifterKilled ? "text-zinc-800 dark:text-eastern-blue-300" : "text-zinc-500 dark:text-zinc-300 hover:text-xs hover:scale-90") +
					' inline-block h-4 w-4 font-bold text-sm text-center mx-auto select-none cursor-pointer'} onClick={() => this.cycleDrifter()}>
				{this.renderDrifter()}
			</div>
		)
	}

	renderTitle(): string | undefined {
		switch (this.getCurrentDrifterState()) {
			case DrifterState.None:
				return "Дрифтер: не убит";
			case DrifterState.MiniDrifter:
				return "Дрифтер: убит минидрифтер";
			case DrifterState.BigDrifter:
				return "Дрифтер: убит большой дрифтер";
			default:
				break;
		}
	}

	getCurrentDrifterState(): DrifterState {
		if (this.props.column.drifterKilled) {
			return DrifterState.BigDrifter;
		}

		if (this.props.column.miniDrifterKilled) {
			return DrifterState.MiniDrifter;
		}

		return DrifterState.None;
	}


	renderDrifter(): React.ReactNode {
		switch (this.getCurrentDrifterState()) {
			case DrifterState.None:
				return '\u25CB';
			case DrifterState.MiniDrifter:
				return "M";
			case DrifterState.BigDrifter:
				return "D";
			default:
				break;
		}
	}

	cycleDrifter(): void {
		let newDrifterState = (this.getCurrentDrifterState() + 1) % 3;

		switch (newDrifterState) {
			case DrifterState.None:
				this.props.changeDrifter(this.props.column.name, false, false);
				break;
			case DrifterState.MiniDrifter:
				this.props.changeDrifter(this.props.column.name, true, false);
				break;
			case DrifterState.BigDrifter:
				this.props.changeDrifter(this.props.column.name, false, true);
				break;
			default:
				break;
		}
	}
}
