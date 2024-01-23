import { ComponentBox } from '@Shared/ui/componentbox';
import { userApi } from '@api/redux';
import { v4 as uuidv4 } from 'uuid';

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';
import Pagination from './pagination';
import TableHead from './tableHead';
import useTableColumns from './useTableColumns';

const InvoicesCmp = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'invoicescmp';
	const [cnfull] = useBEM({ cn, bem });
	const receivedUser = userApi.useGetUserQuery();

	const [sorting, setSorting] = useState([]);

	const [{ pageIndex, pageSize }, setPagination] = useState({
		pageIndex: 0,
		pageSize: 5
	});

	const pagination = useMemo(
		() => ({
			pageIndex,
			pageSize
		}),
		[pageIndex, pageSize]
	);

	const columns = useTableColumns();
	const table = useReactTable({
		data: receivedUser?.data?.invoices ?? [],
		columns,
		pageCount: Math.ceil(receivedUser?.data?.invoices.length / pageSize) ?? -1,
		state: {
			sorting,
			pagination
		},
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel()
	});

	const isReady = useTrackQuery(receivedUser, 'invoices');
	if (isReady) {
		return (
			<ComponentBox
				cn={cnfull}
				framed='1'
				decorator={{ type: 'glow', variant: 'dashboard' }}
				placeHeadbar={t('heading.invoices_list')}
				placeFootbar={
					<Pagination
						table={table}
						data={receivedUser?.data?.invoices ?? []}
						pageSize={pageSize}
						pagination={pagination}
						setPagination={setPagination}
					/>
				}
			>
				<div className={`${cn}__decorator`}>
					<div className={`${cn}__decorator-helper-l`}></div>
					<div className={`${cn}__decorator-helper-r`}></div>
					<table>
						<TableHead table={table} />
						<tbody>
							{table.getRowModel().rows.map(row => {
								return (
									// <tr key={row.id}>
									<tr key={uuidv4()}>
										{row.getVisibleCells().map(cell => {
											return (
												<td key={cell.id} className='td'>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</ComponentBox>
		);
	}
};

export default InvoicesCmp;
