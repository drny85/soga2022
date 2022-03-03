import React, { FC, useEffect, useState } from 'react';
import { Player } from '.';
import { db } from '../firebase';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

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
		<div
			style={{
				display: 'flex',
				width: '100vw',
				margin: '0 auto',
				flexDirection: 'column',
				height: '100vh',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					marginRight: 'auto',
					width: '100%',
					justifyContent: 'space-evenly',
				}}
			>
				<Link href='/' passHref>
					<p
						style={{
							cursor: 'pointer',
							padding: '12px 20px',
							backgroundColor: 'ButtonFace',
							borderRadius: '30px',
							marginRight: '2rem',
							fontWeight: 'bold',
							marginLeft: '10px',
						}}
					>
						Back
					</p>
				</Link>
				<h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Players</h3>
			</div>
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
		<div
			style={{
				display: 'flex',
				flex: 1,
				minWidth: '400px',
				boxShadow: '12px 8px 6px rgba(0,0,0,0.123)',
				justifyContent: 'space-between',
			}}
			className={styles.card}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<div style={{ display: 'flex', flex: 0.7 }}>
					<p
						style={{
							textTransform: 'capitalize',
							paddingRight: '10px',
							fontWeight: 'bold',
						}}
					>
						{player.name}
					</p>
					<p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
						{player.lastName}
					</p>
				</div>
				<div style={{ display: 'flex' }}>
					<p style={{ textTransform: 'capitalize', paddingRight: '10px' }}>
						{player.size}
					</p>
					<p>{player.jersey}</p>
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					flex: 0.4,
					maxHeight: '5rem',
					position: 'relative',
				}}
			>
				<Image
					src='/images/redsox1.png'
					width='100%'
					height='100%'
					alt='logo'
					objectFit='cover'
					objectPosition='center'
				/>
				<p
					style={{
						position: 'absolute',
						top: '30px',
						right: '55%',
						left: '38%',

						fontWeight: 'bold',
						transform: 'translateY(-50%, -50%)',
					}}
				>
					{player.jersey}
				</p>
			</div>
		</div>
	);
};
