import { useState, useCallback } from 'react';
import { fetchUsersAPI } from '../services/userService';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getUsers = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setUsers([]); // Clear previous users for a fresh load

        try {
            const data = await fetchUsersAPI();
            setUsers(data);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message || 'Failed to fetch data.');
        } finally {
            setIsLoading(false);
        }
    }, []); // Empty dependency array means this function is created only once

    return { users, isLoading, error, getUsers };
};
