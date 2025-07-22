import { NextResponse } from 'next/server';
import type { MatchInfo, PointsTableEntry } from '../../../types/ipl';

export async function GET() {
  try {
    const upcomingMatches: MatchInfo[] = [
      {
        id: '1',
        date: '2025-07-25',
        time: '19:30',
        team1: 'MI',
        team2: 'CSK',
        venue: 'Wankhede Stadium, Mumbai',
        status: 'UPCOMING',
        matchNumber: '1',
      },
      {
        id: '2',
        date: '2025-07-26',
        time: '19:30',
        team1: 'RCB',
        team2: 'KKR',
        venue: 'M. Chinnaswamy Stadium, Bangalore',
        status: 'UPCOMING',
        matchNumber: '2',
      },
      {
        id: '3',
        date: '2025-07-27',
        time: '19:30',
        team1: 'SRH',
        team2: 'DC',
        venue: 'Rajiv Gandhi International Cricket Stadium, Hyderabad',
        status: 'UPCOMING',
        matchNumber: '3',
      },
      {
        id: '4',
        date: '2025-07-28',
        time: '19:30',
        team1: 'RR',
        team2: 'KKR',
        venue: 'Sawai Mansingh Stadium, Jaipur',
        status: 'UPCOMING',
        matchNumber: '4',
      },
      {
        id: '5',
        date: '2025-07-29',
        time: '19:30',
        team1: 'CSK',
        team2: 'RCB',
        venue: 'MA Chidambaram Stadium, Chennai',
        status: 'UPCOMING',
        matchNumber: '5',
      },
    ];


    const liveMatch: MatchInfo | null = {
      id: '7',
      date: '2025-04-11',
      time: '19:30',
      team1: 'DC',
      team2: 'SRH',
      venue: 'Feroz Shah Kotla Ground, Delhi',
      status: 'LIVE',
      matchNumber: 7,
      tossWinner: 'DC',
      score: 'DC 120/4 (15 overs)',
    };

    const points: PointsTableEntry[] = [
      { team: 'MI', played: 14, won: 9, lost: 5, nrr: 0.85, points: 18 },
      { team: 'CSK', played: 14, won: 8, lost: 6, nrr: 0.65, points: 16 },
      { team: 'RCB', played: 14, won: 8, lost: 6, nrr: 0.45, points: 16 },
      { team: 'KKR', played: 14, won: 7, lost: 7, nrr: -0.10, points: 14 },
      { team: 'SRH', played: 14, won: 6, lost: 8, nrr: -0.50, points: 12 },
      { team: 'RR', played: 14, won: 6, lost: 8, nrr: -0.75, points: 12 },
      { team: 'DC', played: 14, won: 5, lost: 9, nrr: -0.90, points: 10 },
      { team: 'PBKS', played: 14, won: 4, lost: 10, nrr: -1.20, points: 8 },
    ];


    const schedule: MatchInfo[] = [
      {
        id: '1',
        date: '2025-04-05',
        time: '19:30',
        team1: 'MI',       // Mumbai Indians
        team2: 'CSK',      // Chennai Super Kings
        venue: 'Wankhede Stadium, Mumbai',
        status: 'UPCOMING',
        matchNumber: 1,
        tossWinner: null,
      },
      {
        id: '2',
        date: '2025-04-06',
        time: '19:30',
        team1: 'RCB',      // Royal Challengers Bangalore
        team2: 'KKR',      // Kolkata Knight Riders
        venue: 'M. Chinnaswamy Stadium, Bangalore',
        status: 'UPCOMING',
        matchNumber: 2,
        tossWinner: null,
      },
      {
        id: '3',
        date: '2025-04-07',
        time: '15:30',
        team1: 'RR',       // Rajasthan Royals
        team2: 'DC',       // Delhi Capitals
        venue: 'Sawai Mansingh Stadium, Jaipur',
        status: 'UPCOMING',
        matchNumber: 3,
        tossWinner: null,
      },
      {
        id: '4',
        date: '2025-04-08',
        time: '19:30',
        team1: 'SRH',      // Sunrisers Hyderabad
        team2: 'MI',
        venue: 'Rajiv Gandhi Intl Cricket Stadium, Hyderabad',
        status: 'UPCOMING',
        matchNumber: 4,
        tossWinner: null,
      },
      {
        id: '5',
        date: '2025-04-09',
        time: '19:30',
        team1: 'CSK',
        team2: 'RCB',
        venue: 'MA Chidambaram Stadium, Chennai',
        status: 'UPCOMING',
        matchNumber: 5,
        tossWinner: null,
      },
      {
        id: '6',
        date: '2025-04-10',
        time: '15:30',
        team1: 'KKR',
        team2: 'RR',
        venue: 'Eden Gardens, Kolkata',
        status: 'COMPLETED',
        matchNumber: 6,
        tossWinner: 'KKR',
        winner: 'KKR',
        result: 'KKR won by 7 wickets',
        score: 'RR 150/7 (20 overs), KKR 151/3 (19 overs)',
      },
      {
        id: '7',
        date: '2025-04-11',
        time: '19:30',
        team1: 'DC',
        team2: 'SRH',
        venue: 'Feroz Shah Kotla Ground, Delhi',
        status: 'LIVE',
        matchNumber: 7,
        tossWinner: 'DC',
        score: 'DC 120/4 (15 overs)',
      }
    ];

    return NextResponse.json({ upcomingMatches, liveMatch, points, schedule });
  } catch (error) {
    return NextResponse.json({ message: 'Data fetch error' }, { status: 500 });
  }
}
