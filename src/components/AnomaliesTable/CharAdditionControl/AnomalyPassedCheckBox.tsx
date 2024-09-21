import React, { ChangeEvent } from "react";
import { AnomaliesTable } from "../AnomaliesTable";

type AnomaliesTableProps = {
	char: string;
	anomalyName: string;
	anomaliesTable: AnomaliesTable;
	checked: boolean;
};

export class AnomalyPassedCheckBox extends React.Component<AnomaliesTableProps> {
	handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue = event.target.checked;
		this.props.anomaliesTable.setCharStatusForAnomaly(this.props.char, this.props.anomalyName, newValue);
	};

	render() {
		return <input onChange={this.handleCheckboxChange} type="checkbox" name="scales" checked={this.props.checked}></input>;
	}
}
