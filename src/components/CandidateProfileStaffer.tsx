import React from 'react';

interface UserProfileProps {
    imageUrl?: string;
    name: string;
    status: string;
};



const UserProfile = ({ imageUrl, name, status}: UserProfileProps) => {
  return (
      <div className="flex items-start justify-start space-x-4 p-3">
          <div className="min-w-12 min-h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {imageUrl ? (
                  <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 w-8 h-8">
                      {/* SVG path goes here */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M..." />
                  </svg>
              )}
          </div>
          <div className="pr-1 pt-3">
              <h1 className="text-xl font-semibold">{name}</h1>
              {/* <p className="text-sm text-gray-500">{role}</p> */}
              <p className="text-sm text-gray-500">{status}</p>
          </div>
      </div>
  );
};

export default UserProfile;