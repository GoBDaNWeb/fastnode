const pixelperfect = () => {
	const d = document;
	const b = d.body;
	d.addEventListener('keydown', event => {
		// Переключение видимости фона
		// Вся страница
		if (event.altKey && event.code == 'KeyZ') {
			b.classList.toggle('dev--fldsgridbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyX') {
			b.classList.toggle('dev--formgridbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyC') {
			b.classList.toggle('dev--screengridbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyV') {
			b.classList.toggle('dev--contents-bg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyB') {
			b.classList.toggle('dev--places-bg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyN') {
			b.classList.toggle('dev--places-inner-bg');
			event.preventDefault();
		}
		//
		if (event.altKey && event.code == 'KeyM') {
			b.classList.toggle('dev--swiper-outline');
			event.preventDefault();
		}
		//
		if (event.altKey && event.code == 'KeyL') {
			b.classList.toggle('dev--navbar-outline');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyK') {
			b.classList.toggle('dev--navbar-bg');
			event.preventDefault();
		}

		//
		if (event.altKey && event.code == 'KeyA') {
			b.classList.toggle('dev--fldgrdbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyS') {
			b.classList.toggle('dev--fldgrd-slotbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyD') {
			b.classList.toggle('dev--fldgrd-textbg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyF') {
			b.classList.toggle('dev--fldgrd-textnodebg');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyG') {
			b.classList.toggle('dev--slots-bg');
			event.preventDefault();
		}
		//
		if (event.altKey && event.code == 'KeyQ') {
			b.classList.toggle('dev--overlayed');
			event.preventDefault();
		}
		// if ((event.code == 'KeyQ') && (event.altKey)) {
		// 	b.classList.toggle('dev--overlayed-b');
		// 	event.preventDefault();
		// }
		if (event.altKey && event.code == 'KeyA') {
			b.classList.toggle('dev--overlayed-1');
			event.preventDefault();
		}
		if (event.altKey && event.code == 'KeyS') {
			b.classList.toggle('dev--overlayed-2');
			event.preventDefault();
		}

		if (event.altKey && event.code == 'KeyW') {
			b.classList.remove('dev--overlayed');
			b.classList.remove('dev--overlayed-1');
			b.classList.remove('dev--overlayed-2');
			b.classList.remove('dev--overlayed-3');
			event.preventDefault();
		}

		// Блоки по отдельности
		if (event.code == 'KeyD' && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--overlayed-fullpage');
			event.preventDefault();
		}

		// Смещение фона по вертикали к нужному блоку
		if (event.code == 'Digit1' && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--overlayed-no-header');
			event.preventDefault();
		}

		// Смещение фона по вертикали к нужному блоку
		if (event.code == 'KeyG' && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--containers-highlighted');
			event.preventDefault();
		}

		// Обводка
		if (event.code == 'KeyB' && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--outlined');
			event.preventDefault();
		}
		// Обводка на разметку от js-плагинов
		if (event.code == 'KeyJ' && (event.ctrlKey || event.metaKey)) {
			b.classList.toggle('dev--js-ext-outlined');
			event.preventDefault();
		}

		if (event.code == 'KeyE' && (event.ctrlKey || event.metaKey)) {
			b.classList.remove('dev--outlined');
			b.classList.remove('dev--containers-highlighted');
			b.classList.remove('dev--overlayed-fullpage');
			b.classList.remove('dev--overlayed');
			b.classList.remove('dev--overlayed-no-header');
			event.preventDefault();
		}
	});
};

export default pixelperfect;
