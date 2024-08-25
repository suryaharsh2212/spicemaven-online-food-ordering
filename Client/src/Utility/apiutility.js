// fetchWithAuth.js
import Cookies from 'js-cookie';

const fetchWithAuth = async (url, options) => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    Cookies.remove('token');
    // Return error information so it can be handled where fetchWithAuth is used
    return { error: true, message: 'Unauthorized' };
  }

  return response;
};

export default fetchWithAuth;
