import { Avatar, Card, Descriptions, Divider, Skeleton } from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { ICharacter } from 'src/common/types';
import { useMemo } from 'react';

interface IProps {
	isFetching: boolean;
	character: ICharacter;
}

const { Meta } = Card;

export default function CharacterCard({ isFetching, character }: IProps) {
	const avatar = useMemo(
		() => `https://xsgames.co/randomusers/avatar.php?g=pixel&key=2&nocache=${Math.round(Math.random() * 1000000000).toString(16)}`,
		[],
	);

	return (
		<Card style={{ marginTop: 16 }} actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <DeleteOutlined key="ellipsis" />]}>
			<Skeleton loading={isFetching} avatar active>
				<Meta avatar={<Avatar src={avatar} />} title={character.name} description={`Gender: ${character.gender}`} />
				<Divider />
				<Descriptions title="Params" bordered column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}>
					<Descriptions.Item>
						<b style={{ whiteSpace: 'nowrap' }}>Birth year:</b> {character.birth_year}
					</Descriptions.Item>
					<Descriptions.Item>
						<b style={{ whiteSpace: 'nowrap' }}>Height:</b> {character.height} cm
					</Descriptions.Item>
					<Descriptions.Item>
						<b style={{ whiteSpace: 'nowrap' }}>Mass:</b> {character.mass}
					</Descriptions.Item>
					<Descriptions.Item>
						<b style={{ whiteSpace: 'nowrap' }}>Eye color:</b> {character.eye_color}
					</Descriptions.Item>
				</Descriptions>
			</Skeleton>
		</Card>
	);
}
