import type { Comment } from "./comment";

export interface Album {
    id: number;
    name: string;
    artist: string;
    year: number;
    img_url: string;
    score: number;
}

export interface AlbumWithComments extends Album {
    comments: Comment[];
}

