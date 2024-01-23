export const metrics = {
	yandex: {
		id: '91084547',
		targets: {
			registration: 'registration',
			login: 'Login',
			contact: 'contact',
			message: 'Message',
			order: 'order',
			freetest: 'Free test',
			prolong: 'prolong'
		}
	},
	quora: {
		id: ''
	}
};
export const ymInit = () => {
	window.ym(metrics.yandex.id, 'init', {
		clickmap: false, // Отключил
		trackLinks: true,
		accurateTrackBounce: true,
		webvisor: false // Отключил
	});
};

export const ymTarget = ({ type = 'reachGoal', name }) => {
	console.log('ymTarget', type, name);
	window.ym(metrics.yandex.id, type, name);
};

export const metricCompleteRegistration = () => {
	ymTarget({ name: metrics.yandex.targets.registration });
	window.qp('track', 'CompleteRegistration');
};
export const metricCompleteLogin = () => {
	ymTarget({ name: metrics.yandex.targets.login });
};

export const metricSendContact = () => {
	// Форма связи в модалке на главной
	ymTarget({ name: metrics.yandex.targets.contact });
};
export const metricSendMessage = () => {
	// Форма связи внизу на главной
	ymTarget({ name: metrics.yandex.targets.message });
};
export const metricRequestOrder = () => {
	ymTarget({ name: metrics.yandex.targets.order }); // ?
};
export const metricRequestFreeTest = () => {
	// Форма связи внизу на главной
	ymTarget({ name: metrics.yandex.targets.freetest });
};
export const metricProlong = () => {
	ymTarget({ name: metrics.yandex.targets.prolong }); // ?
};
