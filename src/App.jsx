import { useEffect, useState } from 'react'

function App() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/portfolio')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! ${res.status}`)
                return res.json()
            })
            .then(json => setData(json))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Loading�</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    const profile = data?.profile

    return (
        <main style={{ padding: 24, fontFamily: 'Arial, sans-serif' }}>
            <h1>{profile?.name}</h1>
            <h2>{profile?.title}</h2>
        </main>
    )
}

export default App
