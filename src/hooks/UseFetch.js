import { useState, useCallback } from 'react';

const endpoint = 'http://localhost:8000/graphql';

export const useFetch = (queryData) => {
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    const [fetching, setFetching] = useState(true);

    const fetchData = useCallback(() => {
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: queryData })
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result);
                setFetching(false);
            })
            .catch((error) => {
                setError(true);
                setFetching(false);
            })
    }, [queryData, setData, setFetching, setError]);

    return {data, error, fetching, fetchData};
};
