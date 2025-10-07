import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 20, interactive = false, onRate }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                    onClick={() => interactive && onRate && onRate(star)}
                />
            ))}
        </div>
    );
};

export default StarRating;