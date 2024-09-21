import React from "react";
import TableColumn from "../../../models/TableColumn";
import AnomalyDefinitons from "../../../definitions/AnomalyDefinitons";
import "./ColumnHeading.css";

export type ColumnHeadingProps = {
	tableColumn: TableColumn;
	changeDrifter: (columnName: string) => void;
	changeAddRat: (columnName: string) => void;
	removeColumn: (columnName: string) => void;
};

export class ColumnHeading extends React.Component<ColumnHeadingProps> {
	render(): React.ReactNode {
		return (
			<div className='tableHeader'>
				<div>
					<button
						className='deleteColumnButton'
						onClick={() => this.props.removeColumn(this.props.tableColumn.name)}
					>
						×
					</button>
					<span>{this.props.tableColumn.name}</span>
				</div>

				{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasAdditionalRats && (
					<span className='nowrap'>
						<input
							onChange={() => this.props.changeAddRat(this.props.tableColumn.name)}
							checked={this.props.tableColumn.additionalRatKilled}
							type='checkbox'
						></input>
						<span
							title='Дополнительный неписенок'
							className='checkboxExplanation nowrap'
						>
							A
						</span>
					</span>
				)}

				{AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasDrifter && (
					<span className='nowrap'>
						<input
							onChange={() => this.props.changeDrifter(this.props.tableColumn.name)}
							checked={this.props.tableColumn.drifterKilled}
							type='checkbox'
						></input>
						<span
							title='Дрифтер'
							className='checkboxExplanation nowrap'
						>
							D
						</span>
					</span>
				)}
			</div>
		);
	}
}
