import { createContext } from 'react';

export type StateManagementMethods = {
	addAnomaly: (type: string) => void;
	addChar: (char: string) => void;
	changeAddRat: (columnName: string) => void;
	changeDrifter: (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean) => void;
	changeCapWaves: (columnName: string, capWavesKilled: number) => void;
	disableDarkTheme: () => void;
	enableDarkTheme: () => void;
	removeCharFromTable: (charName: string) => void;
	removeColumn: (columnName: string) => void;
	resetState: () => void;
	setCharStatusForAnomaly: (charName: string, anomalyName: string, passed: boolean) => void;
	setPrecheck: (charName: string, anomalyName: string, passed: boolean) => void;
}

export const AppStateManagementContext = createContext<StateManagementMethods>({
	removeColumn: function (columnName: string): void {
		throw new Error('Function not implemented.');
	},
	changeDrifter: function (columnName: string, hasMiniDrifter: boolean, hasBigDrifter: boolean): void {
		throw new Error('Function not implemented.');
	},
	changeAddRat: function (columnName: string): void {
		throw new Error('Function not implemented.');
	},
	changeCapWaves: function (columnName: string, capWavesKilled: number): void {
		throw new Error('Function not implemented.');
	},
	addAnomaly: function (type: string): void {
		throw new Error('Function not implemented.');
	},
	removeCharFromTable: function (charName: string): void {
		throw new Error('Function not implemented.');
	},
	setCharStatusForAnomaly: function (charName: string, anomalyName: string, passed: boolean): void {
		throw new Error('Function not implemented.');
	},
	setPrecheck: function (charName: string, anomalyName: string, passed: boolean): void {
		throw new Error('Function not implemented.');
	},
	addChar: function (char: string): void {
		throw new Error('Function not implemented.');
	},
	resetState: function (): void {
		throw new Error('Function not implemented.');
	},
	enableDarkTheme: function (): void {
		throw new Error('Function not implemented.');
	},
	disableDarkTheme: function (): void {
		throw new Error('Function not implemented.');
	}
});
