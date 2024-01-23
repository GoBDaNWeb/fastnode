import isArray from 'lodash/isArray';
import mergeWith from 'lodash/mergeWith';

import PreparingComponent from '@js/classes/PreparingComponent.js';
import { hub } from '@js/interactive.app.js';

export default class NavigationBar {
	constructor(
		selfSelector,
		options = {},
		__trappingSettings = {},
		__classes = {}
	) {
		new PreparingComponent(this, selfSelector); // Находим this.$self и другое
		if (!this.$self) {
			console.warn(
				`NavigationBar: не существует элемента с селектором "${selfSelector}" на странице!`
			);
			return;
		}
		this.hub = hub; // ! Хаб
		this.moduleType = String(this.constructor.name).toLowerCase();
		this.uid = hub.generateUID(this.moduleType);
		hub.ward(this);

		this.props = {
			displacementLevel: 10 // ! Уровень вытесняемости, чем выше тем менее вытесняем
		};
		this.statements = {
			isFreeze: false,
			isShown: false
		};

		this._listeners = {
			toggle: this.togglerHandler.bind(this),
			esc: this.escHandler.bind(this),
			outside: this.outsideHandler.bind(this)
			// innerTrigger: this.innerTriggerHandler.bind(this),
		};

		this.opts = {
			documentElementRef: options.documentElementRef ?? document,
			selfElementRef: options.selfElementRef ?? this.$self,
			togglerRef: options.togglerRef ?? '',
			extraItems: options.extraItems ?? [],
			/*  */
			transformBreakpoint: options.transformBreakpoint ?? 992, // * Ширина для трансформации
			breakpointUnit: options.breakpointUnit ?? 'em',
			lockBodyScrollbar: options.lockBodyScrollbar ?? false,

			/*  */
			backdropEnable: options.backdropEnable ?? false,
			backdropAnimated: options.backdropAnimated ?? true,
			fixDelayed: options.fixDelayed ?? true,
			/*  */
			trappingInstance: options.trappingInstance ?? '',
			trappingEnable: options.trappingEnable ?? false, // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

			/*  */
			togglerClass: options.togglerClass ?? `${this._selfClass}__toggler`,
			/*  */
			closeOnClickMenuItem: options.closeOnClickMenuItem ?? false,
			_innerPointerEvent: options._innerPointerEvent ?? false,
			_innerPointerEventTag: options._innerPointerEventTag ?? 'span',
			preventDefaultOnClickMenuItem:
				options.preventDefaultOnClickMenuItem ?? false
			/*  */
		};
		Object.assign(this.opts, options);

		this.$bodyElement = this.opts.documentElementRef.body;

		this.fixProps = {
			mainstay: '.intro',
			fixContainer: '.header__layout',
			fixedClass: 'js-fixed-on',
			fixedDelayedClass: 'js-fixed-off'
		};
		this.__menuClassComputed = this.$self
			.querySelector('[class$="menu"]')
			.className.split(' ')[0];
		// this.__extraClassComputed = this.$self
		// 	.querySelector('[class$="extra"]')
		// 	.className.split(' ')[0];
		this._class = {
			navbar: __classes.navbarClass ?? this._selfClass,
			toggler: this.opts.togglerClass, // Класс переключателя берем из опций!
			nbHelper: __classes.nbHelperClass ?? `${this._selfClass}__helper`,
			nbLayout: __classes.nbLayoutClass ?? `${this._selfClass}__layout`,
			menu: __classes.menuClass ?? this.__menuClassComputed,
			mItems: __classes.mItemsClass ?? `${this.__menuClassComputed}__link`,
			extraItems: __classes.extraItemsClass ?? `${this._selfClass}__extra-link`,
			ctrlsWrp: __classes.ctrlsWrpClass ?? 'ctrls-wrap'
		};

		/* // !!! Формируем trapping объект : начало */
		function mergingCustomizer(objValue, srcValue) {
			if (isArray(objValue)) {
				return objValue.concat(srcValue);
			}
		}
		// if (this.opts.trappingEnable) {}
		this._trappingSettingsDefault = {
			[this._selfClass]: {
				// Дефолтные значения для trapping'а
				domSelector: `.${this._selfClass}`,
				tabSelectors: [
					`.${this._class.mItems}`,
					'button',
					'input',
					'label',
					'a',
					'[tabindex]'
				]
			}
		};
		this.__temp = {
			[this._selfClass]: { ...__trappingSettings }
		};

		this._trappingSettings = mergeWith(
			this._trappingSettingsDefault,
			this.__temp,
			mergingCustomizer
		);

		/* // !!!  Формируем trapping объект : конец */

		if (this.opts.breakpointUnit === 'em') {
			this.desktopMinBP = `${
				(parseFloat(this.opts.transformBreakpoint).toFixed(4) - 0) / 16
			}em`;
			this.mobileMaxBP = `${
				(parseFloat(this.opts.transformBreakpoint).toFixed(4) - 1) / 16
			}em`;
		} else {
			this.desktopMinBP = `${
				parseFloat(this.opts.transformBreakpoint).toFixed(4) - 0
			}px`;
			this.mobileMaxBP = `${
				parseFloat(this.opts.transformBreakpoint).toFixed(4) - 1
			}px`;
		}

		this.$toggler = this.opts.togglerRef;
		// this.$toggler =
		// 	this.$self.getElementsByClassName(this._class.toggler)[0] ??
		// 	this.$bodyElement.getElementsByClassName(this._class.toggler)[0];
		this.$nbHelper = this.$self?.getElementsByClassName(
			this._class.nbHelper
		)[0];
		this.$nbLayout = this.$self?.getElementsByClassName(
			this._class.nbLayout
		)[0];
		this.$ctrlsWrp = this.$self?.getElementsByClassName(
			this._class.ctrlsWrp
		)[0];
		this.$menu = this.$self?.getElementsByClassName(this._class.menu)[0];
		this.$mItems = this.$menu?.getElementsByClassName(this._class.mItems);
		this.$extraItems = this.$self?.getElementsByClassName(
			this._class.extraItems
		);
		this.$mItemsArr = this.$mItems ? Array.from(this.$mItems) : [];
		this.$extraItemsArr = this.$extraItems ? Array.from(this.$extraItems) : [];
		this.$recievedExtraItemsArr = this.opts.extraItems
			? Array.from(this.opts.extraItems)
			: [];
		this.$closableItems =
			this.$recievedExtraItemsArr.length > 0
				? [...this.$mItemsArr, ...this.$recievedExtraItemsArr]
				: this.$mItemsArr;

		this.desktopStartMQ = window.matchMedia(
			'(min-width: ' + this.desktopMinBP + ')'
		);
		this.mobileStopMQ = window.matchMedia(
			'(max-width: ' + this.mobileMaxBP + ')'
		);

		this._toggler = {
			isEnabled: true,
			isVisible: undefined,
			isActive: false,
			stateClass: {
				active: 'is-active',
				visible: 'is-visible',
				enabled: 'is-enabled'
			}
		};
		this._navbar = {
			isMobile: undefined,
			isDesktop: undefined,
			isExpanded: undefined,
			isVisible: undefined,
			stateClass: {
				visible: 'is-visible',
				expanded: 'is-expanded',
				needTrapping: 'is-need-trapping',
				desktop: 'is-desktop'
			}
		};
		this._pagebody = {
			stateClass: {
				locked: 'is-locked'
			}
		};

		this.trapping = {};
		this.$ = {};

		// this.init();
		// this.listen();
		this.getIsNeedTrapping = this.isNeedTrapping.bind(this);
		this.getIsDesktop = this.isDesktop.bind(this);
		this.trapFocusPrepare();
	}
	trapFocusPrepare() {
		// if (this.getIsNeedTrapping()) {
		const a = this._trappingSettings['navbar']['tabSelectors'].join(', ');
		this.$innerObjects = this.$self.querySelectorAll(a);
		const startCls = `${this._selfClass}__tabhelper-start`;
		const endCls = `${this._selfClass}__tabhelper-end`;
		const endNextCls = `${this._selfClass}__tabhelper-endnext`;
		this.helperStart;
		this.helperEnd;
		this.helperEndNext;
		if (document.body.querySelectorAll(`.${startCls}`).length === 0) {
			this.helperStart = document.createElement('div');
			this.helperStart.className = startCls;
			this.helperStart.tabIndex = 0;
			this.$self.insertAdjacentElement('afterBegin', this.helperStart);
		}
		if (document.body.querySelectorAll(`.${endCls}`).length === 0) {
			this.helperEnd = document.createElement('div');
			this.helperEnd.className = endCls;
			this.helperEnd.tabIndex = 0;
			this.$self.insertAdjacentElement('beforeEnd', this.helperEnd);
		}
		if (document.body.querySelectorAll(`.${endNextCls}`).length === 0) {
			this.helperEndNext = document.createElement('div');
			this.helperEndNext.className = endNextCls;
			this.helperEndNext.tabIndex = 0;
			this.$self.insertAdjacentElement('afterEnd', this.helperEndNext);
		}
		this.$helperStart = this.$self.getElementsByClassName(startCls)[0];
		this.$helperEnd = this.$self.getElementsByClassName(endCls)[0];
		this.$helperEndNext = this.$self.getElementsByClassName(endNextCls)[0];
		return {
			nodelist: this.$innerObjects,
			start: this.$helperStart,
			end: this.$helperEnd,
			endNext: this.$helperEndNext
			// ! $helperEndNext Пока не использовал
			// TODO планировал использовать для перемещения фокуса на внешний элемент после закрытия navbar'a
		};
		// }
	}
	trapFocusBegin({ payed }) {
		if (!this.getIsNeedTrapping()) return;
		this.$innerObjects.forEach(item => {
			item.tabIndex = 0;
		});
		const _nodelist = payed ?? this.$innerObjects;
		_nodelist[1].focus();
	}
	trapFocus({ payed, start, end, endNext }) {
		if (!this.getIsNeedTrapping()) return;
		const _nodelist = payed ?? this.$innerObjects;
		// if (this.getIsNeedTrapping()) {
		if (document.activeElement === start) {
			_nodelist[1].focus();
		}
		if (document.activeElement === end) {
			_nodelist[1].focus();
		}
		// }
	}
	trapFocusEnd({ payed, start, end, endNext }) {
		// if (!this.getIsNeedTrapping()) return;
		// const _nodelist = payed ?? this.$innerObjects;
		// if (!this.getIsNeedTrapping()) {
		const _nodelist = payed ?? this.$innerObjects;
		_nodelist.forEach(item => {
			item.tabIndex = -1;
		});
		// }
	}
	trapFocusReset({ payed, start, end, endNext }) {
		const _nodelist = payed ?? this.$innerObjects;
		_nodelist.forEach(item => {
			item.tabIndex = 0;
		});
	}

	init() {
		if (this.opts.trappingEnable) {
			this.trapping = this.opts.trappingInstance;
			// ??
			// new Trapping({
			// 	regions: this._trappingSettings,
			// 	selfElementRef: this.opts.selfElementRef,
			// 	documentElementRef: this.opts.documentElementRef
			// });
		}
		// !!! Backdrop
		// if (this.opts.backdropEnable) {
		// 	this.$.backdrop = new Backdrop({
		// 		mainstay: '.navbar',
		// 		animated: this.opts.backdropAnimated
		// 	});
		// }
		this.render();
		// this.computeZIndex(); // !!!!!!!!!!!!!!!

		this.$self.style.zIndex = this.props.zIndex;
		this.$nbHelper.style.zIndex = this.props.zIndex + 1;
		this.$toggler.closest('.ctrls-wrap').style.zIndex = this.props.zIndex + 2;

		if (this.opts.closeOnClickMenuItem) {
			this.$self.addEventListener('click', e => {
				if (e.target.classList.contains(this._class.extraItems)) {
					this.togglerHandler();
				}
			});
			this.$mItemsArr.map(item => {
				if (!item) return;
				item.addEventListener('click', e => {
					if (this.opts.preventDefaultOnClickMenuItem) {
						e.preventDefault();
					}
					if (this.opts._innerPointerEvent) {
						// Ловим клик внутри пункта меню на тэге, указанном в опциях
						// (чтобы исключить реакцию на нажатие на декоративные элементы)
						if (
							e.target.tagName ==
							String(this.opts._innerPointerEventTag).toUpperCase()
						) {
							this.togglerHandler();
						} else {
							return false;
						}
					} else {
						this.togglerHandler();
					}
				});
				item.addEventListener('keydown', e => {
					if (e.code == 'Space' || e.code == 'Enter') {
						if (this.opts.preventDefaultOnClickMenuItem) {
							e.preventDefault();
						}
						if (e.code == 'Space') {
							e.preventDefault();
							e.target.click();
						}
						this.togglerHandler();
					}
				});
			});
		}
	}

	listen() {
		if (window.matchMedia && window.matchMedia('all').addListener) {
			// Работаем в safari < 13
			this.mobileStopMQ.addListener(this.render.bind(this));
		} else {
			// Работаем в остальных браузерах
			this.mobileStopMQ.addEventListener('change', this.render.bind(this));
		}
	}
	render() {
		this.setStates();
		this.drawHTML();
		this.backdropHandler();
		this.refreshBindingHandlers();
	}
	setStates() {
		this._navbar.isDesktop = this.desktopStartMQ.matches ? true : false;
		this._navbar.isMobile = this.mobileStopMQ.matches ? true : false;
		this._navbar.isVisible = this.desktopStartMQ.matches ? true : false; // Состояние видимости для навбара
		this._toggler.isVisible = this.desktopStartMQ.matches ? false : true; // Состояние видимости для тоглера
	}
	drawHTML() {
		this.drawClasses();
		this.drawA11y();
	}
	refreshBindingHandlers() {
		if (this.statements.isFreeze) return; // Если заморжен, то ничего не делаем, иначе:
		switch (this._navbar.isMobile) {
			case true:
				this.handlers('add', 'esc');
				this.handlers('add', 'toggle');
				break;
			case false:
				this.handlers('remove', 'esc');
				this.handlers('remove', 'toggle');
				break;
		}
	}
	drawClasses() {
		if (this._toggler.isVisible) {
			this.$toggler.classList.add(this._toggler.stateClass.visible);
		} else {
			this.$toggler.classList.remove(this._toggler.stateClass.visible);
		}
		if (this._toggler.isActive) {
			this.$toggler.classList.add(this._toggler.stateClass.active);
		} else {
			this.$toggler.classList.remove(this._toggler.stateClass.active);
		}
		if (this._navbar.isExpanded) {
			this.$self.classList.add(this._navbar.stateClass.expanded);
		} else {
			this.$self.classList.remove(this._navbar.stateClass.expanded);
		}
		// if (this.opts.trappingEnable) {
		if (this._navbar.isMobile && this._navbar.isExpanded) {
			this.$self.classList.add(this._navbar.stateClass.needTrapping); // !!!!!
		} else {
			this.$self.classList.remove(this._navbar.stateClass.needTrapping);
		}
		if (this._navbar.isDesktop) {
			this.$self.classList.add(this._navbar.stateClass.desktop); // !!!!!
		} else {
			this.$self.classList.remove(this._navbar.stateClass.desktop); // !!!!!
		}
		// }
		if (this.opts.lockBodyScrollbar) {
			if (this._navbar.isMobile && this._navbar.isExpanded) {
				this.$bodyElement.classList.add(this._pagebody.stateClass.locked);
			} else {
				this.$bodyElement.classList.remove(this._pagebody.stateClass.locked);
			}
		}
	}
	drawA11y() {
		/*  */
		if (this.opts.trappingEnable) {
			if (!this._navbar.isDesktop) {
				// ! Если НЕ "статично"
				if (this._navbar.isExpanded) {
					this.trapping.disableBody();
					this.trapping.enableOf(this._selfClass);
					this.$toggler.tabIndex = 0;
				} else {
					this.trapping.disableOf(this._selfClass);
					this.trapping.reset();

					this.$toggler.tabIndex = 0;
				}
			} else {
				this.trapping.reset();
				this.$toggler.tabIndex = -1;
			}
		}
	}
	/* Методы для хаба : начало */
	selfDismiss(state) {
		// Отключение определенного функционала модуля, НЕ относящегося к видимости
		switch (state) {
			case 'work':
				if (!this._navbar.isMobile) {
					return;
				}

				if (this.opts.trappingEnable) {
					this.trapping.enableOf(this._selfClass);
				}
				this.statements.isFreeze = false;
				this.handlers('remove', 'esc');
				this.handlers('add', 'esc');
				break;
			// case 'leave':
			default: // !
				if (!this._navbar.isMobile) {
					return;
				}

				if (this.opts.trappingEnable) {
					this.trapping.reset(); // !
					this.trapping.disableOf(this._selfClass); // !
				}
				this.statements.isFreeze = true;
				this.handlers('remove', 'esc');
				break;
		}
	}
	selfDisplace(state) {
		// Отключение видимости модуля (или перемещение)
		switch (state) {
			case 'work':
				if (!this._navbar.isMobile) {
					return;
				}
				this.show();
				break;
			default:
				if (!this._navbar.isMobile) {
					return;
				}
				this.hide();
				break;
		}
	}
	/* Методы для хаба : конец */

	togglerHandler() {
		if (this._toggler.isVisible && this._toggler.isEnabled) {
			this._toggler.isActive = this._toggler.isActive ? false : true;
		}
		if (!this._navbar.isDesktop) {
			// Если меню !НЕ "статично"
			this._navbar.isExpanded = this._navbar.isExpanded ? false : true;
			this.statements.isShown = this._navbar.isExpanded;
			this.hubHandler();
			if (this.statements.isShown) {
				setTimeout(() => {
					this.handlers('add', 'outside');
				}, 10);
			} else {
				this.handlers('remove', 'outside');
			}
		}

		this.drawHTML();
	}
	hide() {
		if (!this._navbar.isExpanded) return;
		this.togglerHandler();
	}
	show() {
		if (this._navbar.isExpanded) return;
		this.togglerHandler();
	}
	hubHandler() {
		if (this.statements.isShown) {
			this.hub.activate(this);
		} else {
			this.hub.deactivate(this);
		}
		this.backdropHandler();
	}
	backdropHandler() {
		if (this.opts.backdropEnable) {
			if (this._navbar.isMobile && this._navbar.isExpanded) {
				this.$.backdrop.show();
			} else {
				this.$.backdrop.hide();
			}
		}
	}
	handlers(action, type) {
		switch (action) {
			case 'remove':
				switch (type) {
					case 'esc':
						this.$bodyElement.removeEventListener(
							'keydown',
							this._listeners.esc
						);
						break;
					case 'outside':
						this.$bodyElement.removeEventListener(
							'click',
							this._listeners.outside
						);
						break;
					case 'toggle':
						this.$toggler.removeEventListener('click', this._listeners.toggle);
						break;
				}
				break;
			default:
				switch (type) {
					case 'esc':
						this.$bodyElement.addEventListener('keydown', this._listeners.esc);
						break;
					case 'outside':
						this.$bodyElement.addEventListener(
							'click',
							this._listeners.outside
						);
						break;
					case 'toggle':
						this.$toggler.addEventListener('click', this._listeners.toggle);
						break;
				}
				break;
		}
	}
	escHandler(e) {
		if (e.code == 'Escape') {
			this.togglerHandler();
		}
	}
	outsideHandler(e) {
		if (!this.statements.isShown) {
			return;
		}
		if (e.target.closest('.' + this._class.nbLayout)) {
			return;
		} else {
			this.hide();
			this.handlers('remove', 'outside');
		}
	}

	isNeedTrapping(self) {
		const _self = self ?? this.$self;
		return _self.classList.contains(this._navbar.stateClass.needTrapping);
	}
	isDesktop(self) {
		const _self = self ?? this.$self;
		return _self.classList.contains(this._navbar.stateClass.desktop);
	}

	computeZIndex() {
		// Вычисляем z-index
		let highestZIndex = 0;
		let allElements = this.$bodyElement.getElementsByTagName('*');
		for (let i = 0; i < allElements.length - 1; i++) {
			let currentZIndex = parseInt(
				window.getComputedStyle(allElements[i]).zIndex
			);
			if (currentZIndex > highestZIndex) {
				highestZIndex = currentZIndex;
			}
		}
		this.props.zIndex = highestZIndex;
		return highestZIndex + 2;
	}
}
