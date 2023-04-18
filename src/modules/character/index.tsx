import { DefaultParams, useLocation, useRoute } from 'wouter';
import { Avatar, Breadcrumb, Card, Col, Descriptions, Image, Row, Skeleton, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getCharacterRequest } from 'src/modules/character/thunks';
import { getCharactersRequest } from 'src/modules/characters/thunks';
import Loader from 'src/components/loader';
import { getIDFromURL } from 'src/helpers';

interface IProps {
	params: {
		id: number;
	};
}

export default function index() {
	const [_loc, navigate] = useLocation();
	const [_match, params] = useRoute('/character/:id');
	const character = useAppSelector((state) => state.characterReducer.character);
	const characters = useAppSelector((state) => state.charactersReducer.results);
	const isFetching = useAppSelector((state) => state.characterReducer.isFetching);
	const isCharactersFetching = useAppSelector((state) => state.charactersReducer.isFetching);
	const [visible, setVisible] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (params?.id) {
			dispatch(getCharacterRequest(+params.id));
			dispatch(getCharactersRequest());
		} else {
			navigate('/');
		}
	}, [params?.id]);

	const companions = useMemo(() => [...characters].sort(() => 0.5 - Math.random()).slice(0, 4), [characters]);

	return (
		<Spin spinning={isFetching || isCharactersFetching} indicator={<Loader />}>
			<Space>
				<Breadcrumb separator="/" style={{ margin: '16px 0', fontFamily: 'Star Jedi' }}>
					<Breadcrumb.Item className="breadcrumb" onClick={() => navigate('/')}>
						Characters
					</Breadcrumb.Item>
					<Breadcrumb.Item>{!character.name ? <Skeleton /> : character.name}</Breadcrumb.Item>
				</Breadcrumb>
			</Space>
			<Row gutter={[16, 16]} wrap>
				<Col md={12} flex={1} xs={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<>
						<Image preview={{ visible: false }} src="/jedi_1.jpeg" onClick={() => setVisible(true)} />
						<div style={{ display: 'none' }}>
							<Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
								<Image src="/jedi_1.jpeg" />
								<Image src="/jedi_2.jpeg" />
							</Image.PreviewGroup>
						</div>
					</>
				</Col>
				<Col md={12} flex={1} xs={24}>
					<Space direction="vertical" style={{ width: '100%' }}>
						<Descriptions title="About character" layout="vertical" bordered column={1}>
							<Descriptions.Item className="card-grid-item__description">
								<b style={{ whiteSpace: 'nowrap', fontFamily: 'Star Jedi' }}>Birth year:</b> {character.birth_year}
							</Descriptions.Item>
							<Descriptions.Item className="card-grid-item__description">
								<b style={{ whiteSpace: 'nowrap', fontFamily: 'Star Jedi' }}>Height:</b> {character.height} cm
							</Descriptions.Item>
							<Descriptions.Item className="card-grid-item__description">
								<b style={{ whiteSpace: 'nowrap', fontFamily: 'Star Jedi' }}>Mass:</b> {character.mass}
							</Descriptions.Item>
							<Descriptions.Item className="card-grid-item__description">
								<b>Eye color:</b> {character.eye_color}
							</Descriptions.Item>
						</Descriptions>
						<Card title="Companions">
							{companions.map(({ name, url, gender }) => (
								<Card.Grid className="card-grid-item" key={url} onClick={() => navigate(`/character/${getIDFromURL(url)}`)}>
									<Card.Meta
										avatar={
											<Avatar
												src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=2&nocache=${Math.round(Math.random() * 1000000000).toString(16)}`}
											/>
										}
										title={name.toLowerCase()}
										description={`Gender: ${gender.toLowerCase()}`}
										style={{ fontFamily: 'Star Jedi, sans-serif' }}
									/>
								</Card.Grid>
							))}
						</Card>
					</Space>
				</Col>
			</Row>
		</Spin>
	);
}
