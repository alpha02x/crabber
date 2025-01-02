import React from "react";
import { AppStateManagementContext } from "../AppStateManagementContext";

type ResetButtonState = {
	showToolTip: boolean;
};

export class ResetButton extends React.Component<{}, ResetButtonState> {
	static readonly contextType = AppStateManagementContext;
	declare context: React.ContextType<typeof AppStateManagementContext>

	state: Readonly<ResetButtonState> = { showToolTip: false };

	render(): React.ReactNode {
		return (
			<div className="col-start-1 col-end-1 row-start-2 row-end-3 flex flex-row flex-nowrap">
				<button
					className='p-0.5 px-2 w-fit rounded-lg shadow-md hover:shadow-lg cursor-pointer select-none bg-eastern-blue-200 dark:bg-eastern-blue-700 dark:text-zinc-200'
					onDoubleClick={() => {
						this.setState({ showToolTip: false });
						return this.context.resetState();
					}}
					onClick={() => {
						this.setState({ showToolTip: true });
					}}
				>
					Сброс
				</button>
				{this.state.showToolTip && <div className='ml-3 select-none text-sm pt-1 text-zinc-400 animate-fadein300'>⇐ Двойной клик для сброса</div>}
			</div>
		);
	}
}

export default ResetButton;
