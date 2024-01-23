class SchemeHelper {
	constructor(options = {}) {
		this.$doc = document.documentElement;
		this.lightStyles = this.$doc.querySelectorAll(
			'link[rel=stylesheet][media*=prefers-color-scheme][media*=light]'
		);
		this.darkStyles = this.$doc.querySelectorAll(
			'link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]'
		);
		this.darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');

		this.currentScheme;
	}

	setupSwitcher = () => {
		const savedScheme = this.getSavedScheme() ?? 'auto';
		// const savedScheme = this.getSavedScheme();

		if (savedScheme !== null) {
			const currentRadio = this.$doc.querySelector(
				`.switcher__radio[value=${savedScheme}]`
			);
			if (!currentRadio) {
				return;
			} else {
				currentRadio.checked = true;
			}
		}
	};

	setupScheme = () => {
		const savedScheme = this.getSavedScheme();
		const systemScheme = this.getSystemScheme();
		if (savedScheme === null) return;
		if (savedScheme !== systemScheme) {
			this.setScheme(savedScheme);
		}
	};

	setScheme = scheme => {
		this.switchMedia(scheme);

		if (scheme === 'auto') {
			this.clearScheme();
		} else {
			this.saveScheme(scheme);
		}
	};

	switchMedia = scheme => {
		let lightMedia;
		let darkMedia;

		if (scheme === 'auto') {
			lightMedia = '(prefers-color-scheme: light)';
			darkMedia = '(prefers-color-scheme: dark)';
		} else {
			lightMedia = scheme === 'light' ? 'all' : 'not all';
			darkMedia = scheme === 'dark' ? 'all' : 'not all';
		}

		[...this.lightStyles].forEach(link => {
			link.media = lightMedia;
		});
		[...this.darkStyles].forEach(link => {
			link.media = darkMedia;
		});
	};

	getSystemScheme = () => {
		const darkScheme = this.darkSchemeMedia.matches;
		return darkScheme ? 'dark' : 'light';
	};
	getSavedScheme = () => {
		return localStorage.getItem('color-scheme');
	};
	saveScheme = scheme => {
		localStorage.setItem('color-scheme', scheme);
	};
	clearScheme = () => {
		localStorage.setItem('color-scheme', 'auto');
	};
	/*  */
	getCurrentScheme = () => {
		return localStorage.getItem('color-scheme') ?? 'auto';
	};
}

export default SchemeHelper;
