import React, { ChangeEvent } from "react";

export type CalculatorCharNameProps = {
	char: string;
	changeCoefficient: (char: string, coefficient: number) => void;
};

export class CalculatorCharName extends React.Component<CalculatorCharNameProps> {
	onChange(event: ChangeEvent<HTMLInputElement>) {
		let parsedPercentage = Number.parseFloat(event.currentTarget.value);
		let coefficient = Number.isNaN(parsedPercentage) ? 1 : 1 - (parsedPercentage > 100 ? 100 : parsedPercentage) / 100;
		this.props.changeCoefficient(this.props.char, coefficient);
	}

	render(): React.ReactNode {
		return (
			<div>
				<div className="coefficientContainer">
					<div className="coefficientInputContainer">
						-{<input maxLength={3} className="coefficientInput" placeholder="0" onChange={this.onChange.bind(this)} type="text" />}%
					</div>
					<div className="charNameLabel">{this.props.char}</div>
				</div>
			</div>
		);
	}
}
