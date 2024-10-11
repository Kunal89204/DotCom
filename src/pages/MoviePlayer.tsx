import { useParams } from "react-router-dom"
import Player from "../components/props/Player"



const MoviePlayer = () => {
  const {movieid} = useParams()
  return (
    <div>
     <Player videoId={movieid} />
    </div>
  )
}

export default MoviePlayer
