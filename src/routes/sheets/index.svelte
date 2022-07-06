<script lang="ts">
	// import { enhance } from '$lib/form';
	// import { scale } from 'svelte/transition';
	// import { flip } from 'svelte/animate';

	type MusicData = {
		title: string
		artists: string[]
        releaseDate: Date
		lyricist?: string
	}

	enum SheetDifficulty {
		BEGINNER = "BEGINNER",
		INTERMEDIATE = "INTERMEDIATE",
		HARD = "HARD",
		ADVANCED = "ADVANCED",
	}

	type ArrangementData = {
		createdAt: Date
        arranger: string
		difficulty?: SheetDifficulty
	}

	type SheetLinks = {
        youtube?: URL
        musescore?: URL
	}

	type SheetMusic = {
		uid: string
		music: MusicData
		arrangement: ArrangementData
		links?: SheetLinks

	};

	export let sheets: SheetMusic[] = [
		{uid: '123', music: {title: 'Golden Wind', artists: ['Yugo Kanno'], releaseDate: new Date('December 18, 2018')}, arrangement: {createdAt: new Date(), arranger: 'Moi'}, links: {youtube: new URL('https://www.youtube.com')}},
		{uid: '1234', music: {title: 'Golden Wind 2: Electric Boogaloo', artists: ['Yugo Kanno', 'Ur mum'], releaseDate: new Date('December 18, 2019')}, arrangement: {createdAt: new Date(), arranger: 'Moi', difficulty: SheetDifficulty.ADVANCED}},
	
	];
</script>

<svelte:head>
	<title>Sheet Music</title>
	<meta name="description" content="Sheet music" />
</svelte:head>

<div class="grid grid-cols-3 bg-stone-900">
	<!-- SheetMusic Info Card -->
	{#each sheets as sheet (sheet.uid)}
	<div class="flex flex-col p-2 mx-4 my-2 shadow-sm bg-stone-800 items-center text-white rounded-sm">
		<!-- Music/Song/Piece data -->
		<div class="flex flex-col my-1">
			<h2 class="text-2xl">{sheet.music.title}</h2>
			<p>{sheet.music.artists.length == 1 ? 'Artist' : 'Artists'}: {sheet.music.artists.toString()}</p>
			{#if sheet.music.lyricist}
			<p>Lyricist: {sheet.music.lyricist}</p>
			{/if}
			<p>Released: {sheet.music.releaseDate.toDateString()}</p>
		</div>

		<!-- Links -->
		{#if sheet.links}
		<div class="flex flex-col my-1 items-center">
			{#if sheet.links.youtube}
			<a class="text-blue-100 visited:text-purple-600" href="{sheet.links.youtube.toString()}" target="_blank">YouTube</a>
			{/if}
			{#if sheet.links.musescore}
			<a class="text-blue-100 visited:text-purple-600" href="{sheet.links.musescore.toString()}" target="_blank">MuseScore</a>
			{/if}
		</div>
		{/if}

		<!-- Arrangement data -->
		<div class="flex flex-col items-center my-1">
			{#if sheet.arrangement.difficulty}
			<p>{sheet.arrangement.difficulty}</p>
			{/if}
			<p>Uploaded to site on {sheet.arrangement.createdAt.toDateString()}</p>
			<p>Arranged by {sheet.arrangement.arranger}</p>
		</div>
	</div>
	{/each}
</div>