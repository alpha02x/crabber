import React from "react";
import AnomaliesTable from "./components/AnomaliesTable/AnomaliesTable";
import { DarkModeButton } from "./components/DarkModeButton/DarkModeButton";
import TableColumn from "./models/TableColumn";
import AnomalyDefinitons from "./definitions/AnomalyDefinitons";
import { Calculator } from "./components/Calculator/Calculator";

type AppState = {
    darkTheme: boolean;
    tableState: TableState;
};

type TableState = {
    tableColumns: TableColumn[];
    chars: string[];
};

export class App extends React.Component {
    state: AppState = {
        darkTheme: JSON.parse(
            localStorage.getItem("dark-theme") ??
            JSON.stringify({
                darkTheme: false,
            })),
        tableState: JSON.parse(
            localStorage.getItem("state") ??
            JSON.stringify({
                tableColumns: [],
                chars: [],
            })
        )
    }

    enableDarkTheme() {
        let newState = { darkTheme: true };
        this.setState(newState);
        localStorage.setItem("dark-theme", JSON.stringify(newState));
    }

    disableDarkTheme() {
        let newState = { darkTheme: false };
        this.setState(newState);
        localStorage.setItem("dark-theme", JSON.stringify(newState));
    }

    resetState() {
        this.setTableState({
            ...this.state,
            tableColumns: [],
            chars: [],
        });
        localStorage.removeItem("state");
    }

    removeColumn(columnName: string) {
        this.setTableState({
            ...this.state.tableState,
            tableColumns: this.state.tableState.tableColumns.filter((x) => x.name !== columnName),
        });
    }

    setTableState(tableState: TableState) {
        this.setState({ ...this.state, tableState: tableState });
        localStorage.setItem("state", JSON.stringify(tableState));
    }

    changeAddRat(columnName: string) {
        let newState = this.state.tableState;
        let index = this.state.tableState.tableColumns.findIndex((x) => x.name === columnName);
        newState.tableColumns[index].additionalRatKilled = !newState.tableColumns[index].additionalRatKilled;
        this.setTableState(newState);
    }

    changeDrifter(columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) {
        let newState = this.state.tableState;
        let index = this.state.tableState.tableColumns.findIndex((x) => x.name === columnName);
        newState.tableColumns[index].miniDrifterKilled = hasMiniDrifter;
        newState.tableColumns[index].drifterKilled = hasBigDrifter;
        this.setTableState(newState);
    }

    setCharStatusForAnomaly(char: string, anomalyName: string, passed: boolean) {
        let newState = this.state.tableState;
        let column = newState.tableColumns.find((x) => x.name === anomalyName);
        if (column == null) return;

        if (passed) {
            if (column.charsPassed.includes(char) === false) {
                column.charsPassed.push(char);
            }
        } else {
            if (column.charsPassed.includes(char) === true) {
                column.charsPassed = column.charsPassed.filter((x: string) => x !== char);
            }
        }

        this.setTableState(newState);
    }

    addChar(char: string) {
        let newState = this.state.tableState;
        if (!this.state.tableState.chars.some((x) => x === char)) {
            newState.chars.push(char);
            this.setTableState(newState);
        }
    }

    removeChar(char: string) {
        let newState: TableState = {
            chars: this.state.tableState.chars.filter((x) => x !== char),
            tableColumns: this.state.tableState.tableColumns.map((column) => {
                let newColumn: TableColumn = {
                    ...column,
                    charsPassed: column.charsPassed.filter((passed: string) => passed !== char),
                };
                return newColumn;
            }),
        };
        this.setTableState(newState);
    }

    addAnomaly(type: string) {
        let newTableState = this.state.tableState;
        let anomalyDefinition = AnomalyDefinitons.get(type);
        let alreadyPresentAnomsOfType = this.state.tableState.tableColumns.filter((col) => col.anomalyType === type).length;
        let columnName = (anomalyDefinition?.short ?? "unknown") + (alreadyPresentAnomsOfType + 1);
        if (newTableState.tableColumns.some((c) => c.name === columnName)) columnName += "(1)";
        newTableState.tableColumns.push(new TableColumn(columnName, type));
        this.setTableState(newTableState);
    }

    render(): React.ReactNode {
        return (
            <div className={"h-full w-full" + (this.isDarkTheme() ? " dark" : "")}>
                <div className="p-3 h-full w-full bg-white dark:bg-zinc-700">
                    <AnomaliesTable
                        tableColumns={this.state.tableState.tableColumns}
                        chars={this.state.tableState.chars}
                        addChar={this.addChar.bind(this)}
                        removeCharFromTable={this.removeChar.bind(this)}
                        addAnomaly={this.addAnomaly.bind(this)}
                        setCharStatusForAnomaly={this.setCharStatusForAnomaly.bind(this)}
                        changeAddRat={this.changeAddRat.bind(this)}
                        changeDrifter={this.changeDrifter.bind(this)}
                        removeColumn={this.removeColumn.bind(this)}
                        resetState={this.resetState.bind(this)}
                    />
                    <Calculator
                        tableColumns={this.state.tableState.tableColumns}
                        chars={this.state.tableState.chars}
                    />
                    <DarkModeButton
                        darkTheme={this.isDarkTheme()}
                        disableDarkTheme={this.disableDarkTheme.bind(this)}
                        enableDarkTheme={this.enableDarkTheme.bind(this)}
                    />
                </div>
            </div>
        );
    }

    private isDarkTheme(): boolean {
        let storageValue = JSON.parse(
            localStorage.getItem("dark-theme") ??
            JSON.stringify({
                darkTheme: false,
            }));
        return storageValue.darkTheme;
    }
}

export default App;
