import React from 'react';
import { Layout as AntLayout, theme } from 'antd';

interface IProps {
	children: React.ReactNode;
}

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }: IProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<AntLayout style={{ height: '100vh' }}>
			<Header style={{ zIndex: 1, width: '100vw', height: 64, backgroundColor: colorBgContainer }}></Header>
			<Content style={{ padding: 16, width: '100vw', minHeight: 'calc(100vh - 134px)', height: 'calc(100vh - 134px)', overflow: 'auto' }}>
				{children}
			</Content>
			<Footer style={{ textAlign: 'center', backgroundColor: colorBgContainer }}>Alexey Gerasimov. 2023</Footer>
		</AntLayout>
	);
}
