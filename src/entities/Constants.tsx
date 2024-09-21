type AnomalyMeta = {
	name: string;
	short: string;
};

export const AnomalyDefinitons: Map<string, AnomalyMeta> = new Map([
	["3FFS", { name: "C3 Fortification Frontier Stronghold", short: "3FFS-" }],
	["3OFS", { name: "C3 Outpost Frontier Stronghold", short: "3OFS-" }],
	["3SC", { name: "C3 Solar Cell ", short: "3SC-" }],
	["3OC", { name: "C3 The Oruze Construct", short: "3OC-" }],
	["5CG", { name: "C5 Core Garrison", short: ".CG-" }],
	["5CS", { name: "C5 Core Stronghold", short: ".ST-" }],
	["5OO", { name: "C5 Oruze Osobnyk", short: ".OO-" }],
	["5QA", { name: "C5 Quarantine Area", short: ".QA-" }],
]);
