import axios, { AxiosRequestConfig } from "axios";
import * as cheerio from "cheerio";

async function fetchDateFromWebsite({
  url,
  onSuccess,
  onFailure,
  getConfigs,
}: {
  url: string;
  onSuccess: ($: cheerio.CheerioAPI) => {
    date: string;
    month: string;
    year: string;
  };
  onFailure: Function;
  getConfigs?: AxiosRequestConfig;
}) {
  try {
    const response = await axios.get(url, { ...getConfigs });
    const $ = cheerio.load(response.data);
    return onSuccess($);
  } catch (error: unknown) {
    onFailure(error);
  }
}

export { fetchDateFromWebsite };
