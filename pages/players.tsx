import React, { FC, useEffect, useState } from 'react';
import { Player } from '.';
import { db } from '../firebase';
import styles from '../styles/Home.module.css';

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
	return (
		<div className={styles.container}>
			<h3>Players</h3>
			<div>
				{players.map((p) => (
					<PlayerCard key={p.id} player={p} />
				))}
			</div>
		</div>
	);
};

export default Players;

const PlayerCard: FC<{ player: Player }> = ({ player }) => {
	return (
		<div className={styles.card}>
			<div>
				<p>{player.name}</p>
				<p>{player.lastName}</p>
			</div>
			<div></div>
		</div>
	);
};
