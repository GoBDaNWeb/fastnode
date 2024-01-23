import { Heading } from '@Shared/typography/heading';
import Decorator from '@Shared/ui/decorator';
import BoardGrd from '@Shared/ui/layouts/boardgrd';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Board = ({ children, heading, toolbar, bem = {} }) => {
	const cn = 'board';
	const [cnfull] = useBEM({ cn, bem });
	const toolbarSuffix = toolbar ? ` ${cn}--toolbar-on` : ` ${cn}--toolbar-off`;

	return (
		<div className={`${cnfull}${toolbarSuffix}`}>
			<div className={`${cn}__headbar`}>
				{heading && (
					<div className={`${cn}__place ${cn}__place--heading`}>
						{<Heading level='2'>{heading}</Heading>}
					</div>
				)}
				{toolbar && (
					<div className={`${cn}__place ${cn}__place--toolbar`}>{toolbar}</div>
				)}
			</div>
			<div className={`${cn}__mainbar`}>
				<Decorator variant={'glow-2-a'} />
				<BoardGrd>{children}</BoardGrd>
			</div>
		</div>
	);
};

export default Board;
