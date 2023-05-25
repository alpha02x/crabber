export class TableColumn {
	name: string;
	anomalyType: string;
	charsPassed: string[];
	drifterKilled: boolean = false;
	additionalRatKilled: boolean = false;

	constructor(name: string, anomalyType: string) {
		this.name = name;
		this.anomalyType = anomalyType;
		this.charsPassed = [];
	}
}
