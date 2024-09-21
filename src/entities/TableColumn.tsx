export class TableColumn {
	name: string;
	anomalyType: string;
	charsPassed: string[];

	constructor(name: string, anomalyType: string) {
		this.name = name;
		this.anomalyType = anomalyType;
		this.charsPassed = [];
	}
}
