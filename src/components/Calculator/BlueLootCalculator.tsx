import React, { ChangeEvent } from "react";
import { BlueLootDefinitons } from "../../entities/Constants";

export type BlueLoot = Map<string, number>;

export type BlueLootCalculatorProps = {
	charsToIncomeMap: Map<string, number>;
	totalFarmedMoney: number;
};

export type BlueLootCalculatorState = {
	cargoContents: BlueLoot;
};

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
				let blueInBank: number = bank.get(blueLootName) ?? 0;
				let bluePrice: number = BlueLootDefinitons.get(blueLootName) ?? 0;
				let givenBlue = Math.floor(incomeToFulfill / bluePrice);
				let actuallyGivenBlue = blueInBank >= givenBlue ? givenBlue : blueInBank;
				let charLoot = result.get(char) ?? new Map();
				charLoot.set(blueLootName, (charLoot.get(blueLootName) ?? 0) + actuallyGivenBlue);
				bank.set(blueLootName, (bank.get(blueLootName) ?? 0) - actuallyGivenBlue);
				incomeToFulfill -= actuallyGivenBlue * bluePrice;
			});
		});
		return result;
	}

	getCargoContents(input: string): BlueLoot {
		let cargoContents: BlueLoot = new Map();

		let blueLootNames = Array.from(BlueLootDefinitons.keys());
		input
			.replace("*", "")
			.replace(/\t/g, " ")
			.replace(/\0/g, " ")
			.replace(/\v/g, " ")
			.replace(/\f/g, " ")
			.split(/\r?\n/)
			.map((str) => str.trim())
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
			<div className="blueLootCalculator">
				<div>Карго:</div>
				<textarea className="cargoInput" placeholder="Вставь карго сюда" onChange={this.onChange.bind(this)} />
				{this.getCargoPrice(this.state.cargoContents) < this.props.totalFarmedMoney ? (
					<span className="cargoWarning notEnoughCargoWarning">
						<p>В карго недостаточно синьки для распределения</p>
					</span>
				) : (
					<span className="cargoWarning enoughCargoWarning">
						<p>В карго достаточно синьки для распределения</p>
					</span>
				)}
				<table className="blueLootTable">
					<tr className="blueLootTableHeaderRow">
						<th>Окно&nbsp;&nbsp;&nbsp;</th>
						{Array.from(BlueLootDefinitons.keys()).map((blueLootName) => (
							<th className="blueLootTableColumnHeading">{blueLootName}</th>
						))}
						<th>&nbsp;&nbsp;&nbsp;Цена синьки</th>
					</tr>
					{Array.from(this.calculateBlueLootDistribution(this.state.cargoContents).entries()).map(([char, blueLoot]) => (
						<tr className="tableCharRow">
							<td className="calculatorFirstColumn">{char}</td>
							{Array.from(blueLoot).map(([_, blueLootCount]) => (
								<td className="blueLootCount">{blueLootCount}</td>
							))}
							<td>
								&nbsp;
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
