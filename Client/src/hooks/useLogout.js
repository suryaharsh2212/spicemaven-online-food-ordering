import API_URL from "../Utility/constant";

export const UseLogout = async () => {
  try {
    const response = await fetch(`${API_URL}/restro/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({}), 
    });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: true, message: error.message };
  }
};
