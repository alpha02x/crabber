import React, { ChangeEvent } from "react";
import { AnomaliesTable } from "./AnomaliesTable";

type AnomaliesTableState = {
	checked: boolean;
};
type AnomaliesTableProps = {
	char: string;
	anomalyName: string;
	anomaliesTable: AnomaliesTable;
};

export class AnomalyPassedCheckBox extends React.Component<AnomaliesTableProps, AnomaliesTableState> {
	props: AnomaliesTableProps;

	handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue = event.target.checked;
		this.setState({ checked: newValue });
		this.props.anomaliesTable.setCharStatusForAnomaly(this.props.char, this.props.anomalyName, newValue);
	};

	constructor(props: AnomaliesTableProps) {
		super(props);
		this.props = props;
		this.state = { checked: false };
	}

	render() {
		return <input onChange={this.handleCheckboxChange} type="checkbox" name="scales" checked={this.state.checked}></input>;
	}
}
