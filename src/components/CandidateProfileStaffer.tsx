import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface UserProfileProps {
    imageUrl?: string;
    name: string;
    status: string;
    onRemove?: () => void;
}

const CandidateProfileStaffer = ({ imageUrl, name, status, onRemove }: UserProfileProps) => {
    const profileName: string = name!;
    const profileStatus: string = status!;

    const handleRemove = () => {
        if (onRemove) {
            onRemove();
        }
    };

    return (
        <div className="flex items-start justify-start space-x-4 p-3">
            <div className="min-w-12 min-h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                    <img src={imageUrl} alt={profileName} className="w-full h-full object-cover" />
                ) : (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 w-8 h-8">
                        {/* SVG path goes here */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M..." />
                    </svg>
                )}
            </div>
            <div className="pr-1 pt-3">
                <h1 className="text-xl font-semibold">{profileName}</h1>
                <p className="text-sm text-gray-500">{profileStatus}</p>
            </div>

            <div className="mt-3">
                {onRemove && (
                    <button type="button" className="btn" onClick={handleRemove}>
                        <FontAwesomeIcon icon={faTrash} className="text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default CandidateProfileStaffer;
