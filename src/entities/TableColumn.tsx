import { AnomalyDefinitons } from "./Constants";

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

	getPrice(): number {
		let definition = AnomalyDefinitons.get(this.anomalyType);
		let result: number = 0;

		if (this.additionalRatKilled) result += definition?.priceWithAdditionalShips ?? 0;
		else result += definition?.basePrice ?? 0;

		if (this.drifterKilled) result += 300000000;
		return result;
	}
}
