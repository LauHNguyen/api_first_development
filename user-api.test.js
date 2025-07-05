const axios = require('axios');
const baseUrl = 'https://your-api-id.execute-api.us-east-1.amazonaws.com/prod'; // Thay đúng API URL

(async () => {
  try {
    // 1. CREATE user
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St"
    };

    const createRes = await axios.post(`${baseUrl}/users`, newUser);
    console.log('POST /users:', createRes.data);
    const userID = createRes.data.userID;

    // 2. GET all users
    const getAllRes = await axios.get(`${baseUrl}/users`);
    console.log('GET /users:', getAllRes.data);

    // 3. GET user by ID
    const getOneRes = await axios.get(`${baseUrl}/users/${userID}`);
    console.log('GET /users/:id:', getOneRes.data);

    // 4. UPDATE user
    const updateData = { name: "John Updated" };
    const updateRes = await axios.put(`${baseUrl}/users/${userID}`, updateData);
    console.log('PUT /users/:id:', updateRes.data);

    // 5. DELETE user
    const deleteRes = await axios.delete(`${baseUrl}/users/${userID}`);
    console.log('DELETE /users/:id: Deleted');

    console.log('All tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err.response?.data || err.message);
    process.exit(1);
  }
})();
