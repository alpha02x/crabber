import React from "react";
import TableColumn from "../../models/TableColumn";
import AnomalyDefinitons from "../../definitions/AnomalyDefinitons";
import { BlueLootCalculator } from "./BlueLootCalculator/BlueLootCalculator";
import { CalculatorCharName } from "./CalculatorCharName/CalculatorCharName";

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
				.reduce(
					(income, currentColumn) =>
						income + this.getColumnPrice(currentColumn) / currentColumn.charsPassed.length,
					0
				) * personalCoefficient
		);
	}

	getColumnPrice(column: TableColumn): number {
		let definition = AnomalyDefinitons.get(column.anomalyType);
		let result: number = 0;

		if (column.additionalRatKilled) result += definition?.priceWithAdditionalShips ?? 0;
		else result += definition?.basePrice ?? 0;

		if (column.miniDrifterKilled) result += AnomalyDefinitons.get("Drifter-Recon")!.basePrice;
		if (column.drifterKilled) result += AnomalyDefinitons.get("Drifter")!.basePrice;
		return result;
	}

	getAllColumnsSum(): number {
		return this.props.tableColumns.reduce((acc, currentColumn) => acc + this.getColumnPrice(currentColumn), 0);
	}

	getAllCharsSum(): number {
		return this.props.chars.reduce((acc, curChar) => acc + this.calculateForChar(curChar, this.props.tableColumns), 0);
	}

	render(): React.ReactNode {
		let charsToIncomeMap: [string, number][] = this.props.chars.map((char) => [
			char,
			this.calculateForChar(char, this.props.tableColumns),
		]);

		return (
			<div className='flex flex-col flex-nowrap overflow-auto mb-7 mt-5 ml-2 mr-3 py-2 sm:ml-5 sm:mr-6 2xl:ml-72 2xl:mr-72 shadow-lg rounded-xl bg-[#f9fafb] dark:bg-zinc-600'>
				<div className='w-fit m-3 py-1 shadow-sm bg-zinc-100 dark:bg-zinc-500 rounded-xl'>
					<table>
						{charsToIncomeMap.map(([char, income]) => (
							<tr className={this.props.chars.indexOf(char) % 2 === 1 ? "dark:bg-[#52525b]/40 bg-zinc-200/50" : ""}>
								<td className='pt-1 pl-2 max-w-52'>
									<CalculatorCharName
										changeCoefficient={this.changeCoefficient.bind(this)}
										char={[char, this.state.charsCoefficients.get(char) ?? 1]}
									/>
								</td>
								<td className="pl-7 font-mono text-right dark:text-zinc-200">
									{income.toLocaleString("ru-RU", {
										minimumFractionDigits: 0,
										maximumFractionDigits: 0,
									})}
								</td>
								<td className="pl-2 pr-3 font-mono dark:text-zinc-200">
									ISK
								</td>
							</tr>
						))}
						<tr>
							<td className="pt-1 pr-1 pl-3 text-right dark:text-zinc-200">Итого:</td>
							<td className="pt-2 pl-7 text-right font-mono dark:text-zinc-200">
								{this.getAllColumnsSum().toLocaleString("ru-RU", {
									minimumFractionDigits: 0,
									maximumFractionDigits: 0,
								})}
							</td>
							<td className="pt-2 pl-2 pr-4 font-mono dark:text-zinc-200">
								ISK
							</td>
						</tr>
					</table>
				</div>
				<BlueLootCalculator
					totalFarmedMoney={this.getAllCharsSum()}
					charsToIncomeMap={new Map(charsToIncomeMap)}
				/>
			</div>
		);
	}
}
