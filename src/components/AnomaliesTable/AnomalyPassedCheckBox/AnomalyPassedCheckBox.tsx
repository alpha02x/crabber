import React, { ChangeEvent } from "react";

type AnomaliesTableProps = {
	char: string;
	anomalyName: string;
	checked: boolean;
	setCharStatusForAnomaly: (charName: string, anomalyName: string, passed: boolean) => void;
};

export class AnomalyPassedCheckBox extends React.Component<AnomaliesTableProps> {
	handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		let newValue: boolean = event.target.checked;
		this.props.setCharStatusForAnomaly(this.props.char, this.props.anomalyName, newValue);
	};

	render() {
		return (
			<div
				className="h-4 w-4 rounded-md bg-white align-middle text-center m-auto select-none border-2 border-zinc-400 dark:border-0 cursor-pointer hover:shadow-lg"
				onClick={() => this.props.setCharStatusForAnomaly(this.props.char, this.props.anomalyName, !this.props.checked)}>
				{
					this.props.checked ?
						<svg className="h-4 w-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12" />
						</svg> :
						null
				}
			</div>
		);
	}
}
