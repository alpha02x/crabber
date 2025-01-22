export default class TableColumn {
	name: string;
	anomalyType: string;
	charsPassed: string[];
	drifterKilled: boolean = false;
	miniDrifterKilled: boolean = false;
	additionalRatKilled: boolean = false;
	capWaves: number | null | undefined = 0;

	constructor(name: string, anomalyType: string) {
		this.name = name;
		this.anomalyType = anomalyType;
		this.charsPassed = [];
	}
}
