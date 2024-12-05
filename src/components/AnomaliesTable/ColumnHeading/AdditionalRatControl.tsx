import React from "react";
import "./ModifierSelector.css";
import TableColumn from "../../../models/TableColumn";

export type AdditionalRatControlProps = {
    column: TableColumn;
    changeAddRat: (columnName: string) => void;
};

export class AdditionalRatControl extends React.Component<AdditionalRatControlProps> {
    render(): React.ReactNode {
        return (
            <span title={this.renderTitle()} className='modifierSelector' onClick={() => this.props.changeAddRat(this.props.column.name)}>
                {this.props.column.additionalRatKilled ? "A" : "\u00A0"}
            </span>
        )
    }

    private renderTitle(): string | undefined {
        return this.props.column.additionalRatKilled ? "Дополнительный NPC: убит" : "Дополнительный NPC: не убит";
    }
}