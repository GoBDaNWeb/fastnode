import config from '@config';

export const TOKEN = 'fastnode';
export const API_URL = {
	MAIN: `${config.serverUrl.main}/`
};
export const ENDPOINTS = {
	CONTACT: `contact`,
	REGISTRATION: `user/new/basic`,
	LOGIN: `auth/basic`,
	USER_PROFILE: `user`,
	USER_PROFILE_UPDATE: `user/update`,
	PASSWORD_UPDATE: `user/update/password`,
	PASSWORD_FORGOT: `password/forgot`,
	NODE_CONFIGURATOR: `pricesdata`,
	DEDICATED_FREE: `request/freerun`,
	DEDICATED_NEW: `dedicated/new`,
	DEDICATED_PROLONG: `dedicated/prolong`,
	DEDICATED_STATS: `dedicated/stats`
};
export const LS_KEYS = {
	AUTH_ID: 'qq~e4r;kq12erkrt=231/3eer',
	AUTH_HASH: 'ert34ghjn>:5464fgnhkfjghn'
};
// /request/freerun
