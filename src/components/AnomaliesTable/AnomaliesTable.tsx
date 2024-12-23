import React from "react";
import { AnomalyPassedCheckBox } from "./AnomalyPassedCheckBox/AnomalyPassedCheckBox";
import { CharAdditionControl } from "./CharAdditionControl/CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomalyAdditionControl/AnomalyAdditionControl";
import AnomalyDefinitons from "../../definitions/AnomalyDefinitons";
import TableColumn from "../../models/TableColumn";
import "./AnomaliesTable.css";
import { Calculator } from "../Calculator/Calculator";
import { ColumnHeading } from "./ColumnHeading/ColumnHeading";
import { CharName } from "./CharName/CharName";
import ResetButton from "./ResetButton/ResetButton";

type AnomaliesTableState = {
	tableColumns: TableColumn[];
	chars: string[];
};

type AnomaliesTableProps = {
	darkTheme: boolean;
};

export class AnomaliesTable extends React.Component<AnomaliesTableProps, AnomaliesTableState> {
	state: AnomaliesTableState = JSON.parse(
		localStorage.getItem("state") ??
			JSON.stringify({
				tableColumns: [],
				chars: [],
			})
	);

	resetState() {
		this.setStateInternal({
			tableColumns: [],
			chars: [],
		});
		localStorage.removeItem("state");
	}

	removeColumn(columnName: string) {
		this.setStateInternal({
			chars: this.state.chars,
			tableColumns: this.state.tableColumns.filter((x) => x.name !== columnName),
		});
	}

	setStateInternal(state: AnomaliesTableState) {
		this.setState(state);
		localStorage.setItem("state", JSON.stringify(state));
	}

	changeAddRat(columnName: string) {
		let newState = this.state;
		let index = this.state.tableColumns.findIndex((x) => x.name === columnName);
		newState.tableColumns[index].additionalRatKilled = !newState.tableColumns[index].additionalRatKilled;
		this.setStateInternal(newState);
	}

	changeDrifter(columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) {
		let newState = this.state;
		let index = this.state.tableColumns.findIndex((x) => x.name === columnName);
		newState.tableColumns[index].miniDrifterKilled = hasMiniDrifter;
		newState.tableColumns[index].drifterKilled = hasBigDrifter;
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

	removeChar(char: string) {
		let newState: AnomaliesTableState = {
			chars: this.state.chars.filter((x) => x !== char),
			tableColumns: this.state.tableColumns.map((column) => {
				let newColumn: TableColumn = {
					...column,
					charsPassed: column.charsPassed.filter((passed) => passed !== char),
				};
				return newColumn;
			}),
		};
		this.setStateInternal(newState);
	}

	addAnomaly(type: string) {
		let newState = this.state;
		let anomalyDefinition = AnomalyDefinitons.get(type);
		let alreadyPresentAnomsOfType = this.state.tableColumns.filter((col) => col.anomalyType === type).length;
		let columnName = (anomalyDefinition?.short ?? "unknown") + (alreadyPresentAnomsOfType + 1);
		if (newState.tableColumns.some((c) => c.name === columnName)) columnName += "(1)";
		newState.tableColumns.push(new TableColumn(columnName, type));
		this.setStateInternal(newState);
	}

	render() {
		return (
			<div className={"tableContainer " + (this.props.darkTheme ? "dark-theme" : "light-theme")}>
				<div className='tableDiv'>
					<table className='table'>
						<tr className='tableHeaderRow'>
							<th>Окно</th>
							{this.state.tableColumns.map((column) => (
								<th className='tableColumnHeaderAnomaly'>
									<ColumnHeading
										removeColumn={this.removeColumn.bind(this)}
										changeAddRat={this.changeAddRat.bind(this)}
										changeDrifter={this.changeDrifter.bind(this)}
										tableColumn={column}
									/>
								</th>
							))}
							<th>
								<span className='anomalyAdditionControlContainer'>
									<AnomalyAdditionControl addAnomaly={this.addAnomaly.bind(this)} />
								</span>
							</th>
						</tr>
						{this.state.chars.map((char) => (
							<tr className='tableCharRow'>
								<td>
									<CharName
										removeCharFromTable={this.removeChar.bind(this)}
										charName={char}
									/>
								</td>
								{this.state.tableColumns.map((column) => (
									<td>
										<AnomalyPassedCheckBox
											checked={column.charsPassed.some((passed) => passed === char)}
											char={char}
											anomalyName={column.name}
											setCharStatusForAnomaly={this.setCharStatusForAnomaly.bind(this)}
										/>
									</td>
								))}
							</tr>
						))}
						<tr>
							<CharAdditionControl addChar={this.addChar.bind(this)} />
						</tr>
					</table>
				</div>
				<ResetButton resetState={this.resetState.bind(this)} />
				<Calculator
					tableColumns={this.state.tableColumns}
					chars={this.state.chars}
				/>
			</div>
		);
	}
}

export default AnomaliesTable;
