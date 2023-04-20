import axios, { AxiosRequestConfig } from "axios";
import https from "https";
import * as cheerio from "cheerio";
import { websites } from "../data/websites";
import { fetchDateFromWebsite } from "../helpers/helpers";

export async function getHijriDateSaudiArabia() {
  function onSuccess($: cheerio.CheerioAPI) {
    const date = $("#ContentPlaceHolder1_homepage1_lblHDay").text();
    const month = $("#ContentPlaceHolder1_homepage1_lblHMonthE").text();
    const year = $("#ContentPlaceHolder1_homepage1_lblHYear").text();
    return { date, month, year };
  }

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    return await fetchDateFromWebsite({
      url: websites.SA,
      onSuccess,
      onFailure: (error: unknown) => {
        throw new Error(`Something went wrong, \n${error}`);
      },
      getConfigs: { httpsAgent: agent },
    });
  } catch (error: unknown) {
    throw new Error(`Something went wrong, \n${error}`);
  }
}
