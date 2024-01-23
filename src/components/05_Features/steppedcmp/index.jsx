import StepBox from '@Entities/stepbox';
import Decorator from '@Shared/ui/decorator';
import { v4 as uuidv4 } from 'uuid';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const SteppedCmp = ({
	data,
	stepKey,
	children,
	glow = 'stepped-a',
	iconed = true,
	markered,
	justify,
	bem = {}
}) => {
	const { t } = useTranslation();
	const cn = 'steppedcmp';
	const [cnfull] = useBEM({ cn, bem });
	const _data = data ? data : children;
	const childrenArr = useMemo(
		() => (Array.isArray(_data) ? _data : [_data]),
		[_data]
	);

	// const [childLength, setChildLength] = useState(childrenArr.length);
	// useEffect(() => {
	// 	setChildLength(childrenArr.length);
	// }, [childrenArr]);

	return (
		<div className={`${cnfull}`} data-justify={justify}>
			{markered ? (
				<div className={`${cn}__markering markering`}>
					{childrenArr.map((item, index) => {
						const idx = index + 1;
						return (
							<div className={'markering__marker'} key={uuidv4()}>
								<div className='marker__helper'>
									<b>{idx}</b>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				''
			)}
			<div className={`${cn}__body`}>
				<div className={`${cn}__helper`}>
					{data &&
						childrenArr.map((item, index) => {
							const idx = index + 1;
							return (
								<div className={`${cn}__slot`} key={uuidv4()}>
									<StepBox
										name={`${stepKey}_${idx}`}
										number={!iconed || !item.icon ? item.id || idx : ''}
										icon={iconed && item.icon ? item.icon : ''}
										//
										title={t(`${stepKey}_${idx}.title`)}
										description={t(`${stepKey}_${idx}.description`)}
										// locale={{ title: item.locale.title, body: item.locale.body }}
									></StepBox>
								</div>
							);
						})}

					{children ? children : ''}
				</div>

				{glow && <Decorator type='glow' variant={glow} />}
			</div>
		</div>
	);
};

export default SteppedCmp;
