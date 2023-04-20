import { Avatar, Card, Descriptions, Divider, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined, EnterOutlined } from '@ant-design/icons';
import { ICharacter } from 'src/common/types';
import { useMemo, useState } from 'react';
import { removeCharacter } from 'src/modules/characters/slice';
import { useAppDispatch } from 'src/hooks';
import { useLocation } from 'wouter';
import { getIDFromURL } from 'src/helpers';
import CharacterEditModal from 'src/modules/characters/modals/CharacterEditModal';

interface IProps {
	isFetching: boolean;
	character: ICharacter;
}

const { Meta } = Card;

const breakpoints = { xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 };

export default function CharacterCard({ isFetching, character }: IProps) {
	const dispatch = useAppDispatch();
	const [_loc, navigate] = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const charID = useMemo(() => getIDFromURL(character.url), [character.url]);

	const avatar = useMemo(
		() => `https://xsgames.co/randomusers/avatar.php?g=pixel&key=2&nocache=${Math.round(Math.random() * 1000000000).toString(16)}`,
		[],
	);

	return (
		<>
			<CharacterEditModal isOpen={isOpen} setIsOpen={setIsOpen} character={character} />
			<Card
				className="margin-top-16"
				actions={[
					<EnterOutlined key="enter" onClick={() => navigate(`/character/${charID}`)} />,
					<EditOutlined key="edit" data-testid="edit-icon" onClick={() => setIsOpen(true)} />,
					<DeleteOutlined key="delete" onClick={() => dispatch(removeCharacter(character.url))} />,
				]}
			>
				<Skeleton loading={isFetching} avatar active>
					<Meta
						avatar={<Avatar src={avatar} />}
						title={character.name.toLowerCase()}
						description={`Gender: ${character.gender.toLowerCase()}`}
						className="text--star-jedi"
					/>
				</Skeleton>

				<Skeleton loading={isFetching} active style={{ height: 260 }}>
					<Divider />
					<Descriptions title="Params" bordered column={breakpoints}>
						<Descriptions.Item>
							<b className="text--no-wrap">Birth year:</b> {character.birth_year}
						</Descriptions.Item>
						<Descriptions.Item>
							<b className="text--no-wrap">Height:</b> {character.height} cm
						</Descriptions.Item>
						<Descriptions.Item>
							<b className="text--no-wrap">Mass:</b> {character.mass}
						</Descriptions.Item>
						<Descriptions.Item>
							<b className="text--no-wrap">Eye color:</b> {character.eye_color}
						</Descriptions.Item>
					</Descriptions>
				</Skeleton>
			</Card>
		</>
	);
}
