import React from "react";
import { TableColumn } from "../../entities/TableColumn";
import { AnomalyDefinitons } from "../../entities/Constants";

export type ColumnHeadingProps = {
	tableColumn: TableColumn;
	changeDrifter: (columnName: string) => void;
	changeAddRat: (columnName: string) => void;
	removeColumn: (columnName: string) => void;
};

export class ColumnHeading extends React.Component<ColumnHeadingProps> {
	render(): React.ReactNode {
		return (
			<div className="tableHeader">
				<button className="deleteColumnButton" onClick={() => this.props.removeColumn(this.props.tableColumn.name)}>
					×
				</button>
				{this.props.tableColumn.name}

				{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasAdditionalRats && (
					<span>
						<input onChange={() => this.props.changeAddRat(this.props.tableColumn.name)} checked={this.props.tableColumn.additionalRatKilled} type="checkbox"></input>
						<span title="Дополнительный неписенок" className="checkboxExplanation">
							A
						</span>
					</span>
				)}

				{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasDrifter && (
					<span>
						<input onChange={() => this.props.changeDrifter(this.props.tableColumn.name)} checked={this.props.tableColumn.drifterKilled} type="checkbox"></input>
						<span title="Дрифтер" className="checkboxExplanation">
							D
						</span>
					</span>
				)}
			</div>
		);
	}
}
