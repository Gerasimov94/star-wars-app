import React, { useEffect } from 'react';
import apiRequest from 'src/utils/request';
import { useDispatch } from 'react-redux';
import { setCharactersData } from 'src/modules/characters/slice';
import { useAppSelector } from 'src/hooks';

export default function CharactersRoot() {
	const dispatch = useDispatch();
	const data = useAppSelector((state) => state.charactersReducer.results);

	console.log(data);

	useEffect(() => {
		(async () => {
			const res = await apiRequest('/people');

			const aboba = await res.json();

			dispatch(setCharactersData(aboba));
		})();
	}, []);

	return (
		<div>
			{data.map((item) => (
				<div key={item.url}>{item.name}</div>
			))}
		</div>
	);
}
