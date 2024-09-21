import React from "react";
import "./ResetButton.css";

type ResetButtonProps = {
	resetState: () => void;
};

type ResetButtonState = {
	showToolTip: boolean;
};

export class ResetButton extends React.Component<ResetButtonProps, ResetButtonState> {
	state: Readonly<ResetButtonState> = { showToolTip: false };

	render(): React.ReactNode {
		return (
			<div>
				<button
					className='resetButton'
					onDoubleClick={() => {
						this.setState({ showToolTip: false });
						return this.props.resetState();
					}}
					onClick={() => {
						this.setState({ showToolTip: true });
					}}
				>
					Сброс
				</button>
				{this.state.showToolTip && <span className='resetButtonTooltip'>⇐ Двойной клик для сброса</span>}
			</div>
		);
	}
}

export default ResetButton;
