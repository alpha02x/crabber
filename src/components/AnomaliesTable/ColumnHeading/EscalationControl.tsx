import React from "react";
import TableColumn from "../../../models/TableColumn";
import { Translation } from "react-i18next";
import { TFunction } from "i18next";

export type EscalationControlProps = {
	column: TableColumn;
	changeCapWaves: (columnName: string, capWavesKilled: number) => void;
};

export class EscalationControl extends React.Component<EscalationControlProps> {
	render(): React.ReactNode {
		return (
			<Translation>{t =>
				<button
					title={this.renderTitle(t)}
					className={`${(this.getCurrentWaves() !== 0)
						? "text-zinc-800 dark:text-eastern-blue-300"
						: "text-zinc-500 dark:text-zinc-300 hover:text-xs hover:scale-90"
						} inline-block h-4 w-4 font-bold text-sm text-center mx-auto select-none cursor-pointer`}
					onClick={() => this.cycleWavesNumber()}
				>
					{this.renderNumber()}
				</button>
			}</Translation>
		);
	}

	renderTitle(t: TFunction<"translation", undefined>): string {
		if (this.getCurrentWaves() === 0) {
			return t("no_cap_waves");
		} else {
			return t("cap_waves_killed", { count: this.getCurrentWaves() });
		}
	}

	renderNumber(): React.ReactNode {
		if (this.getCurrentWaves() === 0) {
			return <span className="font-mono">0</span>;
		} else {
			return this.props.column.capWaves!.toString();
		}
	}

	getCurrentWaves = (): number => this.props.column.capWaves ?? 0;

	cycleWavesNumber(): void {
		let newWavesCount = (this.getCurrentWaves() + 1) % 6;
		this.props.changeCapWaves(this.props.column.name, newWavesCount);
	}
}
