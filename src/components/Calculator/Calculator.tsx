import React from "react";
import { TableColumn } from "../../models/TableColumn";
import AnomalyDefinitons from "../../definitions/AnomalyDefinitons";
import { BlueLootCalculator } from "./BlueLootCalculator";
import "./Calculator.css";
import { CalculatorCharName } from "./CalculatorCharName";

export type CalculatorProps = {
	tableColumns: TableColumn[];
	chars: string[];
};

export type CalculatorState = {
	charsCoefficients: Map<string, number>;
};

export class Calculator extends React.Component<CalculatorProps, CalculatorState> {
	state = { charsCoefficients: new Map() };

	changeCoefficient(char: string, coefficient: number) {
		let newState = this.state;
		newState.charsCoefficients.set(char, coefficient);
		this.setState(newState);
	}

	calculateForChar(char: string, columns: TableColumn[]): number {
		let personalCoefficient = this.state.charsCoefficients.get(char) ?? 1;

		return (
			columns
				.filter((col) => col.charsPassed.some((x) => x === char))
				.reduce((income, currentColumn) => income + this.getColumnPrice(currentColumn) / currentColumn.charsPassed.length, 0) * personalCoefficient
		);
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
						<tr className="calculatorTableRow">
							<td className="calculatorFirstColumn">
								<CalculatorCharName changeCoefficient={this.changeCoefficient.bind(this)} char={[char, this.state.charsCoefficients.get(char) ?? 1]} />
							</td>
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
