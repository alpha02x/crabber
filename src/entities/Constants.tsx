type AnomalyMeta = {
	name: string;
	short: string;
	basePrice: number;
	priceWithAdditionalShips: number;
	hasAdditionalRats: boolean;
	hasDrifter: boolean;
};

export const AnomalyDefinitons: Map<string, AnomalyMeta> = new Map([
	["5CG", { name: "C5 Core Garrison", short: ".CG-", basePrice: 253400000, priceWithAdditionalShips: 253400000, hasAdditionalRats: false, hasDrifter: true }],
	["5CS", { name: "C5 Core Stronghold", short: ".ST-", basePrice: 234900000, priceWithAdditionalShips: 234900000, hasAdditionalRats: false, hasDrifter: true }],
	["5OO", { name: "C5 Oruze Osobnyk", short: ".OO-", basePrice: 148800000, priceWithAdditionalShips: 164700000, hasAdditionalRats: true, hasDrifter: true }],
	["5QA", { name: "C5 Quarantine Area", short: ".QA-", basePrice: 146900000, priceWithAdditionalShips: 146900000, hasAdditionalRats: false, hasDrifter: true }],
	[
		"3FFS",
		{ name: "C3 Fortification Frontier Stronghold", short: "3FFS-", basePrice: 41000000, priceWithAdditionalShips: 41000000, hasAdditionalRats: false, hasDrifter: false },
	],
	["3OFS", { name: "C3 Outpost Frontier Stronghold", short: "3OFS-", basePrice: 45100000, priceWithAdditionalShips: 45100000, hasAdditionalRats: false, hasDrifter: false }],
	["3SC", { name: "C3 Solar Cell", short: "3SC-", basePrice: 47300000, priceWithAdditionalShips: 52300000, hasAdditionalRats: true, hasDrifter: false }],
	["3OC", { name: "C3 The Oruze Construct", short: "3OC-", basePrice: 41600000, priceWithAdditionalShips: 44500000, hasAdditionalRats: true, hasDrifter: false }],
]);
