import React from "react";
import { AnomalyCheckBox } from "./AnomaliesTable/AnomalyCheckBox";
import { CharAdditionControl } from "./AnomaliesTable/CharAdditionControl";
import { AnomalyAdditionControl } from "./AnomaliesTable/AnomalyAdditionControl";
import TableColumn from "../models/TableColumn";
import { ColumnHeading } from "./AnomaliesTable/ColumnHeading/ColumnHeading";
import { CharName } from "./AnomaliesTable/CharName";
import { AppStateManagementContext } from "../AppStateManagementContext";
import { Translation } from "react-i18next";

type AnomaliesTableProps = {
	tableColumns: TableColumn[];
	chars: string[];
	precheckedChars: string[];
};

export class AnomaliesTable extends React.Component<AnomaliesTableProps> {
	static readonly contextType = AppStateManagementContext;
	declare context: React.ContextType<typeof AppStateManagementContext>

	render() {
		return (
			<div className='col-start-1 col-end-2 row-start-1 row-end-2 overflow-x-auto overflow-y-visible shadow-lg rounded-xl bg-[#f9fafb] dark:bg-zinc-600'>
				<table className="pt-2 mb-2 px-3 w-full">
					<tbody>
						<tr className="bg-zinc-200 dark:bg-zinc-500">
							<th className="sticky left-0 z-10 pl-3 align-middle text-left font-normal dark:text-zinc-200 bg-zinc-200 dark:bg-zinc-500">
								<Translation>{(t) => t("toon")}</Translation>
							</th>
							{this.props.tableColumns.map((column) => (
								<th key={column.name}>
									<ColumnHeading
										removeColumn={this.context.removeColumn}
										changeAddRat={this.context.changeAddRat}
										changeDrifter={this.context.changeDrifter}
										changeCapWaves={this.context.changeCapWaves}
										tableColumn={column}
									/>
								</th>
							))}
							<th className="w-full">
								<AnomalyAdditionControl addAnomaly={this.context.addAnomaly} />
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
									<td key={column.name}>
										<AnomalyCheckBox
											checked={column.charsPassed.includes(char)}
											char={char}
											anomalyName={column.name}
											setCharStatusForAnomaly={this.context.setCharStatusForAnomaly}
										/>
									</td>
								))}
								<td className="opacity-40">
									<div className="float-start ml-2 mr-7">
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
			</div>
		);
	}
}

export default AnomaliesTable;
