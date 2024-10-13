import AlbumList from '@/src/app/components/albums/AlbumList';

export default async function Index() {
	return (
		<>
			<div className="w-full p-4 md:p-12">
				<div className="pb-4 md:pb-6">
					<h1>Ala-asteen levyraati</h1>
				</div>
				<AlbumList />
			</div>
		</>
	);
}
