import React, { ChangeEvent } from "react";

type AnomaliesTableProps = {
	char: string;
	anomalyName: string;
	checked: boolean;
	setCharStatusForAnomaly: (charName: string, anomalyName: string, passed: boolean) => void;
};

export class AnomalyPassedCheckBox extends React.Component<AnomaliesTableProps> {
	handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue: boolean = event.target.checked;
		this.props.setCharStatusForAnomaly(this.props.char, this.props.anomalyName, newValue);
	};

	render() {
		return (
			<input
				onChange={this.handleCheckboxChange}
				type='checkbox'
				name='scales'
				checked={this.props.checked}
			></input>
		);
	}
}
