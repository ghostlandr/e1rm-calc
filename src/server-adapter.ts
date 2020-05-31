import axios, { AxiosResponse } from 'axios';
import { Calculation } from './reducers/e1rm.reducer';

// TODO: use env variable here eventually
const useDark = true;
const darkRoot = 'https://ghostlander-e1rm.builtwithdark.com';

interface UserResponse {
  name: string;
  userId: string;
}

export default class ServerAdapter {
  static async getUser(userId: string): Promise<AxiosResponse<UserResponse>> {
    let url = '/user?userId=' + userId;
    if (useDark) {
      url = darkRoot + url;
    }
    return await axios.get(url);
  }

  static async createUser(
    userId: string
  ): Promise<AxiosResponse<UserResponse>> {
    let url = '/user';
    if (useDark) {
      url = darkRoot + url;
    }
    return await axios.post(url, { userId });
  }

  static async getE1rms(userId: string): Promise<AxiosResponse<Calculation[]>> {
    let url = '/e1rms?userId=' + userId;
    if (useDark) {
      url = darkRoot + url;
    }
    return await axios.get(url);
  }

  static async putE1rm(
    e1rm: Calculation,
    userId: string
  ): Promise<AxiosResponse> {
    let url = '/e1rm';
    if (useDark) {
      url = darkRoot + url;
    }
    return await axios.post(url, {
      ...e1rm,
      userId,
    });
  }

  static async updateUser(
    name: string,
    userId: string
  ): Promise<AxiosResponse> {
    let url = '/user';
    if (useDark) {
      url = darkRoot + url;
    }
    return await axios.post(url, {
      userId,
      name,
    });
  }
}
