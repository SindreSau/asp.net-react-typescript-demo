import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchForm } from './SearchForm';
import { GameCard } from './GameCard';
import { gameService } from '../../services/gameService';
import { Game } from '../../types/game';

export const GameListAxios: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [games, setGames] = useState<Game[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchGames = useCallback(async (search: string = '') => {
        try {
            if (!initialLoading) {
                setSearchLoading(true);
            }

            const data = search
                ? await gameService.search(search)
                : await gameService.getAll();

            setGames(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setInitialLoading(false);
            setSearchLoading(false);
        }
    }, [initialLoading]);

    const handleSearch = (searchTerm: string) => {
        if (searchTerm) {
            setSearchParams({ q: searchTerm });
        } else {
            setSearchParams({});
        }
    };

    useEffect(() => {
        const searchTerm = searchParams.get('q') || '';
        fetchGames(searchTerm).then(() => {
            setInitialLoading(false);
        });
    }, [searchParams, fetchGames]);

    if (error) {
        return (
            <div className='alert alert-danger' role='alert'>
                Error: {error}
            </div>
        );
    }

    return (
        <>
            <SearchForm
                initialSearch={searchParams.get('q') || ''}
                onSearch={handleSearch}
            />

            {initialLoading ? (
                <div className='text-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                <div className={searchLoading ? 'opacity-50' : ''}>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
                        {games.map((game) => (
                            <div key={game.id} className='col'>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!initialLoading && !searchLoading && games.length === 0 && (
                <div className='alert alert-info text-center' role='alert'>
                    No games found
                </div>
            )}
        </>
    );
};