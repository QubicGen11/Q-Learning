import Cookies from 'js-cookie';

const trackLastViewedCourse = async (courseId) => {
  try {
    const accessToken = Cookies.get('accessToken'); // Get token if available

    const headers = {
      'Content-Type': 'application/json',
    };

    // If token exists, add Authorization header
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`http://localhost:8089/qlms/recommendations/last-viewed`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ courseId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to track last viewed course: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Last viewed course updated:', data);
  } catch (err) {
    console.error('Error tracking last viewed course:', err.message);
  }
};

export default trackLastViewedCourse;
