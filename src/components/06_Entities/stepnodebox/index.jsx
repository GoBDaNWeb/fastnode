import { useForm } from 'react-hook-form';

import { BoxA } from '@Shared/ui/boxa';
import Button from '@Shared/ui/button';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './stepnodebox.scss';

const protocoloptions = [
	{
		value: 'protocol',
		label: 'Protocol'
	},
	{
		value: 'protocol',
		label: 'Protocol'
	},
	{
		value: 'protocol',
		label: 'Protocol'
	}
];
const networkoptions = [
	{
		value: 'mainnet',
		label: 'Mainnet'
	},
	{
		value: 'mainnet',
		label: 'Mainnet'
	},
	{
		value: 'mainnet',
		label: 'Mainnet'
	}
];

const StepNodeBox = ({ heading, heading2, icon, icon2, badges, bem = {} }) => {
	const cn = 'stepnodebox';
	const [cnfull] = useBEM({ cn, bem });
	const { control } = useForm({
		defaultValues: {}
	});
	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				placeA={
					<div className='content-wrapper'>
						<div className='content-wrapper__inner'>
							<span>Set up endpoint</span>
							<ZFld
								tag='select'
								name='protocol'
								control={control}
								options={protocoloptions}
								// onChangeHandler={() => {}}
								// rules={rules['required']}
							/>
							<ZFld
								tag='select'
								name='network'
								control={control}
								options={networkoptions}
								// onChangeHandler={() => {}}
								// rules={rules['required']}
							/>
							<Button onClickHandler={() => {}} type='button' name={'get'} />
						</div>
					</div>
				}
			/>
		</BoxA>
	);
};

export default StepNodeBox;
