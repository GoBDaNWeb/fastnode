import EndHeadBox from '@Entities/endheadbox';
import EndlistBox from '@Entities/endlistbox';
import EndlistItem from '@Entities/endlistitem';
import PlaqueBox from '@Entities/plaquebox';
import Plaque from '@Shared/typography/plaque';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { dashboardActions } from '@api/redux/slice/dashboardSlice';
import { dialogActions } from '@api/redux/slice/dialogSlice';
import { v4 as uuidv4 } from 'uuid';

import { useDispatch } from 'react-redux';

import useBEM from '@hooks/useBEM';

import './nodeinfo.scss';
import isEmpty from 'lodash/isEmpty';
import { Heading } from '@Shared/typography/heading';
import { userApi } from '@api/redux';

const NodeInfo = ({
	data,
	extended = true,
	footbarEnabled = true,
	btnStats = true,
	btnProlong = true,
	serverName,
	bem = {}
}) => {
	const cn = 'nodeinfo';
	const [cnfull] = useBEM({ cn, bem });

	const receivedUser = userApi.useGetUserQuery();

	const currentInvoice = receivedUser?.data?.invoices.find(
		item => item.dedicated_server_name === serverName
	);

	const colorCollation = {
		plaqueType1: 'bluebird',
		plaqueType2: 'dodgerblue',
		plaqueTypeCustom1: 'green'
	};
	const dispatch = useDispatch();

	const dialogId = 'prolongDialog';

	const openDialogHandler = e => {
		if (dialogId) dispatch(dialogActions.open(dialogId));
	};

	function prolongHandler(server) {
		dispatch(dashboardActions.setProlongServer(server));
		openDialogHandler();
	}

	const preparedUntil = String(data?.until).split(' ')[0];
	const payStatuses = ['CREATED'];
	const prolongStatuses = ['ACTIVE', 'UNPAID'];
	const statsStatuses = ['ACTIVE'];
	const untilStatuses = ['ACTIVE', 'UNPAID'];

	const payButton = () => {
		if (payStatuses.some(item => item === data?.status)) {
			return (
				<Button
					name={'pay'}
					target={'_blank'}
					to={currentInvoice?.payment_url}
				/>
			);
		}
	};
	const prolongButton = () => {
		if (prolongStatuses.some(item => item === data?.status) && btnProlong) {
			return (
				<Button
					name={'prolong'}
					onClickHandler={() => prolongHandler(data?.dedicated_server_name)}
				/>
			);
		}
	};
	const statsButton = () => {
		if (statsStatuses.some(item => item === data?.status) && btnStats) {
			return (
				<Button
					to={`/dashboard/node?name=${data?.dedicated_server_name}`}
					accent='secondary'
					name={'endpoints'}
				/>
			);
		}
	};
	const displayUntil = () => {
		if (untilStatuses.some(item => item === data?.status)) {
			return (
				<Plaque color={colorCollation['plaqueType1']}>
					Until {preparedUntil}
				</Plaque>
			);
		}
	};
	const tags = data?.tags;
	if (!isEmpty(data)) {
		return (
			<ComponentBox
				cn={cnfull}
				framed='1'
				placeTopbar={
					<PlaqueBox
						start={
							<Plaque
								key={uuidv4()}
								color={colorCollation['plaqueType1']}
								uppercase={true}
							>
								{data?.dedicated_server_name}
							</Plaque>
						}
						end={displayUntil()}
						extra={
							<PlaqueBox>
								{tags.map((tag, i) => {
									if (extended) {
										return (
											<Plaque
												key={uuidv4()}
												color={colorCollation[`plaqueTypeCustom${i}`]}
												uppercase={true}
											>
												{tag}
											</Plaque>
										);
									}
								})}
							</PlaqueBox>
						}
					>
						{extended && (
							<>
								<Plaque
									key={uuidv4()}
									color={colorCollation['plaqueType2']}
									uppercase={true}
								>
									{data?.blockchain}
								</Plaque>
								<Plaque
									key={uuidv4()}
									color={colorCollation['plaqueType2']}
									uppercase={true}
								>
									{data?.network}
								</Plaque>
								<Plaque
									key={uuidv4()}
									color={colorCollation['plaqueType2']}
									uppercase={true}
								>
									{data?.type}
								</Plaque>
							</>
						)}
					</PlaqueBox>
				}
				placeFootbar={
					footbarEnabled && (
						<CtrlsGrd justify='end'>
							{statsButton()}
							{prolongButton()}
							{payButton()}
						</CtrlsGrd>
					)
				}
			>
				<EndHeadBox
					status={data?.status}
					statusDescription={data?.status_text}
					brand={data?.blockchain}
					title={data?.readable_name}
				/>
				{extended ? (
					<EndlistBox>
						{data?.endpoints?.map(item => {
							const key = Object.keys(item)[0];
							const value = Object.values(item)[0];
							return (
								<EndlistItem key={uuidv4()} start={key}>
									<span>{value}</span>
								</EndlistItem>
							);
						})}
					</EndlistBox>
				) : (
					<PlaqueBox
						extra={
							<PlaqueBox>
								{tags.map((tag, i) => {
									return (
										<Plaque
											key={uuidv4()}
											color={colorCollation[`plaqueTypeCustom${i}`]}
											uppercase={true}
										>
											{tag}
										</Plaque>
									);
								})}
							</PlaqueBox>
						}
					>
						<Plaque
							key={uuidv4()}
							color={colorCollation['plaqueType2']}
							uppercase={true}
						>
							{data?.blockchain}
						</Plaque>
						<Plaque
							key={uuidv4()}
							color={colorCollation['plaqueType2']}
							uppercase={true}
						>
							{data?.network}
						</Plaque>
						<Plaque
							key={uuidv4()}
							color={colorCollation['plaqueType2']}
							uppercase={true}
						>
							{data?.type}
						</Plaque>
					</PlaqueBox>
				)}
			</ComponentBox>
		);
	} else {
		// <Heading level={5}>No data!</Heading>;
	}
};
export default NodeInfo;
