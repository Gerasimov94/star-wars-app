import { Space } from 'antd';

export default function ErrorPage() {
	return (
		<Space style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} direction="vertical" align="center">
			<h1 style={{ fontFamily: 'Star Jedi' }}>{'404'.toLowerCase()}</h1>
			<div>
				<img src="/trooper.png" width={128} height={128} alt="trooper png" />
			</div>
			<div style={{ fontFamily: 'Star Jedi', textAlign: 'center' }}>
				<div>{'THIS IS NOT THE PAGE YOU ARE LOOKING FOR.'.toLowerCase()}</div>
				<div>{'MOVE ALONG, MOVE ALONG.'.toLowerCase()}</div>
			</div>
		</Space>
	);
}
