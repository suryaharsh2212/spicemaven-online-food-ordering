export const UseSearch = async (name) => {
    try {
      const response = await fetch('http://localhost:8000/restro/search', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ name }),
      });
  
      const data = await response.json();
      console.log(data);
      
      return data;
    } catch (error) {
      console.error('Error:', error);
      return { error: true, message: error.message };
    }
  
  };