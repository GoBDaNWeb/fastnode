import { v4 as uuidv4 } from 'uuid';

import useBEM from '@hooks/useBEM';

const Pagination = ({
	table,
	data,
	pageSize,
	pagination,
	setPagination,
	bem = {}
}) => {
	const cn = 'pagination';
	const [cnfull] = useBEM({ cn, bem });

	const pagesArr = new Array(Math.ceil(data.length / pageSize)).fill(0);

	return (
		<div className={cnfull}>
			<div className={`${cn}__control ${cn}__prev`}>
				<button
					className=''
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				></button>
			</div>
			<div className={`${cn}__control ${cn}__next`}>
				<button
					className=''
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				></button>
			</div>
			<div className={`${cn}__pages`}>
				{pagesArr.map((item, index) => {
					return (
						<div
							key={uuidv4()}
							className={`${cn}__page${
								index === pagination.pageIndex ? ' active' : ''
							}`}
						>
							<button
								onClick={() => {
									setPagination({
										pageIndex: index,
										pageSize: pagination.pageSize
									});
								}}
							>
								{index + 1}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Pagination;
