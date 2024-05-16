import { useTranslation } from 'react-i18next';

import FBForm from '@Widgets/built-forms/fbform';

import StepNodeBox from '@Entities/stepnodebox';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './nodestepsscreen.scss';

const NodeStepsScreen = ({ currentNode, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'nodestepsscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'steps'} cls={cnfull}>
			<ScreenGrd
				placeA={
					<>
						<div className='rectangle1'></div>
						<div className='rectangle2'></div>
						<FBForm />
						{/* <StepNodeBox /> */}
					</>
				}
				placeB={
					<>
						<Heading level='2' align='left'>
							Start fast with {currentNode?.coin} RPC nodes
						</Heading>
						<Description>
							<p>
								Deploying your DeFi protocol, crypto exchange, or Play-to-Earn application on{' '}
								{currentNode?.name} has never been easier.
							</p>
						</Description>
						<div className='buttons'>
							<Button onClickHandler={() => {}} type='button' name={'step_one'} />
							<Button
								onClickHandler={() => {}}
								accent='secondary'
								type='button'
								name={'step_two'}
							/>
							<Button
								onClickHandler={() => {}}
								accent='secondary'
								type='button'
								name={'step_three'}
							/>
						</div>
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodeStepsScreen;
