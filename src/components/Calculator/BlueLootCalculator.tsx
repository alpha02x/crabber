import React, { ChangeEvent } from "react";
import BlueLootDefinitons from "../../definitions/BlueLootDefinitons";
import BigNumber from "bignumber.js";

type BlueLoot = Map<string, number>;

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
		let result: Map<string, BlueLoot> = new Map(
			Array.from(this.props.charsToIncomeMap.keys()).map((char) => [char, new Map()])
		);

		let cargoPrice = this.getCargoPrice(this.state.cargoContents);
		let lostBlueCoef = new BigNumber(1);
		if (cargoPrice < this.props.totalFarmedMoney)
			lostBlueCoef = new BigNumber(cargoPrice).div(new BigNumber(this.props.totalFarmedMoney));

		Array.from(this.props.charsToIncomeMap).forEach(([char, income]) => {
			let incomeToFulfill = income;
			incomeToFulfill = incomeToFulfill * lostBlueCoef.toNumber();
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
			.replace(/\*/g, "")
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
				let parsedCount = Number(cargoItemWords.at(-1));
				let count: number = Number.isNaN(parsedCount) ? 1 : parsedCount;

				cargoContents.set(key, (cargoContents.get(key) ?? 0) + count);
			});

		return cargoContents;
	}

	getCargoPrice(cargoContents: Map<string, number>): number {
		return Array.from(cargoContents).reduce(
			(acc, [blueLootName, blueLootCount]) =>
				acc.plus(new BigNumber(blueLootCount)
					.multipliedBy(new BigNumber(BlueLootDefinitons.get(blueLootName)!))),
			new BigNumber(0)
		).toNumber();
	}

	render(): React.ReactNode {
		let isEnoughCargo = this.getCargoPrice(this.state.cargoContents) >= this.props.totalFarmedMoney;
		return (
			<div className="col-start-1 col-end-2 overflow-x-auto overflow-y-visible shadow-lg w-fit rounded-xl">
				<div className={(this.props.charsToIncomeMap.size < 1 ? "hidden " : "") + 'w-fit pt-1 bg-[#f9fafb] dark:bg-zinc-600 rounded-xl overflow-x-auto overflow-y-visible'}>
					<div className="px-3 my-0.5 dark:text-zinc-100">Карго:</div>
					<textarea
						id='cargoInput'
						className='w-80 min-h-16 max-h-64 mx-3 px-1 pt-1 mt-1 mb-2 rounded-md font-mono text-[0.8125rem] bg-zinc-100 dark:bg-zinc-500 dark:text-zinc-100 placeholder:text-zinc-400'
						placeholder='Вставь карго сюда'
						onChange={this.onChange.bind(this)}
					/>
					{((document.getElementById("cargoInput") as HTMLInputElement)?.value ?? "") !== "" && (
						<div className='animate-fadein100 mt-2'>
							<div
								className={`px-3 mb-3 ${isEnoughCargo ? "text-[#2a9902] dark:text-[#75e36f]" : "text-[#c4000d] dark:text-[#f9b2b3]"}`}
							>
								<p>{`${isEnoughCargo ?
									"В карго достаточно синьки для распределения" :
									('Не хватает синьки на ' + ((this.props.totalFarmedMoney - this.getCargoPrice(this.state.cargoContents))
										.toLocaleString("ru-RU", {
											minimumFractionDigits: 0,
											maximumFractionDigits: 2,
										}) + ' ISK'))}`}</p>
							</div>
							<table className='dark:text-zinc-100'>
								<tr className='px-3 bg-zinc-200 dark:bg-zinc-400'>
									<th className="px-3 font-normal text-left">Окно</th>
									{Array.from(BlueLootDefinitons.keys()).map((blueLootName) => (
										<th key={"bl-header"} className='font-semibold text-[12px] max-w-24 px-2 py-0.5 uppercase'>{blueLootName}</th>
									))}
									<th className="px-3 text-right font-normal text-nowrap">Цена синьки</th>
								</tr>
								{Array.from(this.calculateBlueLootDistribution(this.state.cargoContents).entries()).map(
									([char, blueLoot]) => (
										<tr key={char} className={(Array.from(this.props.charsToIncomeMap.keys()).indexOf(char) % 2 === 1) ? "dark:bg-[#4c4c55] bg-[#f1f1f3]" : ""}>
											<td className='py-1 pl-3 pr-4 overflow-hidden text-nowrap text-ellipsis max-w-44 xl:max-w-72 m-auto'>{char}</td>
											{Array.from(blueLoot).map(([blueLootName, blueLootCount]) => (
												<td key={`${char}|${blueLootName}`} className='font-mono text-center'>{blueLootCount}</td>
											))}
											<td className={"pr-3 pl-3 text-nowrap text-right font-mono" + (!isEnoughCargo ? " text-[#c4000d] dark:text-[#f9b2b3]" : "")}>
												&nbsp;
												{Array.from(blueLoot)
													.reduce(
														(acc, [blueLootName, blueLootCount]) =>
															acc + blueLootCount * BlueLootDefinitons.get(blueLootName)!,
														0
													)
													.toLocaleString("ru-RU", {
														minimumFractionDigits: 0,
														maximumFractionDigits: 2,
													}) + " ISK"}
											</td>
										</tr>
									)
								)}
							</table>
						</div>
					)}
				</div>
			</div>
		);
	}
}
