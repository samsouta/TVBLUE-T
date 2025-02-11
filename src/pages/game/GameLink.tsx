import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const GameLink: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const gameId = id ? parseInt(id) : NaN;

    const [data, setData] = useState<any | null>(null);  // Change state to hold a single object
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [seconds, setSeconds] = useState(30);
    const [linkVisible, setLinkVisible] = useState(false);

    // Fetch data from API
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`https://bluetv-base.x10.mx/api/games/${gameId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();

                // Ensure result is an object
                if (result && typeof result === 'object') {
                    setData(result);
                } else {
                    console.error("API response is not an object", result);
                    setData(null);  // Fallback to null
                }
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        if (gameId) {
            fetchGameData();
        }
    }, [gameId]);

    // Timer Logic
    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        if (seconds === 0) {
            clearInterval(timer);
            setLinkVisible(true);
        }

        return () => clearInterval(timer);
    }, [seconds]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if the game data exists and matches the ID
    if (!data || data.id !== gameId) {
        return <div>Game not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
           

            <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Game Link for ID: {data?.description}</h1>
                <p className="text-lg text-gray-600 mb-4">Wait for <span className="font-bold text-indigo-600">{seconds}</span> seconds to get the link!</p>

                {/* Timer styled with Tailwind */}
                <div className="flex justify-center items-center">
                    <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-xl font-semibold">
                        {seconds}
                    </div>
                </div>

                {/* Show link button after timer reaches 0 */}
                {linkVisible && data?.url && (
                    <a href={data.url} target="_blank" rel="noopener noreferrer">
                        <button
                            className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 cursor-pointer"
                        >
                            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#070e41] bg-[#ffffff] px-8 py-1 text-sm font-medium dark:text-gray-50 text-black backdrop-blur-3xl">
                                Get Link Now
                            </span>
                        </button>
                    </a>
                )}
             
            </div>

        </div>
    );
};

export default GameLink;
