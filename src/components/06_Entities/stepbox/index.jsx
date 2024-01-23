import { FramedBox } from '@Shared/ui/framedbox';
import Icon from '@Shared/ui/icon';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const StepBox = ({
	framed = 1,
	icon,
	number,
	title,
	description,
	bem = {}
}) => {
	const cn = 'stepbox';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__helper`}>
				<FramedBox variant={framed}>
					<div className={`${cn}__body`}>
						<div className={`${cn}__sign`}>
							{icon ? <Icon icon={icon} /> : <span>{number}</span>}
						</div>
						<div className={`${cn}__title`}>{title}</div>
						<div className={`${cn}__description`}>{description}</div>
					</div>
				</FramedBox>
			</div>
		</div>
	);
};

export default StepBox;
