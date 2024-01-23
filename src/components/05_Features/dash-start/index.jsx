import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import DashGrd from '@Shared/ui/layouts/dashgrd';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const DashStart = ({ bem = {} }) => {
	const cn = 'dashstart';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();

	return (
		<ComponentBox
			cn={cnfull}
			framed='1'
			decorator={{ type: 'glow', variant: 'dashboard' }}
		>
			<DashGrd
				mainStart={
					<Button
						navTo='configurator'
						caption={false}
						face={'pure'}
						icon={'slider'}
						iconSize={32}
					/>
				}
				mainEnd={
					<Button
						navTo='configurator'
						accent='secondary'
						name={'configure_my_node'}
					/>
				}
			>
				<p>{t('dashboard.description.choose')}</p>
			</DashGrd>
		</ComponentBox>
	);
};

export default DashStart;
