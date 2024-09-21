import React from "react";
import { TableColumn } from "../../entities/TableColumn";
import { AnomalyDefinitons } from "../../entities/Constants";

export type CalculatorProps = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class Calculator extends React.Component<CalculatorProps> {
	calculateForChar(char: string, columns: TableColumn[]): string {
		let income: number = columns
			.filter((col) => col.charsPassed.some((x) => x === char))
			.reduce((income, currentColumn) => income + this.getColumnPrice(currentColumn) / currentColumn.charsPassed.length, 0);
		return income.toLocaleString("ru-RU", {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		});
	}

	getColumnPrice(column: TableColumn): number {
		let definition = AnomalyDefinitons.get(column.anomalyType);
		let result: number = 0;

		if (column.additionalRatKilled) result += definition?.priceWithAdditionalShips ?? 0;
		else result += definition?.basePrice ?? 0;

		if (column.drifterKilled) result += 300000000;
		return result;
	}

	render(): React.ReactNode {
		return (
			<div className="calculatorContainer">
				<table className="calculator">
					{this.props.chars.map((char) => (
						<tr>
							<td className="calculatorFirstColumn">{char}</td>
							<td>{this.calculateForChar(char, this.props.tableColumns) + " ISK"}</td>
						</tr>
					))}
					<tr>
						<td>&nbsp;&nbsp;&nbsp;Σ</td>
						<td>
							{this.props.tableColumns
								.reduce((acc, curCol) => acc + this.getColumnPrice(curCol), 0)
								.toLocaleString("ru-RU", {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2,
								}) + " ISK"}
						</td>
					</tr>
				</table>
			</div>
		);
	}
}
