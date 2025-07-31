export const fetchUsersAPI = async () => {
    // Retrieve the token from wherever you stored it after login
    const token = localStorage.getItem('userToken');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch('http://localhost:5000/api/users', config);
    if (!response.ok) {
        // ... handle error
    }
    return await response.json();
};