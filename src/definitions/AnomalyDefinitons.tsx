type AnomalyDefinition = {
	name: string;
	short: string;
	block: string;
	basePrice: number;
	priceWithAdditionalShips: number;
	hasAdditionalRats: boolean;
	hasDrifter: boolean;
};

type Block = {
	text: string;
	color: string;
};

export const Blocks: Block[] = [
	{ text: "C5", color: "#e9fae6" },
	{ text: "C5 Data", color: "#faedf0" },
	{ text: "C5 Relic", color: "#edfafa" },
	{ text: "C3", color: "#faedf4" },
	{ text: "C3 Data", color: "#f5faed" },
	{ text: "C3 Relic", color: "#faf4ed" },
	{ text: "C6", color: "#edfafa" },
	{ text: "Другое", color: "white" },
];

const AnomalyDefinitons: Map<string, AnomalyDefinition> = new Map([
	[
		"5CG",
		{
			name: "Core Garrison",
			short: ".CG-",
			block: "C5",
			basePrice: 253400000,
			priceWithAdditionalShips: 253400000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"5CS",
		{
			name: "Core Stronghold",
			short: ".ST-",
			block: "C5",
			basePrice: 234900000,
			priceWithAdditionalShips: 234900000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"5OO",
		{
			name: "Oruze Osobnyk",
			short: ".OO-",
			block: "C5",
			basePrice: 148800000,
			priceWithAdditionalShips: 164700000,
			hasAdditionalRats: true,
			hasDrifter: true,
		},
	],
	[
		"5QA",
		{
			name: "Quarantine Area",
			short: ".QA-",
			block: "C5",
			basePrice: 146900000,
			priceWithAdditionalShips: 146900000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"3FFS",
		{
			name: "Fortification Frontier Stronghold",
			short: "3FFS-",
			block: "C3",
			basePrice: 41000000,
			priceWithAdditionalShips: 41000000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"3OFS",
		{
			name: "Outpost Frontier Stronghold",
			short: "3OFS-",
			block: "C3",
			basePrice: 45100000,
			priceWithAdditionalShips: 45100000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"3SC",
		{
			name: "Solar Cell",
			short: "3SC-",
			block: "C3",
			basePrice: 47300000,
			priceWithAdditionalShips: 52300000,
			hasAdditionalRats: true,
			hasDrifter: false,
		},
	],
	[
		"3OC",
		{
			name: "The Oruze Construct",
			short: "3OC-",
			block: "C3",
			basePrice: 41600000,
			priceWithAdditionalShips: 44500000,
			hasAdditionalRats: true,
			hasDrifter: false,
		},
	],
	[
		"3R-FFQO",
		{
			name: "Forgotten Frontier Quarantine Outpost",
			short: "3R-FFQO-",
			block: "C3 Relic",
			basePrice: 76500000,
			priceWithAdditionalShips: 76500000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"3R-FFRD",
		{
			name: "Forgotten Frontier Recursive Depot",
			short: "3R-FFRD-",
			block: "C3 Relic",
			basePrice: 92500000,
			priceWithAdditionalShips: 92500000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"3D-UFD",
		{
			name: "Unsecured Frontier Database",
			short: "3D-UFD-",
			block: "C3 Data",
			basePrice: 88400000,
			priceWithAdditionalShips: 88400000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"3D-UFR",
		{
			name: "Unsecured Frontier Receiver",
			short: "3D-UFR-",
			block: "C3 Data",
			basePrice: 75100000,
			priceWithAdditionalShips: 75100000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"Drifter",
		{
			name: "Дрифтер",
			short: "D-",
			block: "Другое",
			basePrice: 300000000,
			priceWithAdditionalShips: 300000000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"5CEW",
		{
			name: "Капдоресп C5",
			short: "5CEW-",
			block: "Другое",
			basePrice: 38700000,
			priceWithAdditionalShips: 38700000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"6CEW",
		{
			name: "Капдоресп C6",
			short: "6CEW-",
			block: "Другое",
			basePrice: 51600000,
			priceWithAdditionalShips: 51600000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"6CC",
		{
			name: "Core Citadel",
			short: ".CC-",
			block: "C6",
			basePrice: 310100000,
			priceWithAdditionalShips: 310100000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"6CB",
		{
			name: "Core Bastion",
			short: ".CB-",
			block: "C6",
			basePrice: 445600000,
			priceWithAdditionalShips: 445600000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"6SER",
		{
			name: "Strange Energy Readings",
			short: ".SER-",
			block: "C6",
			basePrice: 291800000,
			priceWithAdditionalShips: 291800000,
			hasAdditionalRats: false,
			hasDrifter: true,
		},
	],
	[
		"6TM",
		{
			name: "The Mirror",
			short: ".TM-",
			block: "C6",
			basePrice: 363200000,
			priceWithAdditionalShips: 363200000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"5R-FCDF",
		{
			name: "Forgotten Core Data Field",
			short: "5R-FCDF-",
			block: "C5 Relic",
			basePrice: 276200000,
			priceWithAdditionalShips: 276200000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
	[
		"5R-FCIP",
		{
			name: "Forgotten Core Information Pen",
			short: "5R-FCIP-",
			block: "C5 Relic",
			basePrice: 332900000,
			priceWithAdditionalShips: 348800000,
			hasAdditionalRats: true,
			hasDrifter: false,
		},
	],
	[
		"5D-UFER",
		{
			name: "Unsecured Frontier Enclave Relay",
			short: "5D-UFER-",
			block: "C5 Data",
			basePrice: 314000000,
			priceWithAdditionalShips: 329900000,
			hasAdditionalRats: true,
			hasDrifter: false,
		},
	],
	[
		"5D-UFSB",
		{
			name: "Unsecured Frontier Server Bank",
			short: "5D-UFSB-",
			block: "C5 Data",
			basePrice: 272100000,
			priceWithAdditionalShips: 272100000,
			hasAdditionalRats: false,
			hasDrifter: false,
		},
	],
]);

export default AnomalyDefinitons;
