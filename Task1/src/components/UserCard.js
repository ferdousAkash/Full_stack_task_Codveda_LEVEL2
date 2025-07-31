import React from 'react';

const UserCard = ({ user }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-1">
            <a href={`mailto:${user.email}`} className="hover:text-blue-600 break-all">
                {user.email}
            </a>
        </p>
        <p className="text-gray-500 text-sm">{user.company.name}</p>
    </div>
);

export default UserCard;
