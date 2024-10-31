import React from 'react';

interface Game {
    id: number;
    name: string;
    description: string;
    image_url: string;
    metascore: number;
    createdAt: string;
    updatedAt: string;
}

interface GameCardProps {
    game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
    const getMetascoreBadgeClass = (score: number): string => {
        if (score >= 90) return 'bg-success';
        else if (score >= 65) return 'bg-warning';
        else return 'bg-danger';
    };

    return (
        <div className='card h-100'>
            <img
                src={game.image_url}
                className='card-img-top'
                alt={game.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-start mb-2'>
                    <h5 className='card-title mb-0'>{game.name}</h5>
                    <span className={`badge ${getMetascoreBadgeClass(game.metascore)}`}>{game.metascore}</span>
                </div>
                <p className='card-text'>{game.description}</p>
            </div>
            <div className='card-footer'>
                <p className='card-text'>
                    <small className='text-muted'>Added: {new Date(game.createdAt).toLocaleDateString()}</small>
                </p>
            </div>
        </div>
    );
};
