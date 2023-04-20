import React, { useMemo } from 'react';
import { Layout as AntLayout, Button, Space, Tooltip, theme } from 'antd';
import { ThemeModes, useThemeContext } from 'src/common/context/ThemeContext';
import { useLocation } from 'wouter';
import 'src/components/layout/index.css';

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

	const headerStyles = useMemo(() => ({ zIndex: 1, width: '100vw', height: 64, backgroundColor: colorBgContainer }), [colorBgContainer]);
	const footerStyles = useMemo(
		() => ({ textAlign: 'center', backgroundColor: colorBgContainer, fontFamily: 'Star Jedi' } as const),
		[colorBgContainer],
	);
	const buttonStyles = useMemo(
		() => ({ backgroundColor: 'white', border: `2px solid ${colorTextDisabled}`, height: 48, width: 48 }),
		[colorBgContainer],
	);

	return (
		<AntLayout className="layout">
			<Header style={headerStyles}>
				<Space wrap className="layout__header_content">
					<Tooltip title={`Into the ${isLightMode ? 'Rebels' : 'Empire'} database`} placement="right">
						<Button
							shape="circle"
							style={buttonStyles}
							icon={<img src={isLightMode ? '/rebels.png' : '/empire.png'} width={36} height={36} />}
							onClick={() => {
								navigate('/');
							}}
						/>
					</Tooltip>
					<Space wrap className="layout__header_content">
						<Tooltip title={`Swap to the ${isLightMode ? ThemeModes.DARK : ThemeModes.LIGHT} side`} placement="right">
							<Button
								shape="circle"
								style={buttonStyles}
								icon={<img src={isLightMode ? '/master_yoda.webp' : '/vader.png'} width={36} height={36} />}
								onClick={() => {
									setThemeMode(isLightMode ? ThemeModes.DARK : ThemeModes.LIGHT);
								}}
							/>
						</Tooltip>
					</Space>
				</Space>
			</Header>
			<Content className="layout__content">{children}</Content>
			<Footer style={footerStyles}>Alexey Gerasimov. 2023</Footer>
		</AntLayout>
	);
}
