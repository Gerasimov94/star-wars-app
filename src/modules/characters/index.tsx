import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Select, Input, List, Space, Spin, Tooltip, Tag } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import CharacterCard from 'src/components/card/CharacterCard';
import Loader from 'src/components/loader';
import { debounce } from 'src/helpers';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getFilteredCharacters, getGendersFilter, getIsCharactersFetching, getTotalNumberOfCharacters } from 'src/modules/characters/selectors';
import { getCharactersRequest } from 'src/modules/characters/thunks';
import { Gender } from 'src/common/types';
import { updateFilters } from 'src/modules/characters/slice';

const filterOptions = Object.values(Gender).map((value) => ({ value }));

const tagRender = (props: CustomTagProps) => {
	const { label, closable, onClose } = props;
	const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
		event.preventDefault();
		event.stopPropagation();
	};
	return (
		<Tag onMouseDown={onPreventMouseDown} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
			{label}
		</Tag>
	);
};

export default function CharactersRoot() {
	const abortControllerRef = useRef(new AbortController());
	const [searchText, setSearchText] = useState('');
	const dispatch = useAppDispatch();
	const characters = useAppSelector(getFilteredCharacters);
	const isFetching = useAppSelector(getIsCharactersFetching);
	const genderFilter = useAppSelector(getGendersFilter);
	const total = useAppSelector(getTotalNumberOfCharacters);

	const onPaginationChange = useCallback(
		(page: number) => {
			dispatch(getCharactersRequest(abortControllerRef.current, { page, search: '' }));
		},
		[abortControllerRef.current],
	);

	useEffect(() => {
		const abortController = new AbortController();
		dispatch(getCharactersRequest(abortController, { search: searchText }));

		return () => {
			abortController.abort();
		};
	}, [searchText]);

	const getCharactersByName: React.ChangeEventHandler<HTMLInputElement> = useMemo(
		() =>
			debounce((event) => {
				setSearchText(event.target.value);
			}, 500),
		[],
	);

	const onSelectChange = (params: Gender[]) => {
		dispatch(updateFilters(params));
	};

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Space style={{ justifyContent: 'space-between', display: 'flex' }}>
				<Select
					mode="multiple"
					showArrow
					tagRender={tagRender}
					value={genderFilter}
					onChange={onSelectChange}
					style={{ width: '100%' }}
					options={filterOptions}
				/>
				<Input
					placeholder="Enter your character"
					prefix={<UserOutlined className="site-form-item-icon" />}
					suffix={
						<Tooltip title="Use Force to find a person into galaxy">
							<InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
						</Tooltip>
					}
					onChange={getCharactersByName}
				/>
			</Space>
			<List
				loading={{
					indicator: <Spin indicator={<Loader />} />,
					spinning: isFetching,
					style: { overflow: 'hidden' },
				}}
				grid={{
					gutter: 16,
					xs: 1,
					sm: 2,
					md: 3,
					lg: 4,
					xl: 4,
					xxl: 4,
				}}
				pagination={{
					defaultCurrent: 1,
					total,
					onChange: onPaginationChange,
					position: 'bottom',
					align: 'center',
					hideOnSinglePage: true,
					defaultPageSize: 10,
					showSizeChanger: false,
				}}
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '16px 0px',
				}}
				dataSource={characters}
				renderItem={(character) => (
					<List.Item key={character.url}>
						<CharacterCard isFetching={isFetching} character={character} />
					</List.Item>
				)}
			/>
		</Space>
	);
}
