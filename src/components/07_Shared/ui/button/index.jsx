import Icon from '@Shared/ui/icon';

import { forwardRef, useId } from 'react';
import { Link, NavLink } from 'react-router-dom';

import useBEM from '@hooks/useBEM';
import useGetLocale from '@hooks/useGetLocale';
import usePrepareControlData from '@hooks/usePrepareControlData';

import './_init.scss';

const Button = forwardRef(
	(
		{
			uid,
			name,
			extraClass,
			children,
			to,
			navTo,
			caption,
			face = 'base',
			accent = 'primary',
			icon,
			iconSize,
			svg,
			iconAlign = 'start',
			onClickHandler,
			preventDefault = 'true',
			stopPropagation = 'true',
			locale = {},
			bem = {},
			type = 'button',
			target,
			...rest
		},
		ref
	) => {
		const genId = useId();
		const preparedUid = uid ?? genId;
		const cn = 'btn';
		const [cnfull] = useBEM({ cn, bem });
		const $extraClass = extraClass ? ` ${extraClass}` : '';
		const classNamePrepared = `${cnfull}${$extraClass}`;
		const [_data] = usePrepareControlData({ data: caption });
		const [$caption] = useGetLocale([name, 'button.caption', locale]);
		// Отключаем caption для социалок
		_data.enabled =
			face === 'social' || caption === false ? false : _data.enabled;
		const captionText =
			_data.caption &&
			(typeof _data.caption === 'string'
				? _data.caption
				: $caption
				? $caption
				: '');
		const captionResult = children ? children : captionText;
		const captionHTML = _data.enabled ? (
			<span className={`${cn}__caption`}>{captionResult}</span>
		) : (
			''
		);
		const _baseUrl = '/';
		const isLink = !!to;
		const isNavLink = !!navTo;

		if (!isLink && !isNavLink) {
			return (
				<button
					onClick={e => {
						if (!onClickHandler) return;
						if (preventDefault) e.preventDefault();
						if (stopPropagation) e.stopPropagation();
						onClickHandler();
					}}
					// onKeyDown={e => {
					// 	if (!onClickHandler) return;
					// 	if (e.code === 'Space' || e.code === 'Enter') {
					// 		if (preventDefault) e.preventDefault();
					// 		if (stopPropagation) e.stopPropagation();
					// 		onClickHandler();
					// 	}
					// }}
					{...rest}
					data-face={face}
					data-accent={accent}
					data-variant={caption === false ? 'only-icon' : ''}
					data-icon-size={iconSize}
					type={type}
					className={classNamePrepared}
					aria-label={captionText}
				>
					<span className={`${cn}__decorator`}></span>
					<span className={`${cn}__helper`}>
						{iconAlign === 'start' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
						{caption !== false && captionHTML}
						{iconAlign === 'end' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
					</span>
				</button>
			);
		} else if (isNavLink) {
			return (
				<NavLink
					{...rest}
					className={classNamePrepared}
					data-face={face}
					data-accent={accent}
					data-variant={caption === false ? 'only-icon' : ''}
					data-icon-size={iconSize}
					to={`${_baseUrl}${navTo}`}
					aria-label={captionText}
					target={target}
				>
					<span className={`${cn}__decorator`}></span>
					<span className={`${cn}__helper`}>
						{iconAlign === 'start' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
						{caption !== false && captionHTML}
						{iconAlign === 'end' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
					</span>
				</NavLink>
			);
		} else {
			return (
				<Link
					id={preparedUid}
					ref={ref}
					{...rest}
					className={classNamePrepared}
					data-face={face}
					data-accent={accent}
					data-variant={caption === false ? 'only-icon' : ''}
					data-icon-size={iconSize}
					to={to}
					aria-label={captionText}
					target={target}
				>
					<span className={`${cn}__decorator`}></span>
					<span className={`${cn}__helper`}>
						{iconAlign === 'start' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
						{caption !== false && captionHTML}
						{iconAlign === 'end' ? (
							icon || svg ? (
								<Icon icon={icon} svg={svg} bem={{ prefix: cn }} />
							) : (
								''
							)
						) : (
							''
						)}
					</span>
				</Link>
			);
		}
	}
);
Button.displayName = 'Button';
export default Button;
