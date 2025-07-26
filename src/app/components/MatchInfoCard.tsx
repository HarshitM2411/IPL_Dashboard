export default function MatchInfoCard({ match }: any) {
    if (!match || match.length === 0) return null;

    return (
        <div
            className="block bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-md transition border border-black h-40 flex flex-col justify-between" style={{ minHeight: 160 }}>
            <div className="font-semibold">
                {match.matchNumber && <span className="mr-2 font-mono">#{match.matchNumber}</span>}
                {match.team1} vs {match.team2}
            </div>
            <div className="text-sm text-gray-600">{match.date} | {match.time}</div>
            <div className="text-xs text-gray-500">{match.venue}</div>
            {match.status === 'LIVE' && (
                <div className="mt-2 text-red-600 font-bold">LIVE</div>
            )}
            {match.score && (
                <div className="mt-1 text-gray-700 font-mono">{match.score}</div>
            )}
        </div>
    );
}