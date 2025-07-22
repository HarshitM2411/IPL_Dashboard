'use client'
import useSWR from 'swr';
import { fetcher } from './utils/fetcher';
import Loader from './components/Loader';
import Link from 'next/link';
import MatchSwiper from './components/MatchSwiper';

export default function Home() {
  const { data, error } = useSWR('/api/scrape', fetcher, { refreshInterval: 60000 });
  if (error) return <div>Failed to load data.</div>;
  if (!data) return <Loader />;
  const combinedMatches = data.liveMatch ? [data.liveMatch, ...data.upcomingMatches] : [...data.upcomingMatches];

  return (
    <main className="max-w-2xl mx-auto px-2 py-4 pt-4">
      <section>
        <h2 className="text-lg font-bold mb-2">Live & Upcoming Matches</h2>
        <MatchSwiper matches={combinedMatches} />
      </section>

      <nav className="mb-4 text-center">
        <Link href="/points-table">
          <p className="text-blue-600 hover:underline cursor-pointer">View Points Table</p>
        </Link>
      </nav>
    </main>
  );
}
