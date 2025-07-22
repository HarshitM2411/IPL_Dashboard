// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import type { IplApiResponse, UseIplDataReturn, ApiError } from '/types/ipl';

// const API_ENDPOINT = '/api/scrape';
// const CACHE_DURATION = 30000; // 30 seconds
// const RETRY_ATTEMPTS = 3;
// const RETRY_DELAY = 1000; // 1 second

// interface CacheEntry {
//   data: IplApiResponse;
//   timestamp: number;
// }

// // Simple in-memory cache
// const cache = new Map<string, CacheEntry>();

// export const useIplData = (refreshInterval = 60000): UseIplDataReturn => {
//   const [data, setData] = useState<IplApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

//   const abortControllerRef = useRef<AbortController | null>(null);
//   const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const fetchWithRetry = useCallback(async (
//     url: string, 
//     attempts: number = RETRY_ATTEMPTS
//   ): Promise<IplApiResponse> => {
//     // Check cache first
//     const cacheKey = url;
//     const cachedEntry = cache.get(cacheKey);

//     if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_DURATION) {
//       return cachedEntry.data;
//     }

//     // Cancel previous request
//     if (abortControllerRef.current) {
//       abortControllerRef.current.abort();
//     }

//     abortControllerRef.current = new AbortController();

//     try {
//       const response = await fetch(url, {
//         signal: abortControllerRef.current.signal,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
//       }

//       const result = await response.json();

//       // Validate response structure
//       if (!result || typeof result !== 'object') {
//         throw new Error('Invalid API response format');
//       }

//       // Cache the result
//       cache.set(cacheKey, {
//         data: result,
//         timestamp: Date.now(),
//       });

//       return result;
//     } catch (err) {
//       if (err instanceof Error && err.name === 'AbortError') {
//         throw err; // Don't retry aborted requests
//       }

//       if (attempts > 1) {
//         await new Promise(resolve => {
//           retryTimeoutRef.current = setTimeout(resolve, RETRY_DELAY);
//         });
//         return fetchWithRetry(url, attempts - 1);
//       }

//       throw err;
//     }
//   }, []);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const result = await fetchWithRetry(API_ENDPOINT);
//       setData(result);
//       setLastUpdated(new Date());
//     } catch (err) {
//       if (err instanceof Error && err.name !== 'AbortError') {
//         const errorMessage = err.message || 'Failed to fetch IPL data';
//         setError(errorMessage);

//         // Log error for monitoring
//         console.error('IPL Data Fetch Error:', {
//           message: errorMessage,
//           timestamp: new Date().toISOString(),
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchWithRetry]);

//   // Initial fetch
//   useEffect(() => {
//     fetchData();

//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       if (retryTimeoutRef.current) {
//         clearTimeout(retryTimeoutRef.current);
//       }
//     };
//   }, [fetchData]);

//   // Set up polling for real-time updates
//   useEffect(() => {
//     if (refreshInterval <= 0) return;

//     const intervalId = setInterval(fetchData, refreshInterval);

//     return () => {
//       clearInterval(intervalId);
//     };
//   }, [fetchData, refreshInterval]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (abortControllerRef.current) {
//         abortControllerRef.current.abort();
//       }
//       if (retryTimeoutRef.current) {
//         clearTimeout(retryTimeoutRef.current);
//       }
//     };
//   }, []);

//   const refetch = useCallback(async () => {
//     await fetchData();
//   }, [fetchData]);

//   return {
//     data,
//     loading,
//     error,
//     refetch,
//     lastUpdated,
//   };
// };

// // Custom hook for managing favorite teams
// export const useFavoriteTeams = () => {
//   const [favorites, setFavorites] = useState<string[]>(() => {
//     if (typeof window !== 'undefined') {
//       const stored = localStorage.getItem('ipl_favorite_teams');
//       return stored ? JSON.parse(stored) : [];
//     }
//     return [];
//   });

//   const addFavorite = useCallback((teamId: string) => {
//     setFavorites(prev => {
//       if (prev.includes(teamId)) return prev;
//       const updated = [...prev, teamId];
//       localStorage.setItem('ipl_favorite_teams', JSON.stringify(updated));
//       return updated;
//     });
//   }, []);

//   const removeFavorite = useCallback((teamId: string) => {
//     setFavorites(prev => {
//       const updated = prev.filter(id => id !== teamId);
//       localStorage.setItem('ipl_favorite_teams', JSON.stringify(updated));
//       return updated;
//     });
//   }, []);

//   const toggleFavorite = useCallback((teamId: string) => {
//     favorites.includes(teamId) ? removeFavorite(teamId) : addFavorite(teamId);
//   }, [favorites, addFavorite, removeFavorite]);

//   return {
//     favorites,
//     addFavorite,
//     removeFavorite,
//     toggleFavorite,
//     isFavorite: (teamId: string) => favorites.includes(teamId),
//   };
// };
