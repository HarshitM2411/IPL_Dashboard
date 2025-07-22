'use client';

import useSWR from 'swr';
import { MatchInfo } from '/types/ipl';
import { fetcher } from '../utils/fetcher';
import Loader from '../components/Loader';
import { useSearchParams } from 'next/navigation';

export default function Schedule() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const { data, error } = useSWR<{ schedule: MatchInfo[] }>('/api/scrape', fetcher);

    if (error)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-red-600 font-semibold">Failed to load schedule. Please try again later.</p>
            </div>
        );

    if (!data)
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader />
            </div>
        );

    const schedule = data.schedule ?? [];
    const filteredMatches = id ? schedule.filter((m) => m.id === id) : schedule;

    if (filteredMatches.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="p-6 font-semibold bg-white rounded-lg shadow max-w-3xl text-center text-gray-700">
                    No matches found for the selected filter.
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Optional fixed header */}
            <header className="bg-white shadow sticky top-0 z-20">
                <h1 className="max-w-7xl mx-auto text-4xl font-extrabold text-center py-6 px-4">
                    Full Schedule
                </h1>
            </header>

            {/* Content container */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                    {filteredMatches.map((match: MatchInfo) => (
                        <div
                            key={match.id}
                            className="flex flex-col sm:flex-row justify-between items-center p-6 hover:bg-gray-50 cursor-pointer transition"
                        >
                            <div className="flex items-center space-x-5 w-full sm:w-2/5">
                                <span className="font-mono font-semibold text-gray-600">#{match.matchNumber}</span>
                                <p className="text-lg font-semibold text-gray-900 truncate">
                                    {match.team1} <span className="text-gray-400">vs</span> {match.team2}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-6 w-full sm:w-3/5 justify-end text-gray-600 text-sm md:text-base mt-3 sm:mt-0">
                                <p className="whitespace-nowrap">{match.date}</p>
                                <p className="whitespace-nowrap">{match.time}</p>
                                <p className="hidden md:inline truncate max-w-xs">{match.venue}</p>
                                {match.status === 'LIVE' && (
                                    <span className="ml-2 bg-red-600 text-white text-xs uppercase font-bold tracking-wide px-3 py-1 rounded-full">
                                        LIVE
                                    </span>
                                )}
                            </div>

                            {match.score && (
                                <div className="mt-3 sm:mt-0 sm:ml-8 font-mono text-gray-700 whitespace-nowrap text-sm sm:text-base">
                                    {match.score}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
