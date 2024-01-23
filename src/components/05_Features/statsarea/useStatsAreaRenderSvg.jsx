function useStatsAreaRenderSvg() {
	const renderSvg = () => {
		return (
			<defs>
				<linearGradient id='area-gradient-0' x1='0' x2='0' y1='1' y2='0'>
					<stop offset='47%' stopColor='rgba(69, 121, 245, 0.14)' />
					<stop offset='147%' stopColor='rgba(39, 39, 62, 0)' />
				</linearGradient>
				<linearGradient id='stroke-gradient-0' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='100%' stopColor='#4579f5' />
					<stop offset='100%' stopColor='#4579f5' />
					<stop offset='100%' stopColor='#4579f5' />
					<stop offset='100%' stopColor='transparent' />
				</linearGradient>
				<linearGradient id='area-gradient-1' x1='0' x2='0' y1='1' y2='0'>
					<stop offset='47%' stopColor='rgba(69, 121, 245, 0.14)' />
					<stop offset='147%' stopColor='rgba(39, 39, 62, 0)' />
				</linearGradient>
				<linearGradient id='stroke-gradient-1' x1='0' y1='0' x2='0' y2='1'>
					<stop offset='100%' stopColor='rgba(33, 189, 210)' />
					<stop offset='100%' stopColor='rgba(33, 189, 210)' />
					<stop offset='100%' stopColor='rgba(33, 189, 210)' />
					<stop offset='100%' stopColor='transparent' />
				</linearGradient>
			</defs>
		);
	};
	return renderSvg;
}
export default useStatsAreaRenderSvg;
