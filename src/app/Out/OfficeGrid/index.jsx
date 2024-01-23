import { Heading } from '@Shared/typography/heading';
import Breadcrumbs from '@Widgets/navigation/breadcrumbs';
import Sidebar from '@Widgets/navigation/sidebar';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const OfficeGrid = ({
	heading,
	headingIcon,
	headingSub,
	toolbar,
	children,
	bem = {}
}) => {
	const cn = 'officegrid';
	const [cnfull] = useBEM({ cn, bem });
	const toolbarSuffix = toolbar ? ` ${cn}--toolbar-on` : ` ${cn}--toolbar-off`;
	return (
		<div className={`${cnfull}${toolbarSuffix}`}>
			<div className={`${cn}__place--top`}>{<Breadcrumbs />}</div>
			<aside className={`${cn}__place--aside`}>{<Sidebar />}</aside>
			<div className={`${cn}__place--heading`}>
				{
					<Heading level='2' icon={headingIcon}>
						{heading}
					</Heading>
				}
				{headingSub && <div className='heading-subject'>{headingSub}</div>}
			</div>
			{toolbar && <div className={`${cn}__place--toolbar`}>{toolbar}</div>}
			<div className={`${cn}__place--body`}>{children}</div>
		</div>
	);
};

export default OfficeGrid;
