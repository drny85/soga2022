import React, { FC, useEffect, useState } from 'react';
import { Player } from '.';
import { db } from '../firebase';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Players = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const router = useRouter();
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
					maxWidth: '500px',
					justifyContent: 'space-between',
					margin: '0 auto',
				}}
			>
				<div
					onClick={() => router.replace('/')}
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
				</div>

				<h3 style={{ fontSize: '1.5rem', textAlign: 'center' }}>
					Players <span>({players.length})</span>
				</h3>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					padding: '12px 0px',
					width: '400px',
					justifyContent: 'space-between',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						style={{
							cursor: 'pointer',
							borderWidth: 1,
							borderColor: 'ButtonFace',
							padding: '10px 15px',
							backgroundColor: '#3ea859',
							borderRadius: '35px',
						}}
					>
						<a
							style={{
								color: '#ffffff',
								fontWeight: 'bold',
							}}
							href='https://cash.app/$sogateam'
						>
							$ Cash App Robert
						</a>
					</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<div
						style={{
							cursor: 'pointer',
							borderWidth: 1,
							borderColor: 'ButtonFace',
							padding: '10px 15px',
							backgroundColor: '#3ea859',
							borderRadius: '35px',
						}}
					>
						<a
							style={{
								color: '#ffffff',
								fontWeight: 'bold',
							}}
							href='https://cash.app/$ceballos1012'
						>
							$ Cash App Wilson
						</a>
					</div>
				</div>
			</div>

			<div>
				{players
					.sort((a, b) => (a.jersey > b.jersey ? 1 : -1))
					.map((p) => (
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
