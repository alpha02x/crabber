import React from "react";
import { AnomalyPassedCheckBox } from "./AnomalyPassedCheckBox";
import { CharAdditionControl } from "./CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomalyAdditionControl";
import { AnomalyDefinitons } from "../../entities/Constants";
import { TableColumn } from "../../entities/TableColumn";
import "./AnomaliesTable.css";
import { Calculator } from "./Calculator";
import { ColumnHeading } from "./ColumnHeading";

type AnomaliesTableState = {
	tableColumns: TableColumn[];
	chars: string[];
};

export class AnomaliesTable extends React.Component {
	state: AnomaliesTableState = {
		tableColumns: [],
		chars: [],
	};

	removeColumn(columnName: string) {
		this.setStateInternal({
			chars: this.state.chars,
			tableColumns: this.state.tableColumns.filter((x) => x.name !== columnName),
		});
	}

	setStateInternal(state: AnomaliesTableState) {
		this.setState(state);
	}

	changeAddRat(columnName: string) {
		let newState = this.state;
		let index = this.state.tableColumns.findIndex((x) => x.name === columnName);
		newState.tableColumns[index].additionalRatKilled = !newState.tableColumns[index].additionalRatKilled;
		this.setStateInternal(newState);
	}

	changeDrifter(columnName: string) {
		let newState = this.state;
		let index = this.state.tableColumns.findIndex((x) => x.name === columnName);
		newState.tableColumns[index].drifterKilled = !newState.tableColumns[index].drifterKilled;
		this.setStateInternal(newState);
	}

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

		this.setStateInternal(newState);
	}

	addChar(char: string) {
		let newState = this.state;
		if (!this.state.chars.some((x) => x === char)) {
			newState.chars.push(char);
			this.setStateInternal(newState);
		}
	}

	addAnomaly(type: string) {
		let newState = this.state;
		let anomalyDefinition = AnomalyDefinitons.get(type);
		let alreadyPresentAnomsOfType = this.state.tableColumns.filter((col) => col.anomalyType === type).length;
		let columnName = (anomalyDefinition?.short ?? "unknown") + (alreadyPresentAnomsOfType + 1);
		newState.tableColumns.push(new TableColumn(columnName, type));
		this.setStateInternal(newState);
	}

	render() {
		return (
			<div className="tableContainer">
				<div className="tableDiv">
					<table className="table">
						<tr className="tableHeaderRow">
							<th>Персы</th>
							{this.state.tableColumns.map((column) => (
								<th className="tableColumnHeaderAnomaly">
									<ColumnHeading
										removeColumn={this.removeColumn.bind(this)}
										changeAddRat={this.changeAddRat.bind(this)}
										changeDrifter={this.changeDrifter.bind(this)}
										tableColumn={column}
									/>
								</th>
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
										<AnomalyPassedCheckBox
											checked={column.charsPassed.some((passed) => passed === char)}
											anomaliesTable={this}
											char={char}
											anomalyName={column.name}
										/>
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
					<Calculator tableColumns={this.state.tableColumns} chars={this.state.chars} />
				</div>
			</div>
		);
	}
}

export default AnomaliesTable;
