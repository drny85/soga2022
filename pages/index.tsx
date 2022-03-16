import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { GiBilledCap } from 'react-icons/gi';
import { FaTshirt } from 'react-icons/fa';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import styles from '../styles/Home.module.css';

export interface Player {
	id?: string;
	name: string;
	lastName: string;
	jersey: number;
	size: string;
}

const Home: NextPage = () => {
	const [name, setName] = useState('');
	const [lastName, setLastName] = useState('');
	const [jersey, setJeysey] = useState('');
	const [size, setSize] = useState('');
	const [players, setPlayers] = useState<Player[]>([]);
	const [message, setMessage] = useState<null | string>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const nameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const sizeRef = useRef<HTMLSelectElement>(null);
	const jerseyRef = useRef<HTMLSelectElement>(null);

	const clearMessage = () => {
		setTimeout(() => {
			setMessage(null);
		}, 4000);
	};

	const numberIsTaken = async (n: number): Promise<boolean> => {
		try {
			setLoading(true);
			const isTaken = players.filter((p) => p.jersey === n).length > 0;
			console.log(isTaken);
			return isTaken;
		} catch (error) {
			return false;
		} finally {
			setLoading(false);
		}
	};

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();
		if (name.length < 3) {
			setMessage('Name is required');
			nameRef.current?.focus();
			clearMessage();

			return;
		} else if (lastName.length < 3) {
			lastNameRef.current?.focus();
			setMessage('Last Name is required');

			clearMessage();
			return;
		} else if (jersey.length === 0) {
			setMessage(`Elije un numero ${name}`);
			jerseyRef.current?.focus();
			clearMessage();
			return;
		} else if (size.length === 0) {
			setMessage(`Elije un size ${name}`);
			sizeRef.current?.focus();
			clearMessage();
		} else {
			try {
				setLoading(true);
				const taken = await numberIsTaken(Number(jersey));

				if (taken) {
					setMessage(`Numero ${jersey} ya esta tomado`);
					clearMessage();
					return;
				}
				const p: Player = {
					name,
					jersey: Number(jersey),
					lastName,
					size,
				};
				if (name.toLowerCase() === 'breidys' && size === 'Medium') {
					alert('Tu esta seguro rata que ese es tu size?');
				}
				await db.collection('players').add(p);
				setMessage('it looks good!');
				setName('');
				setLastName('');
				setJeysey('');
				setSize('');
				clearMessage();
				router.push('/players');
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

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
			<Head>
				<title>Team Soga 2022</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h2>Team Soga 2022 Uniforms</h2>
				{message && (
					<div className={styles.message}>
						<p>{message}</p>
					</div>
				)}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-around',
						width: '200px',
					}}
				>
					<p>
						<b>$45 </b>for Hat{' '}
					</p>
					<GiBilledCap size={30} />
					<FaTshirt size={30} />
				</div>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<p style={{ paddingRight: '1rem' }}>
						<b>$15</b> for any additional
					</p>
					<GiBilledCap size={30} />
				</div>
				<form className={styles.card} onSubmit={submitForm}>
					<input
						type='text'
						ref={nameRef}
						autoFocus={true}
						className={styles.input}
						placeholder='First Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type='text'
						ref={lastNameRef}
						className={styles.input}
						placeholder={'Last Name'}
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					<select
						ref={sizeRef}
						className={styles.input}
						value={size}
						onChange={(e) => setSize(e.target.value)}
					>
						<option value=''>Select a Size</option>
						<option value='small'>Small / S</option>
						<option value='Medium'>Medium / M</option>
						<option value='Large'>Large / L</option>
						<option value='Extra Large'>Extra Large / XL</option>
					</select>
					<select
						className={styles.input}
						ref={jerseyRef}
						value={jersey}
						onChange={(e) => setJeysey(e.target.value)}
					>
						<option>Numero de Jersey</option>
						{[...Array.from(Array(99))].map((s, index) => (
							<option style={{ paddingRight: '12px' }} key={index}>
								{index + 1}
							</option>
						))}
					</select>

					<input
						disabled={loading}
						style={{
							backgroundColor: 'ButtonShadow',
							fontWeight: 'bold',
							fontSize: '1.5rem',
							cursor: 'pointer',
						}}
						className={styles.input}
						type='submit'
						value={loading ? 'Saving' : 'Submit'}
					/>
				</form>
				<div
					style={{
						maxWidth: '500px',
						marginTop: '1.5rem',
						backgroundColor: 'ButtonFace',
						padding: '12px 20px',
						borderRadius: '25px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Link href={'/players'}>View All Players</Link>
				</div>
			</main>
		</div>
	);
};

export default Home;
