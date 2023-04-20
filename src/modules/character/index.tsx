import { useLocation, useRoute } from 'wouter';
import { Avatar, Breadcrumb, Card, Col, Descriptions, Image, Row, Skeleton, Space, Spin } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getCharactersRequest } from 'src/modules/characters/thunks';
import Loader from 'src/components/loader';
import { getIDFromURL } from 'src/helpers';
import { getCharacters, getIsCharactersFetching } from 'src/modules/characters/selectors';
import { getCharacter, getIsCharacterFetching } from 'src/modules/character/selectors';
import { getCharacterRequest } from 'src/modules/character/thunks';
import 'src/modules/character/styles/index.css';

export default function index() {
	const [_loc, navigate] = useLocation();
	const [_match, params] = useRoute('/character/:id');
	const character = useAppSelector(getCharacter);
	const characters = useAppSelector(getCharacters);
	const isFetching = useAppSelector(getIsCharacterFetching);
	const isCharactersFetching = useAppSelector(getIsCharactersFetching);
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
		<Spin spinning={isFetching || isCharactersFetching} indicator={<Loader />} wrapperClassName="character__spinner">
			<Breadcrumb
				className="character__breadcrumbs text--star-jedi"
				items={[
					{
						title: 'Characters',
						onClick: () => navigate('/'),
						className: 'breadcrumb text--star-jedi',
					},
					{
						title: !character.name ? <Skeleton /> : character.name.toLowerCase(),
					},
				]}
			/>
			<Row gutter={[0, 16]} wrap className="character__row">
				<Col md={12} flex={1} xs={24} className="character__image-container ">
					<>
						<Image preview={{ visible: false }} src="/jedi_1.jpeg" onClick={() => setVisible(true)} />
						<div className="display--none">
							<Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
								<Image src="/jedi_1.jpeg" />
								<Image src="/jedi_2.jpeg" />
							</Image.PreviewGroup>
						</div>
					</>
				</Col>
				<Col md={12} flex={1} xs={24}>
					<Space direction="vertical" className="width-100-percents">
						<Descriptions title={<span className="text--star-jedi">About character</span>} layout="vertical" bordered column={1}>
							<Descriptions.Item>
								<b className="text--star-jedi character__description">Birth year:</b> {character.birth_year}
							</Descriptions.Item>
							<Descriptions.Item>
								<b className="text--star-jedi character__description">Height:</b> {character.height} cm
							</Descriptions.Item>
							<Descriptions.Item>
								<b className="text--star-jedi character__description">Mass:</b> {character.mass}
							</Descriptions.Item>
							<Descriptions.Item>
								<b className="text--star-jedi character__description">Eye color:</b> {character.eye_color}
							</Descriptions.Item>
						</Descriptions>
						<Card title={<div className="text--star-jedi">Companions</div>}>
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
										className="text--star-jedi"
									/>
								</Card.Grid>
							))}
						</Card>
						<br />
					</Space>
				</Col>
			</Row>
		</Spin>
	);
}
