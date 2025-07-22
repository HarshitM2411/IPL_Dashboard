'use client'
import useSWR from 'swr';
import Loader from "../components/Loader";
import { fetcher } from "../utils/fetcher";
import { PointsTableEntry } from "/types/ipl";

export default function PointsTable() {
    const { data, error } = useSWR('/api/scrape', fetcher);

    if (error) return <div>Failed to load data.</div>;
    if (!data) return <Loader></Loader>;

    return (
        <div className="bg-white rounded-lg p-4 mb-4 overflow-x-auto">
            <h2 className="font-bold text-lg mb-2">Points Table</h2>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Played</th>
                        <th>Won</th>
                        <th>Lost</th>
                        <th>NRR</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.points.map((entry: PointsTableEntry, idx: number) => (
                        <tr key={entry.team} className={`${idx < 4 ? 'bg-green-100' : ''} text-center`}>
                            <td>{entry.team}</td>
                            <td>{entry.played}</td>
                            <td>{entry.won}</td>
                            <td>{entry.lost}</td>
                            <td>{entry.nrr}</td>
                            <td>{entry.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
