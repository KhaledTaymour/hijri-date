import * as cheerio from "cheerio";
import { websites } from "../data/websites";
import { fetchDateFromWebsite } from "../helpers/helpers";

export async function getHijriDateEgypt() {
  function onSuccess($: cheerio.CheerioAPI) {
    const hijraDateFromPage = $(".he-text").first().text();
    const [date, month, year] = hijraDateFromPage?.split('"')[1].split(" ");
    return { date, month, year };
  }

  try {
    return await fetchDateFromWebsite({
      url: websites.EG,
      onSuccess,
      onFailure: (error: unknown) => {
        throw new Error(`Something went wrong, \n${error}`);
      },
    });
  } catch (error: unknown) {
    throw new Error(`Something went wrong, \n${error}`);
  }
}
