import API_URL from "../Utility/constant";

export const UseRegister = async (formDataObject) => {
  try {
    const response = await fetch(`${API_URL}/restro/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(formDataObject),
    });

 
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: true, message: error.message };
  }
};
