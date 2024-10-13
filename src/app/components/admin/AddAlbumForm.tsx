'use client';

import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

const AddAlbumForm = () => {
	const supabase = createClient();

	//New album info
	const [name, setName] = useState('');
	const [artist, setArtist] = useState('');
	const [year, setYear] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [spotifyShare, setSpotifyShare] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		let imagePath = '';
		if (imageFile) {
			const { data: imageData, error: imageError } =
				await supabase.storage
					.from('album_covers')
					.upload(
						`images/${encodeURIComponent(imageFile.name.replaceAll(' ', '_'))}`,
						imageFile,
						{
							cacheControl: '3600',
							upsert: false,
						},
					);

			if (imageError) {
				console.error('Error uploading image:', imageError);
			} else {
				console.log('Image uploaded:', imageData);
				imagePath = imageData.fullPath;
			}
		}

		const { data: albumData, error: albumError } = await supabase
			.from('albums')
			.insert([
				{
					name,
					artist,
					year: parseInt(year),
					img_url: imagePath
						? `https://odtuzylskxoqszhphpfr.supabase.co/storage/v1/object/public/${imagePath}`
						: null,
					spotify_share: spotifyShare,
					score: 0,
				},
			]);
		if (albumError) {
			console.error('Error adding album:', albumError);
		} else {
			console.log('Album added:', albumData);
			setName('');
			setArtist('');
			setYear('');
			setImageFile(null);
			setSpotifyShare('');
		}
		setIsSubmitting(false);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImageFile(e.target.files[0]);
		}
	};

	return (
		<form
			onSubmit={onSubmit}
			className="flex flex-col gap-2 p-4 bg-neutral-100 border-neutral-200"
		>
			<div>
				<label htmlFor="name">Albumin nimi</label>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="artist">Artisti</label>
				<input
					type="text"
					name="artist"
					value={artist}
					onChange={(e) => setArtist(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="year">Vuosi</label>
				<input
					type="number"
					name="year"
					value={year}
					onChange={(e) => setYear(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor="image">
					Kuva (.jpg/.jpeg/.png/.webp, max 5MB)
				</label>
				<input
					type="file"
					name="image"
					onChange={handleFileChange}
					accept="image/png, image/jpeg, image/jpg, image/webp"
					className="border-none p-0 bg-transparent"
				/>
			</div>
			<div>
				<label htmlFor="spotify">Spotify share link</label>
				<input
					type="text"
					name="spotify"
					value={spotifyShare}
					onChange={(e) => setSpotifyShare(e.target.value)}
				/>
			</div>
			<button
				type="submit"
				disabled={isSubmitting}
				className={`bg-black text-white self-end py-2 w-1/3 mt-2 ${isSubmitting && 'opacity-50'}`}
			>
				Lisää albumi
			</button>
		</form>
	);
};

export default AddAlbumForm;
