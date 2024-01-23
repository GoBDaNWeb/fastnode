import getUID from '@js/utils/getUID.js';

export default class Hub {
	constructor(__options = {}, __displacements = {}) {
		this.opts = {};
		Object.assign(this.opts, __options);
		this.displacements = {};

		this.getUID = new getUID();

		this.activeQueue = new Map();
		this.passiveQueue = new Map();

		this.currentActiveObject = '';

		this.storeQueue = new Map();

		this.num = this.counter();

		this.wards = {};

		this.wardsMap = new Map();
	}

	generateUID(prefix) {
		return this.getUID.generate(prefix);
	}
	ward(obj) {
		this.wardsMap.set(obj.uid, obj);
		this.wards[`${obj.uid}`] = {
			selfSelector: obj.selfSelector,
			...obj.statements,
			...obj.props
		};
	}

	dispose(action, target) {
		// Распорядиться, кто главней
		switch (action) {
			case 'work':
				this.wardsMap.forEach((componentObj, componentUID) => {
					componentObj.selfDismiss('work');
				});

				break;
			default:
				this.wardsMap.forEach((componentObj, componentUID) => {
					componentObj.selfDismiss();
				});
				this.passiveQueue.forEach((componentObj, componentUID) => {
					let a = this.wardsMap.get(componentUID);
					let b = this.wardsMap.get(this.currentActiveObject);
					this.wardsMap.get(componentUID).selfDismiss();
					if (a.props.displacementLevel < b.props.displacementLevel) {
						this.wardsMap.get(componentUID).selfDisplace();
					}
				});

				this.wardsMap.get(this.currentActiveObject).selfDisplace('work');
				this.wardsMap.get(this.currentActiveObject).selfDismiss('work');

				// }
				break;
		}
	}

	activate(obj) {
		this.currentActiveObject = obj.uid;
		if (this.activeQueue.size) {
			this.activeQueue.forEach((value, key) => {
				this.passiveQueue.set(key, value);
			});
		}
		this.activeQueue.set(obj.uid);

		let counter = 0;
		this.activeQueue.forEach((value, key) => {
			counter++;
			this.activeQueue.set(key, counter);
		});

		this.dispose();
	}
	deactivate(obj) {
		this.passiveQueue.clear();
		this.activeQueue.delete(obj.uid);

		if (this.activeQueue.size) {
			let counter = 0;
			this.activeQueue.forEach((value, key) => {
				counter++;
				this.activeQueue.set(key, counter);
			});
			this.activeQueue.forEach((value, key) => {
				if (value != this.activeQueue.size) {
					this.passiveQueue.set(key, value);
				}
				if (value == this.activeQueue.size) {
					this.currentActiveObject = key;
				}
			});
		} else {
			this.currentActiveObject = null;
			this.dispose('work');
		}
	}
	counter() {
		let i = 0;
		return function (to) {
			switch (to) {
				case '+':
					i++;
					break;
				case '-':
					i--;
					break;
			}
			return i;
		};
	}
}
