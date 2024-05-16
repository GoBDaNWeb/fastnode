import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import RpcMethodBox from '@Entities/rpcmethodbox';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './accessnodescreen.scss';

const accessoptions = [
	{
		value: 'get-started',
		label: 'Get Started'
	},
	{
		value: 'specifications',
		label: 'Specifications'
	},
	{
		value: 'enterprice-solutions',
		label: 'Enterprice Solutions'
	}
];

const AccessNodeScreen = ({ currentNode, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'accessnodescreen';
	const [cnfull] = useBEM({ cn, bem });

	const { control } = useForm({
		defaultValues: {}
	});

	return (
		<Screen id={'access'} cls={cnfull}>
			<ScreenGrd
				placeA={
					<>
						<Heading level='2' align='center'>
							Get access to {currentNode?.name} RPC node in a few clicks
						</Heading>
						<Description>
							<p>
								Here you can create an {currentNode?.name} API endpoint for your project. With
								Fastnode you don’t need to know how to run an {currentNode?.coin} node.
								{currentNode?.name} RPC nodes are available for mainnet and testnets.
							</p>
						</Description>
					</>
				}
				placeB={
					<>
						<div className='rectangle1'></div>
						<Button onClickHandler={() => {}} type='button' name={'get_started'} />
						<Button
							onClickHandler={() => {}}
							type='button'
							accent='secondary'
							name={'specifications'}
						/>
						<Button
							onClickHandler={() => {}}
							type='button'
							accent='secondary'
							name={'enterprice_solutions'}
						/>
						<ZFld
							tag='select'
							name='get_started'
							control={control}
							options={accessoptions}
							// onChangeHandler={() => {}}
							// rules={rules['required']}
						/>
					</>
				}
				placeC={
					<>
						<RpcMethodBox />
						<div className='rectangle1'></div>
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default AccessNodeScreen;
