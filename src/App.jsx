import React, {useState, useEffect} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from 'react-use'


const API_BASE_URL='https://api.themoviedb.org/3'
const API_KEY=import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS ={
    method:'GET',
    headers: {
        accept:'application/json',
        Authorization:`Bearer ${API_KEY}`
    }
}

function App() {

    const [searchTerm, setSearchTerm] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

     useDebounce(() => setDebouncedSearchTerm(searchTerm), 500,
         [searchTerm])

    const fetchMovies = async(query='') => {
        setIsLoading(true)
        setErrorMessage('')

        try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
        const response = await fetch(endpoint, API_OPTIONS)

            if(!response.ok){
                throw new Error('failed')
            }

            const data = await response.json()
            if(data.Response === 'False'){
                setErrorMessage(data.Error || 'Failed to fetch movies')
                setMovieList([])
                return
            }

            setMovieList(data.results || [])
        }catch(error){
        console.error(`Got some errors ${error}`)
        setErrorMessage('Something went wrong')
    }finally {
            setIsLoading(false)
        }
}

    useEffect(()=>{
        fetchMovies(debouncedSearchTerm)
    },[debouncedSearchTerm])

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
            <header>
                <img src="/hero.png" alt="Hero Banner"/>
            <h1
                className="text-3xl font-bold">
               <span className="text-gradient">Фильмы для вас!</span>
            </h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </header>

                <section className="all-movies">
                    <h2 className="mt-[40]px"> <span className="text-gradient">Все фильмы</span></h2>
                    { isLoading ? (
                        <Spinner/>
                    ) : errorMessage ? (
                        <p className="text-red-500">{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                              <MovieCard key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )
                    }
                </section>
            </div>
        </main>
    )
}

export default App