export interface MatchInfo {
    id: string;
    date: string;
    time: string;
    team1: string;
    team2: string;
    venue: string;
    status: 'UPCOMING' | 'LIVE' | 'COMPLETED';
    score?: string;
    matchNumber: string | number;
    tossWinner?: any;
    winner?: string;
    result?: string;
}


export interface PointsTableEntry {
    team: string;
    played: number;
    won: number;
    lost: number;
    nrr: number;
    points: number;
}
