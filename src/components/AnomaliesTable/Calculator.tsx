import React from "react";
import { TableColumn } from "../../entities/TableColumn";
import { AnomalyDefinitons } from "../../entities/Constants";
import { BlueLootCalculator } from "./BlueLootCalculator";

export type CalculatorProps = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class Calculator extends React.Component<CalculatorProps> {
	calculateForChar(char: string, columns: TableColumn[]): number {
		return columns
			.filter((col) => col.charsPassed.some((x) => x === char))
			.reduce((income, currentColumn) => income + this.getColumnPrice(currentColumn) / currentColumn.charsPassed.length, 0);
	}

	getColumnPrice(column: TableColumn): number {
		let definition = AnomalyDefinitons.get(column.anomalyType);
		let result: number = 0;

		if (column.additionalRatKilled) result += definition?.priceWithAdditionalShips ?? 0;
		else result += definition?.basePrice ?? 0;

		if (column.drifterKilled) result += 300000000;
		return result;
	}

	getAllColumnsSum(): number {
		return this.props.tableColumns.reduce((acc, currentColumn) => acc + this.getColumnPrice(currentColumn), 0);
	}

	render(): React.ReactNode {
		let charsToIncomeMap: [string, number][] = this.props.chars.map((char) => [char, this.calculateForChar(char, this.props.tableColumns)]);

		return (
			<div className="calculatorContainer">
				<table className="calculator">
					{charsToIncomeMap.map(([char, income]) => (
						<tr>
							<td className="calculatorFirstColumn">{char}</td>
							<td>
								{income.toLocaleString("ru-RU", {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2,
								}) + " ISK"}
							</td>
						</tr>
					))}
					<tr>
						<td>&nbsp;&nbsp;&nbsp;Σ</td>
						<td>
							{this.getAllColumnsSum().toLocaleString("ru-RU", {
								minimumFractionDigits: 0,
								maximumFractionDigits: 2,
							}) + " ISK"}
						</td>
					</tr>
				</table>
				<BlueLootCalculator totalFarmedMoney={this.getAllColumnsSum()} charsToIncomeMap={new Map(charsToIncomeMap)} />
			</div>
		);
	}
}
