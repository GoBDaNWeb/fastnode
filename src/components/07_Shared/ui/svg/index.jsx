import useBEM from '@hooks/useBEM';

import config from '@config';

import './_init.scss';

const Svg = ({
	store = 'base',
	title,
	src,
	symbolId,
	clientPublicFolder,
	clientAssetsFolder,
	serverStaticFolder,
	width,
	height,
	bem = {}
}) => {
	const cn = 'svg';
	const [cnfull] = useBEM({ cn, bem });

	const _clientPublicF = clientPublicFolder ? clientPublicFolder : 'public';
	const _clientAssetsF = clientAssetsFolder ? clientAssetsFolder : '@assets';
	const _clientF = clientAssetsFolder ? _clientAssetsF : _clientPublicF; // По-умолчанию public
	// Сервер
	const _serverStaticF = serverStaticFolder ? serverStaticFolder : 'static';

	const imageUrl =
		store === 'base'
			? `/${src}`
			: store === 'client'
			? `${config.clientUrl}/${_clientF}${src}`
			: store === 'server'
			? `${config.serverUrl}/${_serverStaticF}/${src}`
			: '';
	const urlComplete = symbolId ? `${imageUrl}#${symbolId}` : imageUrl;
	// const urlComplete = imageUrl;

	if (symbolId) {
		return (
			<svg className={cnfull} width={width} height={height}>
				{title ? <title>{title}</title> : ''}
				<use xlinkHref={urlComplete}></use>
			</svg>
		);
	}
};

export default Svg;
