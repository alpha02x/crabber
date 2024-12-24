import React, { ChangeEvent } from "react";
import AnomalyDefinitons, { Blocks } from "../../../definitions/AnomalyDefinitons";

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
			<select
				className='w-10 m-auto rounded-lg font-normal'
				id='choice'
				onChange={this.onChange.bind(this)}
			>
				<option
					value='none'
					hidden
					selected
				>
					&nbsp;+
				</option>

				{Blocks.map((block) => {
					let options: JSX.Element[] = [];
					options.push(
						<option
							value='none'
							disabled
						>
							{block.text}
						</option>
					);
					Array.from(AnomalyDefinitons.keys())
						.filter((anom) => AnomalyDefinitons.get(anom)?.block === block.text)
						.map((anom) => (
							<option
								style={{ backgroundColor: block.color ?? "white" }}
								value={anom}
							>
								{AnomalyDefinitons.get(anom)?.name}
							</option>
						))
						.forEach((option) => options.push(option));
					return options;
				})}
			</select>
		);
	}
}
