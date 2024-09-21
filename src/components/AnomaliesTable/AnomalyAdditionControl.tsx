import React, { ChangeEvent } from "react";
import { AnomalyDefinitons } from "../../entities/Constants";

type AnomalyAdditionControlProps = {
	addAnomaly: (type: string) => void;
};

export class AnomalyAdditionControl extends React.Component<AnomalyAdditionControlProps> {
	onChange(event: ChangeEvent<HTMLSelectElement>) {
		this.props.addAnomaly(event.currentTarget.value);
		event.currentTarget.value = "none";
	}

	render(): React.ReactNode {
		return (
			<select className="anomalyAdditionControl" id="choice" onChange={this.onChange.bind(this)}>
				<option value="none" hidden selected>
					+
				</option>
				{Array.from(AnomalyDefinitons.keys()).map((anom) => (
					<option value={anom}>{AnomalyDefinitons.get(anom)?.name}</option>
				))}
			</select>
		);
	}
}
