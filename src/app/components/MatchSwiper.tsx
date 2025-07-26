'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { MatchInfo } from '/types/ipl';
import MatchInfoCard from './MatchInfoCard';
interface MatchSwiperProps {
    matches: MatchInfo[];
}

export default function MatchSwiper({ matches }: MatchSwiperProps) {
    if (!matches || matches.length === 0) return null;

    return (
        <Swiper
            spaceBetween={12}
            slidesPerView="auto"
            grabCursor={true}
            className="my-6"
        >
            {matches.map((match) => (
                <SwiperSlide
                    key={match.id}
                    style={{ width: 260, maxWidth: '80vw' }}
                >
                    <Link
                        href={{
                            pathname: '/full-schedule',
                            query: { id: match.id },
                        }}
                        passHref
                    >
                        <MatchInfoCard match={match} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
