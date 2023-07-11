<svelte:head>
	<title>Home</title>
	<meta name="description" content="DAOLabs animation urls" />
</svelte:head>

<section>
	<div class="welcome">
		<div class="welcome-img">
			<img src="daolabs-welcome.png" alt="Welcome" />
		</div>
	</div>

	<h2>Animation routes</h2>

	<div class="routes">
		<div class="route-group">
			<h3>Images</h3>
			<ul>
				<li>
					<a href="/images/card-vertical?spin=true&title=MEOW&background=slategray" target="_blank"
						>Card Vertical</a
					>
				</li>
				<li>
					<a href="/images/card-horizontal?spin=true&title=MEOW&background=pink" target="_blank"
						>Card Horizontal</a
					>
				</li>
				<li>
					<a href="/images/card-round?spin=true&title=MEOW&background=black" target="_blank"
						>Card Round</a
					>
				</li>
			</ul>
		</div>

		<div class="route-group">
			<h3>Video</h3>
			<ul>
				<li>
					<a
						href="/video?video=bafybeiaqyn5wolrdfcskbicvuwden75cwdn3cr7fjliaj4lsj7zziqzkii&config=eyJoZWlnaHQiOjQ1MCwid2lkdGgiOjkwMH0="
						target="_blank">Fixed resolution</a
					>
				</li>
				<li>
					<a
						href="video?video=bafybeihsz2r72omrnsiqxksbacby7ajw4eqguyjv42h3deixtnmf4jwhlm"
						target="_blank">Fullscreen</a
					>
				</li>
			</ul>
		</div>
		<div class="route-group">
			<h3>p5js</h3>
			<ul>
				<li>
					<a
						href="/p5js?script=QmcGKReCjttTrvNkYm41jpDnNmD2gMVtjepsthpfrPB2vd&config=eyJzZWVkIjo1MCwid2lkdGgiOiI1MDBweCIsImhlaWdodCI6IjUwMHB4In0="
						target="_blank">Fixed resolution</a
					>
				</li>
				<li>
					<a
						href="/p5js?script=QmcGKReCjttTrvNkYm41jpDnNmD2gMVtjepsthpfrPB2vd&config=eyJzZWVkIjoyMCwiZnVsbHNjcmVlbiI6dHJ1ZSwicmVzcGVjdEFzcGVjdFJhdGlvIjp0cnVlfQ=="
						target="_blank">Fullscreen</a
					>
				</li>
			</ul>
		</div>
		<div class="route-group">
			<h3>Music</h3>
			<ul>
				<li>
					<a href="/music" target="_blank">Music player</a>
				</li>
			</ul>
		</div>
	</div>
</section>

<style>
	:global(body, html) {
		margin: 0;
		padding: 0;
	}
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	a {
		text-decoration: none;
		color: var(--primary);
		font-weight: 600;
	}

	/* ul {
		list-style-image: url('/tomato.png');
	} */
	li {
		font-size: 18px;
		list-style: none;
	}
	li::before {
		content: '';
		display: inline-block;
		height: 14px;
		width: 18px;
		background-image: url('/tomato.png');
		background-size: cover;
		margin-right: 10px;
	}

	.welcome {
		position: relative;
		width: 100%;
	}

	/* .welcome h1 {
		position: absolute;
		top: 80%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 2vw;
		color: white;
	} */

	.welcome-img {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome-img img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}

	.routes {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.route-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 20px;
	}

	/* @media (max-width: 500px) {
		.welcome h1 {
			font-size: 1rem;
		}
	} */
</style>
