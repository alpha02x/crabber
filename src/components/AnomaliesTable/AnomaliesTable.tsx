import React from "react";
import { AnomalyCheckBox } from "./AnomalyCheckBox/AnomalyCheckBox";
import { CharAdditionControl } from "./CharAdditionControl/CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomalyAdditionControl/AnomalyAdditionControl";
import TableColumn from "../../models/TableColumn";
import { ColumnHeading } from "./ColumnHeading/ColumnHeading";
import { CharName } from "./CharName/CharName";
import ResetButton from "./ResetButton/ResetButton";

type AnomaliesTableProps = {
	tableColumns: TableColumn[];
	chars: string[];
	precheckedChars: string[];
	removeColumn: (columnName: string) => void;
	changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
	changeAddRat: (columnName: string) => void;
	addAnomaly: (type: string) => void;
	removeCharFromTable: (charName: string) => void;
	setCharStatusForAnomaly: (charName: string, anomalyName: string, passed: boolean) => void;
	setPrecheck: (charName: string, anomalyName: string, passed: boolean) => void;
	addChar: (char: string) => void;
	resetState: () => void;
};

export class AnomaliesTable extends React.Component<AnomaliesTableProps> {
	render() {
		return (
			[
				<div className='overflow-x-auto overflow-y-visible mt-5 ml-2 mr-3 sm:ml-5 sm:mr-6 2xl:ml-72 2xl:mr-72 shadow-lg rounded-xl bg-[#f9fafb] dark:bg-zinc-600'>
					<table className="pt-2 mb-2 px-3 w-full">
						<tbody>
							<tr className="bg-zinc-200 dark:bg-zinc-500">
								<th className="sticky left-0 z-10 pl-3 align-middle text-left font-normal dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-500">Окно</th>
								{this.props.tableColumns.map((column) => (
									<th>
										<ColumnHeading
											removeColumn={this.props.removeColumn}
											changeAddRat={this.props.changeAddRat}
											changeDrifter={this.props.changeDrifter}
											tableColumn={column}
										/>
									</th>
								))}
								<th className="w-full">
									<span className='px-1 float-start'>
										<AnomalyAdditionControl addAnomaly={this.props.addAnomaly} />
									</span>
								</th>
							</tr>
							{this.props.chars.map((char) => (
								<tr key={char} className={this.props.chars.indexOf(char) % 2 === 1 ? "dark:bg-[#4c4c55] bg-[#f1f1f3]" : ""}>
									<td className={"sticky left-0 z-10 pl-3 py-1 " +
										(this.props.chars.indexOf(char) % 2 === 1 ?
											"bg-[#f1f1f3] dark:bg-[#4c4c55]" :
											"bg-[#f9fafb] dark:bg-zinc-600")}>
										<CharName
											removeCharFromTable={this.props.removeCharFromTable}
											charName={char}
										/>
									</td>
									{this.props.tableColumns.map((column) => (
										<td>
											<AnomalyCheckBox
												checked={column.charsPassed.includes(char)}
												char={char}
												anomalyName={column.name}
												setCharStatusForAnomaly={this.props.setCharStatusForAnomaly}
											/>
										</td>
									))}
									<td className="opacity-40">
										<div className="float-start ml-2">
											<AnomalyCheckBox
												checked={this.props.precheckedChars.includes(char)}
												char={char}
												anomalyName="preCheck"
												setCharStatusForAnomaly={this.props.setPrecheck}
											></AnomalyCheckBox>
										</div>
									</td>
								</tr>
							))}
							<tr>
								<td className="sticky left-0">
									<CharAdditionControl addChar={this.props.addChar} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>,
				<ResetButton resetState={this.props.resetState} />
			]
		);
	}
}

export default AnomaliesTable;
