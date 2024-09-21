import React, { ChangeEvent } from "react";
import { BlueLootDefinitons } from "../../entities/Constants";

export type BlueLootCalculatorProps = {
	charsToIncomeMap: Map<string, number>;
	totalFarmedMoney: number;
};

export type BlueLootCalculatorState = {
	cargoContents: BlueLoot;
};

type BlueLoot = Map<string, number>;

export class BlueLootCalculator extends React.Component<BlueLootCalculatorProps, BlueLootCalculatorState> {
	state = {
		cargoContents: new Map(),
	};

	onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		let cargoContents: BlueLoot = this.getCargoContents(event.currentTarget.value);
		this.setState({ cargoContents: cargoContents });
	};

	calculateBlueLootDistribution(bankState: BlueLoot): Map<string, BlueLoot> {
		let bank: BlueLoot = new Map(bankState);
		let result: Map<string, BlueLoot> = new Map(Array.from(this.props.charsToIncomeMap.keys()).map((char) => [char, new Map()]));
		Array.from(this.props.charsToIncomeMap).forEach(([char, income]) => {
			let incomeToFulfill = income;
			Array.from(BlueLootDefinitons.keys()).forEach((blueLootName) => {
				let nexusesInBank: number = bank.get(blueLootName) ?? 0;
				let nexusPrice: number = BlueLootDefinitons.get(blueLootName) ?? 0;
				let givenNexuses = Math.floor(incomeToFulfill / nexusPrice);
				let actuallyGivenNexuses = nexusesInBank >= givenNexuses ? givenNexuses : nexusesInBank;
				let charLoot = result.get(char) ?? new Map();
				charLoot.set(blueLootName, (charLoot.get(blueLootName) ?? 0) + actuallyGivenNexuses);
				bank.set(blueLootName, (bank.get(blueLootName) ?? 0) - actuallyGivenNexuses);
				incomeToFulfill -= actuallyGivenNexuses * nexusPrice;
			});
		});
		return result;
	}

	getCargoContents(input: string): BlueLoot {
		let cargoContents: BlueLoot = new Map();

		let blueLootNames = Array.from(BlueLootDefinitons.keys());
		input
			.split(/\r?\n/)
			.map((str) => str.trim())
			.map((str) => str.replace("*", ""))
			.filter((str) => str !== "")
			.filter((str) => blueLootNames.some((blueName) => str.startsWith(blueName)))
			.forEach((cargoItem) => {
				let cargoItemWords = cargoItem.split(" ");
				let key = cargoItemWords.filter((x) => Number.isNaN(Number(x))).join(" ");
				let count: number = Number(cargoItemWords.at(-1)) ?? 0;

				cargoContents.set(key, (cargoContents.get(key) ?? 0) + count);
			});

		return cargoContents;
	}

	getCargoPrice(cargoContents: Map<string, number>): number {
		return Array.from(cargoContents).reduce((acc, [blueLootName, blueLootCount]) => acc + blueLootCount * BlueLootDefinitons.get(blueLootName)!, 0);
	}

	render(): React.ReactNode {
		return (
			<div>
				<textarea className="cargoInput" placeholder="Вставь карго сюда" onChange={this.onChange.bind(this)} />
				{this.getCargoPrice(this.state.cargoContents) < this.props.totalFarmedMoney && (
					<span className="notEnoughCargoWarning">
						<p>В карго недостаточно синьки для распределения</p>
					</span>
				)}
				<table className="blueLootTable">
					<tr className="blueLootTableHeaderRow">
						<th>Окно</th>
						{Array.from(BlueLootDefinitons.keys()).map((blueLootName) => (
							<th className="blueLootTableColumnHeading">{blueLootName}</th>
						))}
						<th>Цена синьки</th>
					</tr>
					{Array.from(this.calculateBlueLootDistribution(this.state.cargoContents).entries()).map(([char, blueLoot]) => (
						<tr className="tableCharRow">
							<td className="calculatorFirstColumn">{char}</td>
							{Array.from(blueLoot).map(([_, blueLootCount]) => (
								<td>{blueLootCount}</td>
							))}
							<td>
								{Array.from(blueLoot)
									.reduce((acc, [blueLootName, blueLootCount]) => acc + blueLootCount * BlueLootDefinitons.get(blueLootName)!, 0)
									.toLocaleString("ru-RU", {
										minimumFractionDigits: 0,
										maximumFractionDigits: 2,
									}) + " ISK"}
							</td>
						</tr>
					))}
				</table>
			</div>
		);
	}
}
