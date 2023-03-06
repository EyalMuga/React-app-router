import axios from "axios";
import { useEffect, useState } from "react";

export default function Joke() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getJoke = () => {
        setLoading(true)
        axios
            .get("https://api.chucknorris.io/jokes/random")
            .then((response) => {
                setJoke(response.data.value)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        getJoke()
        setLoading(false)
    }, [])

    return (
        <>
            <h1>Chuck Norris Joke</h1>
            <p>Get a random joke from Chuck Norris</p>
            <button onClick={getJoke}>Get Joke</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {joke && <p>{joke}</p>}
        </>
    )
}

