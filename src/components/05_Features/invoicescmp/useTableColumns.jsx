import Identify from '@Shared/typography/identify';
import Money from '@Shared/typography/money';
import Plaque from '@Shared/typography/plaque';

import { useMemo } from 'react';

function useTableColumns() {
	const columns = useMemo(
		() => [
			{
				header: 'invoices',
				accessorKey: 'id',
				cell: ({ row }) => {
					return (
						<div className='td-content'>
							<div className='td-content__box'>
								<Identify prefix='#'>{row.original.id}</Identify>
							</div>
							<div className='td-content__box'>
								<Plaque
									accessor='type'
									variant={String(row.original.type).toLowerCase()}
									uppercase={true}
								>
									{row.original.type}
								</Plaque>
							</div>
							<div className='td-content__box paymethodbox'>
								<span className='paymethodbox__caption'>
									{row.original.payment_provider}:
								</span>
								<Identify
									color='aqua'
									bem={{ prefix: 'paymethodbox' }}
									prefix='#'
									to={row.original.payment_url}
									target={'_blank'}
								>
									{row.original.payment_id}
								</Identify>
							</div>
						</div>
					);
				}
			},
			{
				header: 'date',
				accessorKey: 'date',
				cell: ({ row }) => {
					return (
						<div className='td-content'>
							<div className='td-content__box'>{row.original.date}</div>
						</div>
					);
				}
			},
			{
				header: 'message',
				accessorKey: 'message',
				cell: ({ row }) => {
					return (
						<div className='td-content'>
							<div className='td-content__box'>{row.original.message}</div>
						</div>
					);
				}
			},
			{
				header: 'status',
				accessorKey: 'status',
				cell: ({ row }) => {
					return (
						<div className='td-content'>
							<div className='td-content__box'>
								<Plaque
									uppercase={true}
									accessor={'status'}
									variant={String(row.original.status).toLowerCase()}
								>
									{row.original.status}
								</Plaque>
							</div>
						</div>
					);
				}
			},
			{
				header: 'amount',
				accessorKey: 'amount',
				cell: ({ row }) => {
					return (
						<div className='td-content'>
							<div className='td-content__box'>
								<Money currency={'en-EN'}>{row.original.amount}</Money>
							</div>
						</div>
					);
				}
			}
		],
		[]
	);

	return columns;
}
export default useTableColumns;
