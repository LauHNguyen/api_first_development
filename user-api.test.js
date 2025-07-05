const axios = require('axios');
const baseUrl = 'https://<your-api-id>.execute-api.us-east-1.amazonaws.com/prod'; // sửa lại đúng stage của bạn

(async () => {
  try {
    const res = await axios.get(`${baseUrl}/users`);
    console.log('GET /users: ', res.data);

  } catch (err) {
    console.error('Test failed:', err.response?.data || err.message);
    process.exit(1);
  }
})();