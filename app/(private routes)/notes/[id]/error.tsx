"use client";

interface ErrorProps {
    error: Error,
    reset: () => void 
}

export default function Error({error, reset}: ErrorProps ) {
    return (
        <>
        <p>Could not fetch note details. {error.message}</p>
        <button onClick={() => reset()}>Retry</button>
        </>
    )
}