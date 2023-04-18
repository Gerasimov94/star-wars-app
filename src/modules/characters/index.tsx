import { List, Spin } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import CharacterCard from 'src/components/card/CharacterCard';
import Loader from 'src/components/loader';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getCharactersRequest } from 'src/modules/characters/thunks';

export default function CharactersRoot() {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useAppDispatch();
	const characters = useAppSelector((state) => state.charactersReducer.results);
	const total = useAppSelector((state) => state.charactersReducer.count);
	const isFetching = useAppSelector((state) => state.charactersReducer.isFetching);

	useEffect(() => {
		(async () => {
			await dispatch(getCharactersRequest());

			setIsLoaded(true);
		})();
	}, []);

	const onPaginationChange = useCallback((page: number) => {
		dispatch(getCharactersRequest({ page, search: '' }));
	}, []);

	return (
		<List
			loading={{
				indicator: <Spin indicator={<Loader />} />,
				spinning: isFetching || !isLoaded,
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
	);
}
