import React from "react";
import TableColumn from "../../../models/TableColumn";
import { Translation } from "react-i18next";

export type AdditionalRatControlProps = {
	column: TableColumn;
	changeAddRat: (columnName: string) => void;
};

export class AdditionalRatControl extends React.Component<AdditionalRatControlProps> {
	render(): React.ReactNode {
		return (
			<Translation>{t =>
				<button
					title={t(this.renderTitle())}
					className={
						(this.props.column.additionalRatKilled ?
							"text-zinc-800 dark:text-eastern-blue-300" :
							"text-zinc-500 dark:text-zinc-300 hover:text-xs hover:scale-90")
						+ ' inline-block mx-auto h-4 w-4 font-bold text-sm text-center select-none cursor-pointer'}
					onClick={() => this.props.changeAddRat(this.props.column.name)}>
					{this.props.column.additionalRatKilled ? "A" : "a"}
				</button>
			}</Translation>
		)
	}

	private renderTitle(): string {
		return this.props.column.additionalRatKilled ?
			"add_killed" :
			"add_not_killed";
	}
}
