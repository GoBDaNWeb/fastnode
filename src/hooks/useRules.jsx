import { pattern } from '@config/validation.patterns';

import { useTranslation } from 'react-i18next';

const useRules = name => {
	const { t } = useTranslation();

	const rules = {
		limit: {
			required: {
				value: true,
				message: t('validation.required')
			},
			pattern: {
				value: pattern.positiveIntegerPattern,
				message: t('validation.limit')
			},
			minLength: {
				value: 1,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 1 })
				})
			}
		},
		full_name: {
			required: {
				value: true,
				message: t('validation.required')
			},
			minLength: {
				value: 4,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 4 })
				})
			},
			pattern: {
				value: pattern.name,
				message: t('validation.name')
			}
		},
		first_name: {
			required: {
				value: true,
				message: t('validation.required')
			},
			minLength: {
				value: 2,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 2 })
				})
			},
			pattern: {
				value: pattern.name,
				message: t('validation.name')
			}
		},
		last_name: {
			required: {
				value: true,
				message: t('validation.required')
			},
			minLength: {
				value: 2,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 2 })
				})
			},
			pattern: {
				value: pattern.name,
				message: t('validation.name')
			}
		},
		email: {
			required: {
				value: true,
				message: t('validation.required')
			},
			pattern: {
				value: pattern.email,
				message: t('validation.email')
			}
		},
		telegram: {
			pattern: {
				value: pattern.telegram,
				message: t('validation.telegram')
			}
		},
		message: {
			required: {
				value: true,
				message: t('validation.required')
			},
			minLength: {
				value: 10,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 10 })
				})
			}
		},
		password: {
			required: {
				value: true,
				message: t('validation.required')
			},
			minLength: {
				value: 5,
				message: t('validation.minLength', {
					units: t('units.chars', { count: 5 })
				})
			}
		},
		required: {
			required: {
				value: true,
				message: t('validation.required')
			}
		}
	};

	return name ? rules[name] : rules;
};

export default useRules;
