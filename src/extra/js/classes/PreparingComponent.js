import { v4 as uuidv4 } from 'uuid';

export default class PreparingComponent {
	constructor(ctx, componentSelector, options = {}) {
		if (typeof componentSelector === 'string' && componentSelector.length > 1) {
			// Можно добавить полную валидацию селектора
			if (componentSelector.includes('.')) {
				ctx._selfClass = componentSelector.replace(/\./g, '');
				ctx.$self = document.getElementsByClassName(ctx._selfClass)[0];
				ctx.selfSelector = componentSelector;
			}
			if (componentSelector.includes('#')) {
				ctx._selfId = componentSelector.replace(/#/g, '');
				let $self = document.getElementById(ctx._selfId);
				if ($self) {
					ctx._selfClass = $self.className.replace(/\./g, '');
					ctx.$self = $self;
					ctx.selfSelector = componentSelector;
				}
			}
			if (
				!componentSelector.includes('#') &&
				!componentSelector.includes('.')
			) {
				let $self = document.querySelectorAll(componentSelector);
				if ($self) {
					ctx.$self = $self;
					ctx.selfSelector = componentSelector;
				}
			}
			ctx._selfSelectorValue =
				ctx._selfClass ?? ctx._selfId ?? ctx.selfSelector;
		} else if (typeof componentSelector === 'object') {
			// if (componentSelector.nodeType == undefined) {
			// 	console.warn(
			// 		`Указанный объект для модуля ${ctx} не является DOM-узлом! componentSelector = ${componentSelector}`
			// 	);
			// 	return;
			// }
			ctx.$self = componentSelector;

			ctx._selfClass = componentSelector.className.split(' ')[0];
			if (options.idGeneration) {
				if (!componentSelector.id) {
					ctx._selfId = `${ctx._selfClass}--${uuidv4()}`;
					ctx.$self.id = ctx._selfId;
				} else {
					ctx._selfId = componentSelector.id;
				}
			}
			ctx.selfSelector = ctx._selfClass;
		} else {
			console.warn(
				`Неправильный селектор для модуля ${ctx}! componentSelector = ${componentSelector}`
			);
		}
	}
}
