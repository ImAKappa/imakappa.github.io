<script lang="ts">
	import { enhance } from '$lib/form';
	import { scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	type MusicData = {
		title: string;
		artist: string;
        releaseDate: Date,
		lyricist?: string,
	}

	type ArrangementData = {
		createdAt: Date;
        arranger: string;

	}

	type SheetLinks = {
        youtube?: URL,
        musescore?: URL,
	}

	type SheetMusic = {
		uid: string;
		music: MusicData;
		arrangement: ArrangementData;
		links: SheetLinks;
	};

	export let sheets: SheetMusic[];
</script>

<svelte:head>
	<title>Sheet Music</title>
	<meta name="description" content="Sheet music" />
</svelte:head>

<div>
	{#each sheets as sheet (sheet.uid)}
	<div>
		<!-- Music/Song/Piece data -->
		<p>{sheet.music.title}</p>
		<p>{sheet.music.artist}</p>
		<p>{sheet.music.lyricist}</p>
		<p>{sheet.music.releaseDate}</p>
		<!-- Links -->
		{#if sheet.links.youtube}
		<a href="{sheet.links.youtube.toString()}">YouTube</a>
		{/if}
		{#if sheet.links.musescore}
		<a href="{sheet.links.musescore.toString()}">MuseScore</a>
		{/if}
		<!-- Arrangement data -->
		<p>Uploaded to site on {sheet.arrangement.createdAt}</p>
		<p>Arranged by {sheet.arrangement.arranger}</p>
	</div>
	{/each}
</div>