import React from "react";
import { AnomalyPassedCheckBox } from "./AnomalyPassedCheckBox";
import { CharAdditionControl } from "./CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomalyAdditionControl";
import { AnomalyDefinitons } from "../../entities/Constants";
import { TableColumn } from "../../entities/TableColumn";
import "./AnomaliesTable.css";

type AnomaliesTableState = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class AnomaliesTable extends React.Component {
	state: AnomaliesTableState = {
		tableColumns: [],
		chars: [],
	};

	setCharStatusForAnomaly(char: string, anomalyName: string, passed: boolean) {
		let newState = this.state;
		let column = newState.tableColumns.find((x) => x.name === anomalyName);
		if (column == null) return;

		if (passed) {
			if (column.charsPassed.includes(char) === false) {
				column.charsPassed.push(char);
			}
		} else {
			if (column.charsPassed.includes(char) === true) {
				column.charsPassed = column.charsPassed.filter((x) => x !== char);
			}
		}

		this.setState(newState);
	}

	addChar(char: string) {
		let newState = this.state;
		if (!this.state.chars.some((x) => x === char)) {
			newState.chars.push(char);
			this.setState(newState);
		}
	}

	addAnomaly(type: string) {
		let newState = this.state;
		let anomalyDefinition = AnomalyDefinitons.get(type);
		let alreadyPresentAnomsOfType = this.state.tableColumns.filter((col) => col.anomalyType === type).length;
		newState.tableColumns.push(new TableColumn((anomalyDefinition?.short ?? "unknown") + (alreadyPresentAnomsOfType + 1), type));
		this.setState(newState);
	}

	render() {
		return (
			<div className="tableContainer">
				<div className="tableDiv">
					<table className="table">
						<tr className="tableHeaderRow">
							<th>Персы</th>
							{this.state.tableColumns.map((column) => (
								<th className="tableColumnHeaderAnomaly">{column.name}</th>
							))}
							<th>
								<span className="anomalyAdditionControlContainer">
									<AnomalyAdditionControl addAnomaly={this.addAnomaly.bind(this)} />
								</span>
							</th>
						</tr>
						{this.state.chars.map((char) => (
							<tr className="tableCharRow">
								<td>{char}</td>
								{this.state.tableColumns.map((column) => (
									<td>
										<AnomalyPassedCheckBox anomaliesTable={this} char={char} anomalyName={column.name} />
									</td>
								))}
							</tr>
						))}
						<tr>
							<div className="charAdditionControlContainer">
								<CharAdditionControl addChar={this.addChar.bind(this)} />
							</div>
						</tr>
					</table>
				</div>
                <div className="calculatorContainer">

                </div>
			</div>
		);
	}
}

export default AnomaliesTable;


type CalculatorProps = {
	tableState: AnomaliesTableState;
};

class Calculator extends React.Component<CalculatorProps> {
render(): React.ReactNode {
    
}
}