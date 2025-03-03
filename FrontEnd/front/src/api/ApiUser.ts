/// src/api/ApiUser.ts

import axios from 'axios';
import { cookieUtils } from '@/utiles/cookieUtils';

export interface UserProfile {
  username: string;
  email: string;
}

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const token = cookieUtils.getCookie('token');
  const response = await axios.get('/users/info', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const { username, email } = response.data;

    // Check if the username is already stored in Cookie
    if (!cookieUtils.getCookie('username')) {
      cookieUtils.setCookie('username', username, 1);
    }

    if (!cookieUtils.getCookie('email')) {
      cookieUtils.setCookie('email', email, 1);
    }

    return { username, email };
  } else {
    throw new Error('Failed to fetch user profile');
  }
};

export const verifyToken = async (): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    if (!token) {
      throw new Error('token not found');
    }
    const response = await axios.post('/verify/token', {
      token: token,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error getting user profile: ', error);
    throw error;
  }
};

// user 삭제
export const getUserDelete = async (): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    const refresh = cookieUtils.getCookie('refresh');
    return await axios.delete('/accounts/user/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        refresh,
      },
    });
  } catch (error: any) {
    console.error('Error getting user profile: ', error);
    throw error;
  }
};

export const fetchLogin = async (
  email: string,
  password: string,
): Promise<any> => {
  const response = await axios.post('/login', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
      password,
    },
  });

  if (response.status === 200) {
    const { username, email } = response.data.user;

    // Check if the username is already stored in Cookie
    if (!cookieUtils.getCookie('username')) {
      cookieUtils.setCookie('username', username, 1);
    }

    if (!cookieUtils.getCookie('email')) {
      cookieUtils.setCookie('email', email, 1);
    }

    return response.data.user;
  } else {
    throw new Error('Failed to fetch user profile');
  }
};

// user 삭제
// api.ts (or your appropriate API file)

export const updateUsernameAPI = async (username: string): Promise<any> => {
  try {
    const token = cookieUtils.getCookie('token');
    const response = await axios.put(
      '/accounts/update_username',
      { username }, // Data payload
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating username: ', error);
    throw error;
  }
};
