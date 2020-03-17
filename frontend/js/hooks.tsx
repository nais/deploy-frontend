import {useState, useEffect } from "react"

function useFetch(url) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchUrl() {
        console.log("fetching from ", url)
        const response = await fetch(url)
        console.log("got response", response)
        const json = await response.json()

        setData(json)
        setLoading(false)
    }

    useEffect(() => {
        fetchUrl()}, []
    
    )

    return [data, loading]
}

export { useFetch }