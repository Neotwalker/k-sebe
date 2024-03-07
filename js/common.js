"use strict";

document.addEventListener("DOMContentLoaded", () => {

	const fio = document.querySelector('input[name="fio"]');
	if (fio){
		fio.addEventListener('keyup', function() {
			this.value = this.value.replace(/http|www|.ru|.com|[0-9]/g, '');
		});
	}

	let element3 = document.querySelector('.wpcf7-tel');
	if (element3) {
		let maskOptions3 = {
				mask: '+7-(000)-000-00-00',
				lazy: false
		} 
		let mask3 = new IMask(element3, maskOptions3);
	}

	let resetButtons = document.querySelectorAll('.filter--reset');
	resetButtons.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let form = button.closest('form');
			form.reset();
		});
	});

	let liked = document.querySelectorAll('.catalog--psychologists__item--like');
	liked.forEach(like => {
		like.addEventListener('click', () => {
			like.classList.toggle('active');
		});
	});

	const filterButton = document.querySelector('.catalog--psychologists__filterButton');
	if(filterButton) {
		filterButton.addEventListener('click', () => {
			const filter = document.querySelector('.catalog--psychologists__filter');
			filter.classList.toggle('active');
		});
	}

	// Находим все кнопки "Смотреть все"
	const showAllButtons = document.querySelectorAll('.catalog--psychologists__item--specializations__all');
	// Находим все блоки "catalog--psychologists__item"
	const psychologistItems = document.querySelectorAll('.catalog--psychologists__item');
	// Обходим каждый блок
	psychologistItems.forEach(item => {
		// Находим все элементы "catalog--psychologists__item--specializations__item"
		const specializationItems = item.querySelectorAll('.catalog--psychologists__item--specializations__item');
		// Если элементов меньше четырех, скрываем кнопку "Смотреть все"
		if (specializationItems.length < 4) {
			const showAllButton = item.querySelector('.catalog--psychologists__item--specializations__all');
			if (showAllButton) {
				showAllButton.style.display = 'none';
			}
		}
	});
	// Обходим каждую кнопку "Смотреть все"
	showAllButtons.forEach(button => {
		// Назначаем обработчик события на клик
		button.addEventListener('click', () => {
			// Находим родительский блок "catalog--psychologists__item"
			const parentItem = button.closest('.catalog--psychologists__item');
			// Находим все скрытые блоки "catalog--psychologists__item--specializations__item"
			const hiddenItems = parentItem.querySelectorAll('.catalog--psychologists__item--specializations__item:not(:nth-child(-n+3))');
			// Перебираем скрытые блоки и добавляем им стиль display:flex
			hiddenItems.forEach(item => {
				item.style.display = 'flex';
			});
			// Скрываем кнопку после нажатия
			button.style.display = 'none';
		});
	});

	const buttons = document.querySelectorAll('.catalog--categories__buttons .button');
	const categories = document.querySelectorAll('.catalog--categories__item');
	buttons.forEach(button => {
			button.addEventListener('click', function() {
				const dataType = this.getAttribute('data-type');

				// Удаление класса active у всех кнопок
				buttons.forEach(btn => {
					btn.classList.remove('active');
				});

				// Добавление класса active к нажатой кнопке
				this.classList.add('active');

				// Удаление класса active у всех категорий
				categories.forEach(category => {
					category.classList.remove('active');
				});

				// Добавление класса active к категории с соответствующим data-category
				const activeCategory = document.querySelector(`.catalog--categories__item[data-category="${dataType}"]`);
				if (activeCategory) {
					activeCategory.classList.add('active');
				}
		});
	});
	
	const splideReviews = document.querySelector('.splide--reviews');
	if (splideReviews){
		const splide = new Splide( '.splide--reviews', {
			type: 'slide',
			gap: '24px',
			perPage: 3,
			breakpoints: {
				901: {
					perPage: 2,
				},
				650: {
					perPage: 1,
				},
				481: {
					perPage: 1,
					arrows: false,
					fixedWidth: '282px'
				}
			}
		});

		splide.mount();
	}

	const splideArticles = document.querySelector('.splide--articles');
	if (splideArticles){
		const splide = new Splide( '.splide--articles', {
			type: 'slide',
			gap: '24px',
			perPage: 3,
			breakpoints: {
				901: {
					perPage: 2,
				},
				650: {
					perPage: 1,
				},
				481: {
					perPage: 1,
					arrows: false,
					autoWidth: true,
				}
			}
		});

		splide.mount();
	}

	document.querySelectorAll('.splide--avatar').forEach(splideAvatar => {
		const splide = new Splide(splideAvatar, {
			type: 'loop',
			perPage: 1,
		});

		splide.mount();
	});

	document.querySelectorAll('.splide--video').forEach(splideVideo => {
		const splide = new Splide(splideVideo, {
			type: 'slide',
			perPage: 1,
		});

		splide.mount();
	});

	const smoothHeight = (itemSelector, buttonSelector, contentSelector) => {
		const items = document.querySelectorAll(itemSelector);
	
		if (!items.length) return;
	
		items.forEach(el => {
			const button = el.querySelector(buttonSelector);
			const content = el.querySelector(contentSelector);
	
			if (el.dataset.open === 'true') { // проверяем значение data-атрибута open у элемента
				button.classList.add('active') // добавляем класс 'active' в элемент
				content.style.maxHeight = `${content.scrollHeight}px` // устанавливаем высоту блока с контентом
			}
	
			button.addEventListener('click', () => {
				if (el.dataset.open !== 'true') {
					el.dataset.open = 'true';
					button.classList.add('active');
					content.style.maxHeight = `${content.scrollHeight}px`;
				} else {
					el.dataset.open = 'false';
					button.classList.remove('active');
					content.style.maxHeight = '';
				}
			})
	
			const onResize = () => {
				if (el.dataset.open === 'true') {
					if (parseInt(content.style.maxHeight) !== content.scrollHeight) {
						content.style.maxHeight = `${content.scrollHeight}px`;
					}
				}
			}
	
			window.addEventListener('resize', onResize);
		})
	}
	smoothHeight('.main--faq__item', '.main--faq__item--button', '.main--faq__item--answer') // вызываем основную функцию smoothHeight и передаем в качестве параметров  необходимые селекторы

	Fancybox.bind("[data-fancybox]", {
		// Your custom options
	});


	const burgerMenu = document.querySelector('.header--burger');
	const menu = document.querySelector('.header--block');
	burgerMenu.addEventListener('click', () => {
		menu.classList.toggle('active');
		burgerMenu.classList.toggle('active');
		if (menu.classList.contains('active')) {
			menu.style.maxHeight = menu.scrollHeight + 'px';
		} else {
			menu.style.maxHeight = null;
		}
	});

	const videoButtons = document.querySelectorAll('.catalog--psychologists__item--video');
	function attachVideoButtonListeners(button) {
		button.addEventListener('click', () => {
			const popupVideos = button.nextElementSibling;
			popupVideos.classList.add('active');
			document.querySelector('html').classList.add('overflow');
		});
	}
	videoButtons.forEach(button => {
		attachVideoButtonListeners(button);
	});

	let customStopVideo = () => { 
		var iframe = document.querySelectorAll('iframe');
		Array.prototype.forEach.call(iframe, iframe => { 
			iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', 
		func: 'stopVideo' }), '*');
	 });
	}

	const buttonApplication = document.querySelectorAll('.button--application');
	buttonApplication.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modal = document.querySelector('.modal--application');
			modal.classList.add('active');
			document.querySelector('html').classList.add('overflow');
		});
	});

	const buttonLogin = document.querySelectorAll('.header--logIn .button');
	buttonLogin.forEach(button => {
		button.addEventListener('click', (e) => {
			e.preventDefault();
			const modal = document.querySelector('.modal--login');
			modal.classList.add('active');
			document.querySelector('html').classList.add('overflow');
		});
	});

	let modalClose = document.querySelectorAll(".modal--close");
	modalClose.forEach(close => {
		close.addEventListener('click', () => {
			const modal = close.closest('.modal');
			// Проверяем, есть ли у модального окна класс active
			if (modal.classList.contains('active')) {
				customStopVideo();
				// Скрываем модальное окно
				modal.classList.remove('active');
				document.querySelector('html').classList.remove('overflow');
			}
		});
	});

	if (localStorage.getItem('modalShown') !== 'true') {
		let modalSpam = document.querySelector('.modal--cookie');
		modalSpam.style.opacity = '1';
		modalSpam.style.zIndex = '9999999';

		let modalButton = document.querySelector('.modal--cookie__close');
		modalButton.addEventListener('click', () => {
				modalSpam.style.opacity = '0';
				modalSpam.style.zIndex = '-1';
				localStorage.setItem('modalShown', 'true');
		});
	}

	document.addEventListener("click", (event) => {
		if (menu.classList.contains('active')) {
			if (!event.target.closest('.header--burger') && !event.target.closest('.header--block') && !event.target.closest('.modal--login') && !event.target.closest('.modal--login .modal--wrapper') && !event.target.closest('.modal--login .modal--close')) {
				burgerMenu.classList.remove('active');
				menu.classList.remove('active');
				menu.style.maxHeight = null;
			}
		}
		videoButtons.forEach(button => {
			const popupVideos = button.nextElementSibling;
			if (popupVideos.classList.contains('active')) {
				if (!event.target.closest('.catalog--psychologists__item--video') && !event.target.closest('.modal--wrapper') && !event.target.closest('.modal--close')) {
					popupVideos.classList.remove('active');
					document.querySelector('html').classList.remove('overflow');
				}
			}
		});

		const modal = document.querySelector('.modal--application');
		if (modal){
			if (modal.classList.contains('active')) {
				if (!event.target.closest('.button--application') && !event.target.closest('.modal--application .modal--wrapper') && !event.target.closest('.modal--application .modal--close')) {
					modal.classList.remove('active');
					document.querySelector('html').classList.remove('overflow');
				}
			}
		}

		const modal1 = document.querySelector('.modal--login');
		if (modal1){
			if (modal1.classList.contains('active')) {
				if (!event.target.closest('.header--logIn .button') && !event.target.closest('.modal--login .modal--wrapper') && !event.target.closest('.modal--login .modal--close')) {
					modal1.classList.remove('active');
					document.querySelector('html').classList.remove('overflow');
				}
			}
		}
	});

});
