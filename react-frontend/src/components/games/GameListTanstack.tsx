import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchForm } from './SearchForm';
import { GameCard } from './GameCard';
import { gameService } from '../../services/gameService';
import { Game } from '../../types/game';

export const GameListTanstack: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';

    const {
        data: games,
        isLoading,
        isError,
        error,
        isFetching
    } = useQuery({
        queryKey: ['games', searchTerm],
        queryFn: () => searchTerm
            ? gameService.search(searchTerm)
            : gameService.getAll(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const handleSearch = (searchTerm: string) => {
        if (searchTerm) {
            setSearchParams({ q: searchTerm });
        } else {
            setSearchParams({});
        }
    };

    if (isError) {
        return (
            <div className='alert alert-danger' role='alert'>
                Error: {error instanceof Error ? error.message : 'An error occurred'}
            </div>
        );
    }

    return (
        <>
            <SearchForm
                initialSearch={searchTerm}
                onSearch={handleSearch}
            />

            {isLoading ? (
                <div className='text-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            ) : (
                <div className={isFetching ? 'opacity-50' : ''}>
                    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
                        {games?.map((game: Game) => (
                            <div key={game.id} className='col'>
                                <GameCard game={game} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!isLoading && !isFetching && games?.length === 0 && (
                <div className='alert alert-info text-center' role='alert'>
                    No games found
                </div>
            )}
        </>
    );
};