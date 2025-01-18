import React from "react";
import TableColumn from "../../../models/TableColumn";
import AnomalyDefinitons, { AnomalyDefinition, WhClass } from "../../../definitions/AnomalyDefinitons";
import { DrifterControl } from "./DrifterControl";
import { AdditionalRatControl } from "./AdditionalRatControl";
import RelicImg from "../../../assets/relic_Site_16.png"
import DataImg from "../../../assets/data_Site_16.png"
import { Translation } from "react-i18next";

export type ColumnHeadingProps = {
	tableColumn: TableColumn;
	changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
	changeAddRat: (columnName: string) => void;
	removeColumn: (columnName: string) => void;
};

export class ColumnHeading extends React.Component<ColumnHeadingProps> {
	render(): React.ReactNode {
		let anomalyDef = AnomalyDefinitons.get(this.props.tableColumn.anomalyType)!;
		return (
			<Translation>{t =>
				<div className='mt-2 m-0.5 px-0.5 min-w-14'>
					<div className="select-none">
						<div className="m-auto w-max text-center">
							{this.renderTrashButton()}
						</div>
						<div className="text-nowrap" title={t(anomalyDef.name, anomalyDef.name) ?? ""}>
							{this.renderWhClass(anomalyDef)}
							{this.renderAnomImage(anomalyDef)}
							<span className="pl-0.5 text-xs font-bold dark:text-zinc-200">{anomalyDef.short}</span>
							<span className="pl-0.5 text-xs font-bold font-mono dark:text-zinc-200">
								{this.props.tableColumn.name.split('-').at(-1)}
							</span>
							<div />
						</div>
					</div>

					{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasAdditionalRats && (
						<AdditionalRatControl changeAddRat={this.props.changeAddRat} column={this.props.tableColumn} />
					)}

					{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasDrifter && (
						<DrifterControl changeDrifter={this.props.changeDrifter} column={this.props.tableColumn} />
					)}
				</div>
			}</Translation>
		);
	}

	private renderAnomImage(anomalyDef: AnomalyDefinition) {
		if (!anomalyDef.relic && !anomalyDef.data) {
			return null;
		}

		let src = anomalyDef.relic ? RelicImg : DataImg;
		return <img className="pb-[1px] inline scale-75 invert dark:invert-0" src={src} alt=""></img>;
	}

	renderWhClass(anomalyDef: AnomalyDefinition): React.ReactNode {
		let whClass: WhClass | null = anomalyDef.whClasses.length > 1 ? null : anomalyDef.whClasses[0];

		switch (whClass) {
			case WhClass.C1:
			case WhClass.C2:
			case WhClass.C3:
				return <span className="text-[#428bca] dark:text-[#7fc0fa] font-bold text-xs">{WhClass[whClass]}</span>
			case WhClass.C4:
			case WhClass.C5:
				return <span className="text-[#e28a0d] dark:text-[#fcb045] font-bold text-xs">{WhClass[whClass]}</span>
			case WhClass.C6:
				return <span className="text-[#d9534f] dark:text-[#ff6661] font-bold text-xs">{WhClass[whClass]}</span>
			default:
				return null;
		}
	}

	private renderTrashButton() {
		return (
			<svg
				onClick={() => this.props.removeColumn(this.props.tableColumn.name)}
				className="h-3 w-3 text-red-500 dark:text-red-400 cursor-pointer"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round">
				<polyline points="3 6 5 6 21 6" />
				<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				<line x1="10" y1="11" x2="10" y2="17" />
				<line x1="14" y1="11" x2="14" y2="17" />
			</svg>
		);
	}
}
