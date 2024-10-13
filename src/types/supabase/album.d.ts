import type { Comment } from './comment';

export interface Album {
	id: number;
	name: string;
	artist: string;
	year: number;
	img_url?: string;
	score?: number;
	spotify_share?: string;
}

export interface AlbumWithComments extends Album {
	comments: Comment[];
}
