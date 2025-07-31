const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetches a list of users from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 * @throws {Error} Throws an error if the network response is not ok.
 */
export const fetchUsersAPI = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Network response was not ok (Status: ${response.status})`);
    }
    return await response.json();
};