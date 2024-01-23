import { FramedBox } from '@Shared/ui/framedbox';
import Svg from '@Shared/ui/svg';

import { Link } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';
import Image from '@Shared/ui/image';

const PartnerBox = ({ to, framed = 1, imageName, symbolId, bem = {} }) => {
	const cn = 'partnerbox';
	const [cnfull] = useBEM({ cn, bem });

	const _spriteSrc = `images/partners/partners-sprite.svg`;
	const _simpleSrc = !symbolId ? `images/partners/${imageName}` : '';
	const _to = to;

	const _src = symbolId ? _spriteSrc : _simpleSrc;

	return (
		<div className={`${cnfull}`}>
			<FramedBox variant={framed}>
				<div className={`${cn}__body`}>
					{_to ? (
						<Link to={to} target='_blank'>
							{symbolId ? (
								<Svg src={_src} symbolId={symbolId} />
							) : (
								<Image src={_src} />
							)}
						</Link>
					) : symbolId ? (
						<Svg src={_src} symbolId={symbolId} />
					) : (
						<Image src={_src} />
					)}
				</div>
			</FramedBox>
		</div>
	);
};

export default PartnerBox;
