/// <reference types="react/canary" />
import React from "react";
import AnomalyDefinitons, { AnomalyDefinition, WhClass } from "../../definitions/AnomalyDefinitons";
import { Translation } from "react-i18next";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { TFunction } from "i18next";
import RelicImg from "../../assets/relic_Site_16.png"
import DataImg from "../../assets/data_Site_16.png"
import CombatSiteImg from "../../assets/combatSite_16.png"
import BattleshipImg from "../../assets/battleship_32.png"
import numeral from "numeral";
import "./Tabs.css"

const c123 = "text-[#428bca]";
const c45 = "text-[#e28a0d]";
const c6 = "text-[#d9534f]";
const classes: [WhClass, string][] = [
	[WhClass.C5, c45],
	[WhClass.C6, c6],
	[WhClass.C3, c123],
	[WhClass.C4, c45],
];

type AnomalyAdditionControlProps = {
	addAnomaly: (type: string) => void;
};

export class AnomalyAdditionControl extends React.Component<AnomalyAdditionControlProps> {
	render(): React.ReactNode {
		return (
			<Translation>{t =>
				<div>
					<button id="add-btn" className="w-10 m-auto float-left rounded-lg font-normal my-2 dark:text-zinc-200" popoverTarget="anoms-pop">+</button>
					<div popover="auto" id="anoms-pop" className="w-96 p-2 pl-3 rounded-lg shadow-2xl bg-zinc-300">
						<Tabs>
							<TabList>
								{this.renderTabs()}
							</TabList>

							{this.renderPanels(t)}
						</Tabs>
					</div>
				</div>
			}</Translation>
		);
	}

	renderTabs(): React.ReactNode[] {
		return classes.map(c => {
			return <Tab key={`cl-${c[0]}`} className={`select-none px-4 pb-1 inline-block cursor-pointer ` + c[1]}>{WhClass[c[0]]}</Tab>;
		});
	}

	renderPanels(t: TFunction<"translation", undefined>): React.ReactNode[] {
		return classes.map(_class => {
			let definitons = Array.from(AnomalyDefinitons.entries());
			let greenAnoms = definitons.filter(x => x[1].whClasses.includes(_class[0]) && !x[1].relic && !x[1].data && !x[1].notAnom);
			let relics = definitons.filter(x => x[1].whClasses.includes(_class[0]) && x[1].relic);
			let datas = definitons.filter(x => x[1].whClasses.includes(_class[0]) && x[1].data);
			let additional = definitons.filter(x => x[1].whClasses.includes(_class[0]) && x[1].notAnom);

			return <TabPanel key={`pn-${_class}`} className="w-80 mt-1 font-normal rounded-xl">
				<div key="g-anoms" className="select-none mt-2">
					<div key="anoms-label" className="font-mono text-left">
						<img className="inline pb-0.5 pr-1 scale-75 invert" src={CombatSiteImg} alt=""></img>
						<span>{t("anomalies")}</span>
					</div>
					{greenAnoms.map(x => this.renderButton(x))}
				</div>

				{
					relics.length > 0
						? <div className="select-none mt-2" key="relics">
							<div key="relics-label" className="font-mono text-left">
								<img className="inline pb-0.5 pr-1 scale-75 invert" src={RelicImg} alt=""></img>
								<span>Relic</span>
							</div>
							{relics.map(x => this.renderButton(x))}
						</div>
						: null
				}

				{
					datas.length > 0
						? <div className="select-none mt-2" key="datas">
							<div key="datas-label" className="font-mono text-left">
								<img className="inline pb-0.5 pr-1 scale-75 invert" src={DataImg} alt=""></img>
								<span>Data</span>
							</div>
							{datas.map(x => this.renderButton(x))}
						</div>
						: null
				}

				{
					additional.length > 0
						? <div className="select-none mt-2" key="addtl">
							<div key="addtl-label" className="font-mono text-left">
								<img className="inline pb-0.5 pr-1 invert w-4 h-4" src={BattleshipImg} alt=""></img>
								<span>{t("other")}</span>
							</div>
							{additional.map(x => this.renderButton(x, t))}
						</div>
						: null
				}
			</TabPanel >;
		})
	}

	private renderButton(x: [string, AnomalyDefinition], translate?: TFunction<"translation", undefined>) {
		return <div className="px-1 py-0.5 mr-2 w-[23rem] flex flex-row flex-nowrap text-nowrap">
			<button
				key={x[0]}
				popoverTarget="anoms-pop"
				popoverTargetAction="hide"
				className="select-none mt-1 mr-3 p-0.5 pl-1 cursor-pointer text-left rounded-sm hover:bg-zinc-400 text-zinc-800 flex-1"
				onClick={() => this.props.addAnomaly(x[0])}
			>
				{
					translate ? translate(x[1].name) : x[1].name
				}
			</button>
			<span className="ml-1 pt-2 pr-2 text-right align-middle text-xs font-mono text-green-900">
				{numeral(x[1].basePrice).format('0a') + (x[1].hasAdditionalRats ? "+" : "")}
			</span>
		</div>;
	}
}
