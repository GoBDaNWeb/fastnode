import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Heading } from '@Shared/typography/heading';
import { BoxA } from '@Shared/ui/boxa';
import Button from '@Shared/ui/button';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';
import useCustomAlert from '@hooks/useCustomAlert';

import './rpcmethodbox.scss';

const rpcoptions = [
	{
		value: 'eth-block-number',
		label: 'ETH Block Number'
	},
	{
		value: 'eth-block-number',
		label: 'ETH Block Number'
	},
	{
		value: 'eth-block-number',
		label: 'ETH Block Number'
	}
];
const RpcMethodBox = ({ heading, heading2, icon, icon2, badges, bem = {} }) => {
	const codeRef = useRef();
	const customALert = useCustomAlert();

	const cn = 'rpcmethodbox';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const { control } = useForm({
		defaultValues: {}
	});

	const copyCode = () => {
		if (codeRef.current) {
			const textToCopy = codeRef.current.textContent;
			navigator.clipboard.writeText(textToCopy);
			customALert({ type: 'success', timer: 1000 });
		}
	};

	

	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				top={
					<>
						<div className='left_side'>
							<Heading level={3}>{t('accessnodescreen.heading.box')}</Heading>
							<div className='badge'>
								<p>{t('accessnodescreen.content.badge')}</p>
								<span>18510714</span>
							</div>
						</div>
						<div className='right_side'>
							<ZFld
								tag='select'
								name='rcp_method'
								control={control}
								options={rpcoptions}
								// onChangeHandler={() => {}}
								// rules={rules['required']}
							/>
						</div>
					</>
				}
				placeA={
					<>
						<div className='top'>
							<span>Request</span>
							<button onClick={copyCode}>
								<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
									<g fill='none' fillRule='evenodd'>
										<path d='M0 0h24v24H0z' />
										<path
											d='M13.672 22.39c1.726 0 2.648-.93 2.648-2.663v-1.438h1.29c1.726 0 2.648-.937 2.648-2.672V9.57c0-1.086-.235-1.78-.875-2.445l-3.86-3.93c-.617-.625-1.351-.875-2.312-.875h-2.89c-1.72 0-2.641.93-2.641 2.664V6.43H6.39c-1.726 0-2.648.93-2.648 2.664v10.633c0 1.742.922 2.664 2.649 2.664h7.28zm3.742-5.89H16.32v-2.703c0-1.086-.148-1.625-.828-2.313l-4.18-4.234c-.562-.578-1.07-.773-1.843-.813V5.149c0-.671.336-1.039 1.047-1.039h3.101v3.485c0 1.023.578 1.593 1.594 1.593h3.258v6.274c0 .672-.344 1.039-1.055 1.039zM18 7.773h-2.594c-.265 0-.375-.117-.375-.375V4.766L18 7.773zM13.477 20.61H6.578c-.71 0-1.047-.367-1.047-1.047V9.258c0-.672.336-1.04 1.047-1.04h2.25v4.032c0 1.25.61 1.844 1.844 1.844h3.86v5.469c0 .68-.345 1.046-1.055 1.046zm.867-8.023H10.82c-.328 0-.476-.149-.476-.484V8.523l4 4.063z'
											fillOpacity='.4'
											fill='#E0E0FF'
											fillRule='nonzero'
										/>
									</g>
								</svg>
							</button>
						</div>
						<code ref={codeRef}>
							<span className='code-row'>
								<span className='code-copy'>curl </span>
								<span className='code-copy orange'>--location --request</span>
								<span className='code-copy'> POST https://go.getblock.io/&lt;ACCESS-TOKEN&gt;</span>
							</span>
							<br />
							<span className='code-row'>
								<span className='code-copy orange'>—header </span>
								<span className='code-copy'>&apos;Content-Type: application/json&apos;</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy orange'>—data-raw </span>
								<span className='code-copy'>&apos;{`{`}</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy'>»jsonrpc&quot;: &quot;2.0&quot;,</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy'>»method&quot;: &quot;eth_blockNumber&quot;,</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy'>»params&quot;: [],</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy'>»id&quot;: &quot;getblock.io&quot;</span>
							</span>
							<br />

							<span className='code-row'>
								<span className='code-copy'>{`}`}’</span>
							</span>
						</code>
					</>
				}
				placeB={
					<>
						<Button
							onClickHandler={() => {}}
							accent='secondary'
							type='button'
							name={'send_request'}
						/>
						<Button onClickHandler={() => {}} type='button' name={'free_endpoint'} />
					</>
				}
			/>
		</BoxA>
	);
};

export default RpcMethodBox;
