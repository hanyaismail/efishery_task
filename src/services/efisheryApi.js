import axios from 'axios';

class EfisheryApi {
  constructor() {
    this.endPoint = axios.create({
      baseURL: "https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4",
    })
  }

  async getFishList(filter) {
    try {
      let search = '';
      if (filter) {
        search = `?search=${JSON.stringify(filter)}`
      }
      const res = await this.endPoint.get(`/list${search}`);
      return res.data
    } catch (err) {
      throw new Error(err);
    }
  }

  async getArea() {
    try {
      const res = await this.endPoint.get(`/option_area`);
      return res.data
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSize() {
    try {
      const res = await this.endPoint.get(`/option_size`);
      return res.data
    } catch (err) {
      throw new Error(err);
    }
  }

  async addFish(payload) {
    try {
      const res = await this.endPoint.post('/list', payload);
      return res.data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export const efisheryApi= new EfisheryApi();