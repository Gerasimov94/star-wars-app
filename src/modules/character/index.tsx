import { Link } from 'wouter';
import { Breadcrumb, Space } from 'antd';
import { useAppSelector } from 'src/hooks';

export default function index() {
	return (
		<div>
			<Space>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Link href="/">
						<Breadcrumb.Item>Home</Breadcrumb.Item>
					</Link>
				</Breadcrumb>
			</Space>
		</div>
	);
}
