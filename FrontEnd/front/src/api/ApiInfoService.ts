import axios from 'axios';

// notice
export const getNotice = async () => {
  try {
    return await axios.get('/info/notices');
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

// policy
export const getPolicy = async () => {
  try {
    return await axios.get('/info/policy');
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

// qna
export const getAbout = async () => {
  try {
    return await axios.get('/info/about');
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};

// terms
export const getTerms = async () => {
  try {
    return await axios.get('/info/terms');
  } catch (error) {
    console.error('Error during the API request', error);
    throw error;
  }
};
