import React from "react";
import { AppStateManagementContext } from "../../AppStateManagementContext";

type ResetButtonState = {
	showToolTip: boolean;
};

export class ResetButton extends React.Component<{}, ResetButtonState> {
	static contextType = AppStateManagementContext;
	declare context: React.ContextType<typeof AppStateManagementContext>

	state: Readonly<ResetButtonState> = { showToolTip: false };

	render(): React.ReactNode {
		return (
			<div className="flex flex-row flex-nowrap mt-5 md-5 ml-2 sm:ml-5 2xl:ml-72">
				<div
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

				</div>
				{this.state.showToolTip && <div className='ml-3 select-none text-sm pt-1 text-zinc-400 animate-fadein300'>⇐ Двойной клик для сброса</div>}
			</div>
		);
	}
}

export default ResetButton;
