import config from '@config';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Image = ({
	store = 'base',
	src,
	symbolId,
	alt,
	clientPublicFolder,
	clientAssetsFolder,
	serverStaticFolder,
	width,
	height,
	loading = 'lazy',
	bem = {}
}) => {
	const cn = 'image';
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
			: store === 'custom'
			? `${src}`
			: '';
	const urlComplete = symbolId ? `${imageUrl}#${symbolId}` : imageUrl;

	return (
		<img
			className={cnfull}
			src={urlComplete}
			alt={alt}
			aria-label={alt}
			width={width}
			height={height}
			loading={loading}
		/>
	);
};

export default Image;
