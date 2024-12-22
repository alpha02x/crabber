/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	plugins: [],
	darkMode: "selector",
	theme: {
		extend: {
			colors: {
				"eastern-blue": {
					50: "#f1f9fa",
					100: "#dceff1",
					200: "#bee0e3",
					300: "#91c9cf",
					400: "#5caab4",
					500: "#4597a3",
					600: "#397481",
					700: "#33606b",
					800: "#30515a",
					900: "#2c454d",
					950: "#192c33",
				},
			},
			keyframes: {
				fadein: {
					"0%": {
						opacity: 0,
					},
					"100%:": {
						opacity: 100,
					},
				},
			},
			animation: {
				fadein100: "fadein 100ms",
				fadein300: "fadein 300ms",
				fadein500: "fadein 500ms",
				fadein750: "fadein 7500ms",
				fadein1000: "fadein 1000ms",
			},
		},
	},
};
