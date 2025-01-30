import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:8089/qlms";

/**
 * Add a course to the wishlist.
 * @param {string} courseId - The ID of the course to add to the wishlist.
 */
export const addToWishlist = async (courseId) => {
  try {
    const accessToken = Cookies.get('accessToken');
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/addWishlist`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add course to wishlist: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Course added to wishlist:', data);
    return data;
  } catch (err) {
    console.error('Error adding to wishlist:', err.message);
  }
};

/**
 * Get all wishlist courses.
 * @returns {Promise<Array>} - Returns a list of wishlist courses.
 */
export const getWishlist = async () => {
  try {
    const accessToken = Cookies.get('accessToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/getWishlist`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched wishlist:', data);
    return data;
  } catch (err) {
    console.error('Error fetching wishlist:', err.message);
  }
};

/**
 * Remove a course from the wishlist.
 * @param {string} courseId - The ID of the course to remove.
 */
export const removeFromWishlist = async (courseId) => {
  try {
    const accessToken = Cookies.get('accessToken');

    const headers = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}/deleteWishlist`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove course from wishlist: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Course removed from wishlist:', data);
    return data;
  } catch (err) {
    console.error('Error removing from wishlist:', err.message);
  }
};
