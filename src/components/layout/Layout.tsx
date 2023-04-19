import React from 'react';
import { Layout as AntLayout, Button, Input, Space, Tooltip, theme } from 'antd';
import { ThemeModes, useThemeContext } from 'src/common/context/ThemeContext';
import { useLocation } from 'wouter';

interface IProps {
	children: React.ReactNode;
}

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }: IProps) {
	const {
		token: { colorBgContainer, colorTextDisabled },
	} = theme.useToken();

	const { mode, setThemeMode } = useThemeContext();
	const [_location, navigate] = useLocation();
	const isLightMode = mode === ThemeModes.LIGHT;

	return (
		<AntLayout style={{ height: '100vh' }}>
			<Header style={{ zIndex: 1, width: '100vw', height: 64, backgroundColor: colorBgContainer }}>
				<Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
					<Tooltip title={`Into the ${isLightMode ? 'Rebels' : 'Empire'} database`} placement="right">
						<Button
							shape="circle"
							style={{
								backgroundColor: 'white',
								border: `2px solid ${colorTextDisabled}`,
								height: 48,
								width: 48,
							}}
							icon={<img src={isLightMode ? '/rebels.png' : '/empire.png'} width={36} height={36} />}
							onClick={() => {
								navigate('/');
							}}
						/>
					</Tooltip>
					<Space wrap style={{ width: '100%', justifyContent: 'space-between' }}>
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
					</Space>
				</Space>
			</Header>
			<Content style={{ padding: 16, width: '100vw', minHeight: 'calc(100vh - 134px)', height: 'calc(100vh - 134px)', overflow: 'auto' }}>
				{children}
			</Content>
			<Footer style={{ textAlign: 'center', backgroundColor: colorBgContainer, fontFamily: 'Star Jedi' }}>Alexey Gerasimov. 2023</Footer>
		</AntLayout>
	);
}
