import React from "react";
import { AnomalyCheckBox } from "./AnomaliesTable/AnomalyCheckBox";
import { CharAdditionControl } from "./AnomaliesTable/CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomaliesTable/AnomalyAdditionControl";
import TableColumn from "../models/TableColumn";
import { ColumnHeading } from "./AnomaliesTable/ColumnHeading/ColumnHeading";
import { CharName } from "./AnomaliesTable/CharName";
import ResetButton from "./AnomaliesTable/ResetButton";
import { AppStateManagementContext } from "../AppStateManagementContext";

type AnomaliesTableProps = {
	tableColumns: TableColumn[];
	chars: string[];
	precheckedChars: string[];
};

export class AnomaliesTable extends React.Component<AnomaliesTableProps> {
	static contextType = AppStateManagementContext;
	declare context: React.ContextType<typeof AppStateManagementContext>

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
											removeColumn={this.context.removeColumn}
											changeAddRat={this.context.changeAddRat}
											changeDrifter={this.context.changeDrifter}
											tableColumn={column}
										/>
									</th>
								))}
								<th className="w-full">
									<span className='px-1 float-start'>
										<AnomalyAdditionControl addAnomaly={this.context.addAnomaly} />
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
											removeCharFromTable={this.context.removeCharFromTable}
											charName={char}
										/>
									</td>
									{this.props.tableColumns.map((column) => (
										<td>
											<AnomalyCheckBox
												checked={column.charsPassed.includes(char)}
												char={char}
												anomalyName={column.name}
												setCharStatusForAnomaly={this.context.setCharStatusForAnomaly}
											/>
										</td>
									))}
									<td className="opacity-40">
										<div className="float-start ml-2">
											<AnomalyCheckBox
												checked={this.props.precheckedChars.includes(char)}
												char={char}
												anomalyName="preCheck"
												setCharStatusForAnomaly={this.context.setPrecheck}
											></AnomalyCheckBox>
										</div>
									</td>
								</tr>
							))}
							<tr>
								<td className="sticky left-0">
									<CharAdditionControl addChar={this.context.addChar} />
								</td>
							</tr>
						</tbody>
					</table>
				</div>,
				<ResetButton/>
			]
		);
	}
}

export default AnomaliesTable;
