import axios from 'axios';

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(`http://localhost:5000/auth/verify-token?token=${token}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    return false;
  }
};

export default verifyToken;
