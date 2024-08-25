

export const UseLogin = async (emailOrPhone, password,) => {
  try {
    const response = await fetch('https://spicemaven-online-food-ordering-backend.vercel.app/restro/login', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ emailOrPhone, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: true, message: error.message };
  }

};
