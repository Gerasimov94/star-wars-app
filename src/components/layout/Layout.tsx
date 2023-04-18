import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Layout as AntLayout, Button, Input, Space, Tooltip, theme } from 'antd';
import { ThemeModes, useThemeContext } from 'src/common/context/ThemeContext';
import { useLocation } from 'wouter';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { getCharactersRequest } from 'src/modules/characters/thunks';
import { useAppDispatch } from 'src/hooks';
import { debounce } from 'src/helpers';

interface IProps {
	children: React.ReactNode;
}

const { Header, Content, Footer } = AntLayout;

export default function Layout({ children }: IProps) {
	const {
		token: { colorBgContainer, colorTextDisabled },
	} = theme.useToken();

	const { mode, setThemeMode } = useThemeContext();
	const [searchText, setSearchText] = useState('');
	const dispatch = useAppDispatch();
	const [location] = useLocation();
	const isMainRoute = location === '/';

	useEffect(() => {
		if (isMainRoute) {
			const abortController = new AbortController();
			dispatch(getCharactersRequest(abortController, { search: searchText }));

			return () => {
				abortController.abort();
			};
		}
	}, [searchText, isMainRoute]);

	const isLightMode = mode === ThemeModes.LIGHT;

	const getCharactersByName: React.ChangeEventHandler<HTMLInputElement> = useMemo(
		() =>
			debounce((event) => {
				setSearchText(event.target.value);
			}, 500),
		[],
	);

	return (
		<AntLayout style={{ height: '100vh' }}>
			<Header style={{ zIndex: 1, width: '100vw', height: 64, backgroundColor: colorBgContainer }}>
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
					{isMainRoute && (
						<Input
							placeholder="Enter your username"
							prefix={<UserOutlined className="site-form-item-icon" />}
							suffix={
								<Tooltip title="Use Force to find a person into galaxy">
									<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
								</Tooltip>
							}
							onChange={getCharactersByName}
						/>
					)}
				</Space>
			</Header>
			<Content style={{ padding: 16, width: '100vw', minHeight: 'calc(100vh - 134px)', height: 'calc(100vh - 134px)', overflow: 'auto' }}>
				{children}
			</Content>
			<Footer style={{ textAlign: 'center', backgroundColor: colorBgContainer, fontFamily: 'Star Jedi' }}>Alexey Gerasimov. 2023</Footer>
		</AntLayout>
	);
}
