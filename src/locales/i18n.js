import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';

import merge from 'lodash/merge';

import alertEN from '@locales/en/en.alert.json';
// ==================== English ====================
import _assistEN from '@locales/en/en.assist.json';
import _buttonEN from '@locales/en/en.button.json';
import commonEN from '@locales/en/en.common.json';
import elementsEN from '@locales/en/en.elements.json';
import _fieldEN from '@locales/en/en.field.json';
import _formEN from '@locales/en/en.form.json';
import headEN from '@locales/en/en.head.json';
//
import header_EN from '@locales/en/en.header.json';
import headingEN from '@locales/en/en.heading.json';
//
import screenEN from '@locales/en/en.screen.json';
import _validationEN from '@locales/en/en.validation.json';
// Home
import aboutEN from '@locales/en/home/en.about.json';
import featuresEN from '@locales/en/home/en.features.json';
import nodesEN from '@locales/en/home/en.nodes.json';
import productsEN from '@locales/en/home/en.products.json';
// Navigation
import breadcrumbs_EN from '@locales/en/nav/en.breadcrumbs.json';
import mainmenu_EN from '@locales/en/nav/en.mainmenu.json';
import schemebar_EN from '@locales/en/nav/en.schemebar.json';
import sidemenu_EN from '@locales/en/nav/en.sidemenu.json';
import tabbar_EN from '@locales/en/nav/en.tabbar.json';
//Nodes
import heroEn from '@locales/en/nodes/en.hero.json';
// Office
import office_EN from '@locales/en/office/en.office.json';

// ==================== Russian ====================
// ...пока нет...

// Office concats
const home_EN = merge(aboutEN, productsEN, nodesEN, featuresEN);
const nodes_En = merge(heroEn);
const navigations_EN = merge(schemebar_EN, mainmenu_EN, breadcrumbs_EN, sidemenu_EN, tabbar_EN);
const officeBoards_EN = merge(office_EN);
const controls_EN = merge(_buttonEN, _fieldEN, _assistEN, _formEN, _validationEN);
// Translations
const translationEN = merge(
	alertEN,
	header_EN,
	commonEN,
	elementsEN,
	controls_EN,
	screenEN,
	headEN,
	headingEN,
	home_EN,
	nodes_En,
	navigations_EN,
	officeBoards_EN
);

const resources = {
	en: {
		translation: translationEN
	},
	ru: {
		translation: translationEN
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false
	}
});

export default i18n;
