import './App.css'
import {useState} from "react";

function Card ({title}) {
    const [hasLiked, setHasLiked] = useState(false)

    return (
        <div className="card">
            <h2>{title}</h2>
        <button onClick={() => setHasLiked(!hasLiked)}>
            {hasLiked ? 'Liked' :'Like'}
        </button>
        </div>
    )
}


function App() {

    return (
        <div className="card-container">
            <h2>Functional card component</h2>
            <Card title='Lion King'/>
            <Card title='Avatar'/>
        </div>
    )
}

export default App
