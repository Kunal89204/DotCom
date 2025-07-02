

const ResultComp = (results: any) => {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w500/${results?.poster_path}`} alt="" />
    </div>
  )
}

export default ResultComp
