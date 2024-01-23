import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { setupStore } from '@redux/store';
import { setupListeners } from '@reduxjs/toolkit/query';

import Router from '@router/index';

import '@locales/i18n';

import { ymInit } from '@config/metrics';
import { recaptcha } from '@config/recaptcha';

localStorage.setItem('homeTitle', document.title);
/*  */
ymInit();
/*  */
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore();
setupListeners(store.dispatch);
root.render(
	<GoogleReCaptchaProvider reCaptchaKey={recaptcha.sitekey}>
		<Provider store={store}>
			<RouterProvider router={Router} />
		</Provider>
	</GoogleReCaptchaProvider>
);
