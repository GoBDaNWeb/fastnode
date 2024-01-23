import Button from '@Shared/ui/button';
import { v4 as uuidv4 } from 'uuid';

import useBEM from '@hooks/useBEM';

import socials from '@data/socials';

import './_init.scss';

const SocialsList = ({ bem = {} }) => {
	const cn = 'socialslist';
	const [cnfull] = useBEM({ cn, bem });
	const socialsListData = socials.map(item => {
		const iconField = { iconName: `soc-${item.name}` };
		return { ...item, ...iconField };
	});
	return (
		<div className={cnfull}>
			{socialsListData.length !== 0 ? (
				<div className={`${cn}__body`}>
					{socialsListData.map(item => {
						return (
							<Button
								key={uuidv4()}
								icon={item.iconName}
								face='social'
								to={item.link}
								target='_blank'
							/>
						);
					})}
				</div>
			) : (
				<div className={`${cn}__notifybar`}>
					<span className={`${cn}__notify`}>No data!</span>
				</div>
			)}
		</div>
	);
};
export default SocialsList;
