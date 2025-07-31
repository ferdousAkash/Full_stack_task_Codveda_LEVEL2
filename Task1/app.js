import React from 'react';
import Header from './components/Header';
import FetchButton from './components/FetchButton';
import UserCard from './components/UserCard';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';
import { useUsers } from './hooks/useUsers';

function App() {
    const { users, isLoading, error, getUsers } = useUsers();

    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <Header />

                <div className="text-center mb-8">
                    <FetchButton onClick={getUsers} disabled={isLoading}>
                        {isLoading ? 'Fetching...' : 'Fetch Users'}
                    </FetchButton>
                </div>

                <main>
                    {isLoading && <Spinner />}
                    {error && <ErrorMessage message={error} />}
                    
                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {users.length > 0 ? (
                                users.map(user => <UserCard key={user.id} user={user} />)
                            ) : (
                                <p className="text-gray-500 col-span-full text-center">Click the button to fetch users.</p>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;