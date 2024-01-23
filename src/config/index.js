import packageJson from '@package.json';

const config = {
	manualDevMode: false, // ! true - для авто вставки тестовых данных в поля форм (логина и регистрации)
	siteName: packageJson.name,
	mode: import.meta.env.MODE,
	dev: import.meta.env.DEV,
	prod: import.meta.env.PROD,
	clientUrl:
		import.meta.env.DEV === true
			? import.meta.env.VITE_CLIENT_DEV_URL
			: import.meta.env.VITE_CLIENT_URL,
	serverUrl: {
		main: import.meta.env.VITE_SERVER_URL
	},
	baseUrl: import.meta.env.BASE_URL
};
export default config;
