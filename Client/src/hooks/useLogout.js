import fetchWithAuth from "../Utility/apiutility";

export const UseLogout = async () => {
  try {
    const response = await fetch('https://spicemaven-online-food-ordering-backend.vercel.app/restro/logout', {
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
