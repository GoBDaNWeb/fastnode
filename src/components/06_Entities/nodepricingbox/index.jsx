import { useForm } from 'react-hook-form';

import Badge from '@Shared/ui/badge';
import { BoxA } from '@Shared/ui/boxa';
import Button from '@Shared/ui/button';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './nodepricingbox.scss';

const NodePricingBox = ({ cn, titleBadge, price, bem = {} }) => {
	const [cnfull] = useBEM({ cn, bem });

	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				placeA={
					<>
						<Badge title={titleBadge} color={'sky'} type={'transparent'} />
						<p>
							40 000 <span>Request</span>
						</p>
						<ul>
							<li>Access to 50+ chains</li>
							<li>Daily requests</li>
							<li>Free buildings</li>
						</ul>
					</>
				}
				placeB={
					<>
						<p>
							start <span className='big'>{price} </span>
							<span className='small'>usd</span>
						</p>
					</>
				}
				placeC={<Button onClickHandler={() => {}} type='button' name={'get_started'} />}
			/>
		</BoxA>
	);
};

export default NodePricingBox;
