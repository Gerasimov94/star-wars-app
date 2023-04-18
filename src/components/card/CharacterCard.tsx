import { Avatar, Card, Skeleton, Space } from 'antd';
import { EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { ICharacter } from 'src/common/types';

interface IProps {
	isFetching: boolean;
	character: ICharacter;
}

const { Meta } = Card;

export default function CharacterCard({ isFetching, character }: IProps) {
	return (
		<Card style={{ marginTop: 16 }} actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <DeleteOutlined key="ellipsis" />]}>
			<Skeleton loading={isFetching} avatar active>
				<Meta
					avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
					title={character.name}
					description={character.gender}
				/>
				<Space direction="vertical">
					<p>Card content</p>
					<p>Card content</p>
					<p>Card content</p>
				</Space>
			</Skeleton>
		</Card>
	);
}
