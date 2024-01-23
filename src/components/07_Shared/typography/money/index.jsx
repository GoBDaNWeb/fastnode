import useBEM from '@hooks/useBEM';

import './money.scss';

const Money = ({ children, currency = 'ru-RU', bem = {} }) => {
	/*  */
	const cn = 'money';
	const [cnfull] = useBEM({ cn, bem });
	let moneyFormatted = new Intl.NumberFormat(currency).format(children);
	const currencySign = currency !== 'ru-RU' ? '$' : '₽';
	/*
	TODO: реализовать выборку знака из готовых наборов знаков валют
	*/
	return (
		<span className={cnfull}>
			{currencySign === '$' ? (
				<span className={`${cn}__currency`}>{currencySign}</span>
			) : (
				''
			)}
			<span className={`${cn}__value`}>{moneyFormatted}</span>
			{currencySign !== '$' ? (
				<span className={`${cn}__currency`}>{currencySign}</span>
			) : (
				''
			)}
		</span>
	);
};

export default Money;
