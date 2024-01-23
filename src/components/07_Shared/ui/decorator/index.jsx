import { Suspense, lazy, useEffect } from 'react';

import GlowDcr from '@Shared/ui/decorator/glowdcr';
// import HexagonDcr from '@Shared/ui/decorator/hexagondcr';
import OrnamentDcr from '@Shared/ui/decorator/ornamentdcr';
import OverlayDcr from '@Shared/ui/decorator/overlaydcr';

import useBEM from '@hooks/useBEM';

import Preloader from '../preloader';

import './decorator.base.scss';

const HexagonDcr = lazy(() => import('@Shared/ui/decorator/hexagondcr'));

const Decorator = ({ type, variant, bem = {} }) => {
	const cn = 'decorator';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<>
			{type === 'hexagon' && (
				<Suspense
					fallback={
						<Preloader
							thickness={2}
							fullScreen={true}
							position={'bottom'}
							size={5}
						/>
					}
				>
					<HexagonDcr variant={variant} />
				</Suspense>
			)}
			{type === 'glow' && <GlowDcr variant={variant} />}
			{type === 'overlay' && <OverlayDcr variant={variant} />}
			{type === 'ornament' && <OrnamentDcr variant={variant} />}
		</>
	);
};

export default Decorator;
