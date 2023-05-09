import axios from "axios";

type Config = {
  apiKey: string;
  url: string;
};

export abstract class Base {
  private apiKey: string;
  private url: string;

  constructor(config: Config) {
    this.apiKey = config.apiKey;
    this.url = config.url;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.url}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "api-key": this.apiKey,
    };
    const config = {
      ...options,
      headers,
    };

    try {
      const response = await axios(url, config);
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
