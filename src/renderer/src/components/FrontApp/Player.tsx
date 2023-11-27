import { MusicMetadata } from "@renderer/types/metadatas";
import { useContext, useEffect, useState } from "react";
import AlbumCover from "./AlbumCover";
import TrackDetails from "./TrackDetails";
import PlayerController from "./PlayerController";
import MoreTools from "./MoreTools";
import { PlayerContext } from "@renderer/contexts/PlayerContext";

type MusicProps = MusicMetadata | null

function Player(){
	const { currentMusic, queueGlobal } = useContext(PlayerContext);
	const [music, setMusic] = useState<MusicProps>();

	useEffect(() => {
		if(currentMusic !== null){
			getMetadataAlbum(queueGlobal[currentMusic])
		}
	}, [currentMusic]);

	const musicStatus = music ? { 
		title: music.title,
		track: music.track,
		album: music.album,
		artist: music.artist,
		duration: music.duration
	} : null;

	return (
		<section className="flex flex-col justify-between pb-0 h-full rounded-md">
			<div className="flex flex-col gap-2 p-8">
				<AlbumCover 
					srcBase64={music?.srcCover} 
					mimeType={music?.mimeType} 
				/> 

				<div className="px-1 space-y-8">
					<TrackDetails 
						music={musicStatus}		
					/>

					<PlayerController durationTotal={music?.duration}/>

				</div>
			</div>

			<MoreTools />
		</section>
	)

	async function getMetadataAlbum(path: string) {
    const { checkPath } = window.api;
		const { meta, image } = await checkPath(path);
		
		if(meta){
			const { 
				common : { title, album, artist, track, picture }
			} = meta;

			setMusic({
				title,
				album,
				artist,
				mimeType: picture ? picture[0].format : picture,
				track: track.no,
				duration: meta.format.duration,
				srcCover: image
			})
		}
  }
}

export default Player;
