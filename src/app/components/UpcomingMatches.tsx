import { MatchInfo } from "/types/ipl";

export default function UpcomingMatches({ matches }: { matches: MatchInfo[] }) {
  return (
    <div className="bg-white rounded-lg p-4 mb-4">
      <h2 className="font-bold text-lg mb-2">Upcoming Matches</h2>
      {matches.map(m => (
        <div key={m.id} className="flex flex-col sm:flex-row justify-between py-2 border-b last:border-b-0">
          <span>{m.team1} vs {m.team2}</span>
          <span>{m.date} | {m.time}</span>
          <span className="hidden sm:inline">{m.venue}</span>
        </div>
      ))}
    </div>
  );
}
