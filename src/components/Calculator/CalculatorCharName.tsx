import React, { ChangeEvent } from "react";
import BigNumber from "bignumber.js";

export type CalculatorCharNameProps = {
	char: [name: string, coef: number];
	changeCoefficient: (char: string, coefficient: number) => void;
};

export type CalculatorCharNameState = {
	isError: boolean
	lastValue: string | undefined
}

export class CalculatorCharName extends React.Component<CalculatorCharNameProps> {
	state: CalculatorCharNameState = {
		isError: false,
		lastValue: undefined
	}

	onChange(event: ChangeEvent<HTMLInputElement>) {
		let input = event.currentTarget.value;
		if (input === '' || input === undefined) {
			this.setState({ isError: false, lastValue: undefined });
			this.props.changeCoefficient(this.props.char[0], 1);
			return;
		}
		let parsedPercentage = Number.parseFloat(input);
		if (Number.isNaN(parsedPercentage)) {
			this.setState({ isError: true, lastValue: input });
		} else {
			let coefficient = new BigNumber(1)
				.minus(
					(new BigNumber(parsedPercentage).isGreaterThan(100)
						? new BigNumber(100)
						: new BigNumber(parsedPercentage)
					).div(100)
				)
				.toNumber();
			let coeffToDisplay =
				(input.at(-1) === '.' || input.endsWith(".0") || input.endsWith(".00"))
					? input :
					(parsedPercentage > 100
						? 100 : parsedPercentage);
			// : 1 - (parsedPercentage > 100 ? 100 : parsedPercentage) / 100;
			this.setState({ isError: false, lastValue: coeffToDisplay });
			this.props.changeCoefficient(this.props.char[0], coefficient);
		}
	}

	render(): React.ReactNode {
		return (
			<div className='flex flex-row flex-nowrap w-full text-nowrap pr-3'>
				<div className='flex-1 w-full dark:text-zinc-200 overflow-hidden text-nowrap overflow-ellipsis m-auto'>{this.props.char[0]}</div>
				<div className={'inline pl-4 w-14 m-auto float-right text-nowrap font-mono text-sm select-none '
					+ (this.state.isError ? " text-red-600 dark:text-red-600 " : " dark:text-zinc-200 ")
					+ (this.props.char[1] === 1 ? " opacity-50" : "")}>
					<span className="inline-block">-</span>
					{
						<input
							maxLength={5}
							className='inline-block w-full bg-transparent pl-1'
							placeholder='0'
							onChange={this.onChange.bind(this)}
							type='text'
							//value={(100 - this.props.char[1] * 100).toString()}
							// value={new BigNumber(100)
							// 	.minus(new BigNumber(this.props.char[1]).multipliedBy(new BigNumber(100)))
							// 	.toString()}
							value={this.state.lastValue ?? "0"}
						/>
					}
					<span className="inline-block text-[13px]">%</span>
				</div>
			</div>
		);
	}
}
