import React from "react";
import i18n, { SupportedLanguages } from "../i18n";

export class LanguageSelector extends React.Component<{}, { lang: string }> {
	state = { lang: i18n.resolvedLanguage ?? "lang" };

	render() {
		return <button
			className="fixed bottom-1 right-8 cursor-pointer dark:text-zinc-200"
			onClick={this.handleClick.bind(this)}
		>
			{this.state.lang}
		</button>;
	}

	private async handleClick() {
		let currentLanguage = i18n.resolvedLanguage ?? i18n.languages[0];
		let nextLangIndex = (SupportedLanguages.indexOf(currentLanguage) + 1) % SupportedLanguages.length;
		let nextLang = SupportedLanguages[nextLangIndex];
		await i18n.changeLanguage(nextLang);
		this.setState({ lang: i18n.resolvedLanguage! });
	}
};
