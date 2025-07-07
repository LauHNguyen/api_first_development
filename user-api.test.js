require('dotenv').config();
const axios = require('axios');

const baseUrl = process.env.API_GATEWAY_URL;// Thay đúng API URL từ AWS API Gateway

(async () => {
  try {
    // 1. CREATE user
    const newUser = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St"
    };

    const createRes = await axios.post(`${baseUrl}/v1/users`, newUser);
    console.log('POST /v1/users:', createRes.data);
    const userID = createRes.data.userID;

    // 2. GET all users
    const getAllRes = await axios.get(`${baseUrl}/v1/users`);
    console.log('GET /v1/users:', getAllRes.data);

    // 3. GET user by ID
    const getOneRes = await axios.get(`${baseUrl}/v1/users/${userID}`);
    console.log('GET /v1/users/:id:', getOneRes.data);

    // 4. UPDATE user
    const updateData = { name: "John Updated" };
    const updateRes = await axios.put(`${baseUrl}/v1/users/${userID}`, updateData);
    console.log('PUT /v1/users/:id:', updateRes.data);

    // 5. DELETE user
    const deleteRes = await axios.delete(`${baseUrl}/v1/users/${userID}`);
    console.log('DELETE /v1/users/:id: Deleted');

    console.log('All tests passed');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err.response?.data || err.message);
    process.exit(1);
  }
})();
