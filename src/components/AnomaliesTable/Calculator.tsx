import React from "react";
import { TableColumn } from "../../entities/TableColumn";
import { AnomalyDefinitons } from "../../entities/Constants";

export type CalculatorProps = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class Calculator extends React.Component<CalculatorProps> {
	calculateForChar(char: string, columns: TableColumn[]): string {
		let income: number = 0;
		income = columns
			.filter((col) => col.charsPassed.some((x) => x === char))
			.reduce((income, currentColumn) => income + this.getPrice(currentColumn) / currentColumn.charsPassed.length, income);
		return income.toLocaleString("ru-RU", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	getPrice(column: TableColumn): number {
		let definition = AnomalyDefinitons.get(column.anomalyType);
		let result: number = 0;

		if (column.additionalRatKilled) result += definition?.priceWithAdditionalShips ?? 0;
		else result += definition?.basePrice ?? 0;

		if (column.drifterKilled) result += 300000000;
		return result;
	}

	render(): React.ReactNode {
		return (
			<table className="calculator">
				{this.props.chars.map((char) => (
					<tr>
						<td className="calculatorFirstColumn">{char}</td>
						<td>{this.calculateForChar(char, this.props.tableColumns) + " ISK"}</td>
					</tr>
				))}
			</table>
		);
	}
}
