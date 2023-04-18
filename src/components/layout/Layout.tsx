import React from 'react';
import { Layout as AntLayout, Button, Tooltip, theme } from 'antd';
import { ThemeModes, useThemeContext } from 'src/common/context/ThemeContext';

interface IProps {
	children: React.ReactNode;
}

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }: IProps) {
	const {
		token: { colorBgContainer, colorTextDisabled },
	} = theme.useToken();

	const { mode, setThemeMode } = useThemeContext();

	const isLightMode = mode === ThemeModes.LIGHT;

	return (
		<AntLayout style={{ height: '100vh' }}>
			<Header style={{ zIndex: 1, width: '100vw', height: 64, backgroundColor: colorBgContainer }}>
				<Tooltip title={`Swap to the ${isLightMode ? ThemeModes.DARK : ThemeModes.LIGHT} side`} placement="right">
					<Button
						shape="circle"
						style={{
							backgroundColor: 'white',
							border: `2px solid ${colorTextDisabled}`,
							height: 48,
							width: 48,
						}}
						icon={<img src={isLightMode ? '/master_yoda.webp' : '/vader.png'} width={36} height={36} />}
						onClick={() => {
							setThemeMode(isLightMode ? ThemeModes.DARK : ThemeModes.LIGHT);
						}}
					/>
				</Tooltip>
			</Header>
			<Content style={{ padding: 16, width: '100vw', minHeight: 'calc(100vh - 134px)', height: 'calc(100vh - 134px)', overflow: 'auto' }}>
				{children}
			</Content>
			<Footer style={{ textAlign: 'center', backgroundColor: colorBgContainer }}>Alexey Gerasimov. 2023</Footer>
		</AntLayout>
	);
}
