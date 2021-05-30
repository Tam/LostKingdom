import css from '../styles/home.module.scss';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { useEffect, useRef, useState } from 'react';
import fuzzy from '../content/fuzzy';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import matter from 'gray-matter';

const filter = (v, file) => {
	for (let i = 0, l = file.meta.tags.length; i < l; i++) {
		if (fuzzy(v, file.meta.tags[i])) {
			file.score = i === 0 && file.meta.tags[i].toLowerCase().indexOf(v) > -1 ? 9999 : file.defaultScore;
			return true;
		}
	}

	file.score = file.defaultScore;
	return false;
};

const Tags = ({ file }) => file.meta.tags.length < 2 ? null : (
	<ul className={css.tags}>
		{file.meta.tags.slice(1).map(tag => (
			<li key={tag}>{tag}</li>
		))}
	</ul>
);

export default function Home ({ files }) {
	const copy = useRef()
		, search = useRef();

	const [f, setF] = useState([])
		, [active, setActive] = useState(0);

	useEffect(() => {
		if (!search.current)
			return;

		const onKeyDown = e => {
			switch (e.key) {
				case '/':
					e.preventDefault();
					search.current.focus();
					break;
				case 'ArrowUp':
					e.preventDefault();
					setActive(a => --a < 0 ? 0 : a);
					break;
				case 'ArrowDown':
					e.preventDefault();
					setF(f => {
						setActive(a => {
							a += 1;
							if (a > f.length - 1) a = f.length - 1;
							return a;
						});

						return f;
					});
					break;
			}
		};

		document.addEventListener('keydown', onKeyDown);

		return () => {
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [search, setActive]);

	const onInput = e => {
		const v = e.target.value.trim();

		setActive(0);

		if (v === '') setF([]);
		else setF(files.filter(f => filter(v, f)).sort((a, b) => b.score - a.score));
	};

	const onKeyDown = e => {
		if (e.key !== 'Enter')
			return;

		copy.current.select();
		document.execCommand('copy');
		search.current.focus();
	};

	return (
		<main className={css.main}>
			<Head>
				<title>Lost Kingdom of Javascript</title>
				<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕳</text></svg>" />
			</Head>

			<textarea
				ref={copy}
				className={css.copy}
				value={f.length ? f[0].contents : ''}
				readOnly
			/>

			<input
				className={css.search}
				type="search"
				autoFocus
				onInput={onInput}
				onKeyDown={onKeyDown}
				ref={search}
				placeholder="Type to search, hit Enter to copy"
			/>

			<ul className={css.list}>
				{f.length > 0 ? f.map((file, i) => i === active ? (
					<li key={file.filename} className={css.item}>
						<header>
							<strong>{file.filename}</strong>
							<Tags file={file} />
						</header>
						<SyntaxHighlighter
							language={file.type}
							style={githubGist}
						>
							{file.contents}
						</SyntaxHighlighter>
					</li>
				) : (
					<li key={file.filename}>
						<div>
							{file.filename}
							<small>{file.meta.description}</small>
						</div>
						<Tags file={file} />
					</li>
				)) : files.map(file => (
					<li key={file.filename}>
						<div>
							{file.filename}
							<small>{file.meta.description}</small>
						</div>
						<Tags file={file} />
					</li>
				))}
			</ul>
		</main>
	);
}

export async function getStaticProps () {
	const delims = {
		js: ['/*---', '---*/'],
		html: ['<!---', '--->'],
	};

	const files = fs.readdirSync('content').map(file => {
		let type = path.extname(file).substr(1);

		const { content: contents, data: meta } = matter(
			fs.readFileSync(`content/${file}`, 'utf8').trim(),
			{ delimiters: delims[type] }
		);

		if (!meta.hasOwnProperty('tags'))
			meta.tags = [];
		else
			meta.tags = meta.tags.split(/\s*,\s*/);
		meta.tags.unshift(file);

		if (type === 'js') type = 'javascript';

		return {
			filename: file,
			meta,
			contents,
			type,
		};
	}).sort(
		(a, b) => a.filename.localeCompare(b.filename)
	).map((file, i) => {
		file.score = 9999 - i;
		file.defaultScore = 9999 - i;
		return file;
	});

	return {
		props: {
			files,
		},
	};
}
