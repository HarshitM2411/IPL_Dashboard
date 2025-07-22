import { MatchInfo } from "/types/ipl";

export default function LiveMatch({ match }: { match: MatchInfo | null }) {
  if (!match) return null;
  return (
    <div className="bg-yellow-200 rounded-lg p-4 mb-4">
      <h2 className="font-bold text-xl mb-2">Live Match</h2>
      <div className="flex flex-col sm:flex-row justify-between">
        <span>{match.team1} vs {match.team2}</span>
        <span>{match.venue}</span>
      </div>
      <div className="text-lg mt-2">{match.score || 'Score updating...'}</div>
    </div>
  );
}
