import { useParams } from "react-router-dom"
import Player from "../components/props/Player"
import Recommended from "../components/Recommended"




const MoviePlayer = () => {
  const {movieid} = useParams()
  return (
    <div>
     <Player videoId={movieid} />
     <Recommended movieId={movieid} showType="movie" />
    </div>
  )
}

export default MoviePlayer
