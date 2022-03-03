import React, { useEffect, useState } from 'react';
import { Player } from '.';
import { db } from '../firebase';

const Players = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	useEffect(() => {
		const sub = db
			.collection('players')
			.onSnapshot((snap) =>
				setPlayers(
					snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Player))
				)
			);
		return sub;
	}, []);
	return <div>players {players.length}</div>;
};

export default Players;
