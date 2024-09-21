import React from "react";
import { TableColumn } from "../../entities/TableColumn";

export type CalculatorProps = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class Calculator extends React.Component<CalculatorProps> {
	calculateForChar(char: string, columns: TableColumn[]): string {
		let income: number = 0;
		income = columns
			.filter((col) => col.charsPassed.some((x) => x === char))
			.reduce((income, currentColumn) => income + currentColumn.getPrice() / currentColumn.charsPassed.length, income);
		return income.toLocaleString("ru-RU", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	render(): React.ReactNode {
		return (
			<table className="calculator">
				{this.props.chars.map((char) => (
					<tr>
						<td>{char}</td>
						<td>{this.calculateForChar(char, this.props.tableColumns) + " ISK"}</td>
					</tr>
				))}
			</table>
		);
	}
}
