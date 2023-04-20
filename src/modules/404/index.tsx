import { Space } from 'antd';
import 'src/modules/404/index.css';

export default function ErrorPage() {
	return (
		<Space className="error-page" direction="vertical" align="center">
			<h1 className="text--star-jedi">{'404'.toLowerCase()}</h1>
			<div>
				<img src="/trooper.png" width={128} height={128} alt="trooper png" />
			</div>
			<div className="text--star-jedi text--center">
				<div>{'THIS IS NOT THE PAGE YOU ARE LOOKING FOR.'.toLowerCase()}</div>
				<div>{'MOVE ALONG, MOVE ALONG.'.toLowerCase()}</div>
			</div>
		</Space>
	);
}
