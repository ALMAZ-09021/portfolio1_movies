import React, {useState} from 'react'
import Search from "./components/Search.jsx";

function App() {

    const [searchTerm, setSearchTerm] = useState('')



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
            </header>

                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
        </main>
    )
}

export default App