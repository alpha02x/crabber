import React from "react";
import "./ModifierSelector.css";
import TableColumn from "../../../models/TableColumn";

export type DrifterControlProps = {
    column: TableColumn;
    changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
};

enum DrifterState {
    None,
    MiniDrifter,
    BigDrifter
}

export class DrifterControl extends React.Component<DrifterControlProps> {
    render(): React.ReactNode {
        return (
            <span title={this.renderTitle()} className='modifierSelector' onClick={() => this.cycleDrifter()}>
                {this.renderDrifter()}
            </span>
        )
    }

    renderTitle(): string | undefined {
        switch (this.getCurrentDrifterState()) {
            case DrifterState.None:
                return "Дрифтер: не убит";
            case DrifterState.MiniDrifter:
                return "Дрифтер: убит минидрифтер";
            case DrifterState.BigDrifter:
                return "Дрифтер: убит большой дрифтер";
            default:
                break;
        }
    }

    getCurrentDrifterState(): DrifterState {
        if (this.props.column.drifterKilled) {
            return DrifterState.BigDrifter;
        }

        if (this.props.column.miniDrifterKilled) {
            return DrifterState.MiniDrifter;
        }

        return DrifterState.None;
    }


    renderDrifter(): React.ReactNode {
        switch (this.getCurrentDrifterState()) {
            case DrifterState.None:
                return '\u00A0';
            case DrifterState.MiniDrifter:
                return "M";
            case DrifterState.BigDrifter:
                return "D";
            default:
                break;
        }
    }

    cycleDrifter(): void {
        let newDrifterState = (this.getCurrentDrifterState() + 1) % 3;

        switch (newDrifterState) {
            case DrifterState.None:
                this.props.changeDrifter(this.props.column.name, false, false);
                break;
            case DrifterState.MiniDrifter:
                this.props.changeDrifter(this.props.column.name, true, false);
                break;
            case DrifterState.BigDrifter:
                this.props.changeDrifter(this.props.column.name, false, true);
                break;
            default:
                break;
        }
    }
}