import React from "react";
import TableColumn from "../../../models/TableColumn";
import AnomalyDefinitons from "../../../definitions/AnomalyDefinitons";
import "./ColumnHeading.css";
import { DrifterControl } from "./DrifterControl";
import { AdditionalRatControl } from "./AdditionalRatControl";

export type ColumnHeadingProps = {
    tableColumn: TableColumn;
    changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
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
                    <span title={AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.name ?? ""}>
                        {this.props.tableColumn.name}
                    </span>
                </div>

                {AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasAdditionalRats && (
                    <AdditionalRatControl changeAddRat={this.props.changeAddRat} column={this.props.tableColumn} />
                )}

                {AnomalyDefinitons.get(this.props.tableColumn.anomalyType)?.hasDrifter && (
                    <DrifterControl changeDrifter={this.props.changeDrifter} column={this.props.tableColumn} />
                )}
            </div>
        );
    }
}
