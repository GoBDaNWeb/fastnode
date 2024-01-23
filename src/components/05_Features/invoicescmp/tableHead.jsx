import { flexRender } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

const TableHead = ({ table, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'TableHead';
	const [cnfull] = useBEM({ cn, bem });

	const [keyGo, setKeyGo] = useState(false);

	useEffect(() => {
		const onKeyDownHandler = e => {
			if (e.target.closest('.' + cn)) {
				if (e.code === 'Enter' || e.code === 'Space') {
					e.preventDefault();
					setKeyGo(true);
				} else {
					setKeyGo(false);
				}
			}
		};
		document.body.addEventListener('keydown', onKeyDownHandler);

		return () => {
			document.body.removeEventListener('keydown', onKeyDownHandler);
		};
	}, []);

	return (
		<thead className={cnfull}>
			{table.getHeaderGroups().map(headerGroup => (
				<tr key={headerGroup.id}>
					{headerGroup.headers.map(header => {
						const handler = keyGo
							? header.column.getToggleSortingHandler()
							: () => {};
						return (
							<th key={header.id} colSpan={header.colSpan} className='th'>
								{header.isPlaceholder ? null : (
									<div
										{...{
											className: header.column.getCanSort()
												? `th-content sorting-enabled sorting-${header.column.getIsSorted()}`
												: `th-content`,
											onClick: header.column.getToggleSortingHandler(),
											onKeyUp: handler
										}}
										tabIndex={0}
									>
										<span className='th-content__caption'>
											{flexRender(
												t(`common.${header.column.columnDef.header}`),
												header.getContext()
											)}
										</span>
										{header.column.getCanSort() ? (
											<div className='sorting-decorator'>
												<div className='sorting-decorator__helper disabled'></div>
												<div className='sorting-decorator__helper enabled'></div>
											</div>
										) : (
											''
										)}
									</div>
								)}
							</th>
						);
					})}
				</tr>
			))}
		</thead>
	);
};

export default TableHead;
