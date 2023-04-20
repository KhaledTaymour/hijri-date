import * as cheerio from "cheerio";
import { websites } from "../data/websites";
import { fetchDateFromWebsite } from "../helpers/helpers";

export async function getHijriDateEmirates() {
  function onSuccess($: cheerio.CheerioAPI) {
    const hijraDateFromPage = $(".namaz-date").first().text();
    const [date, month, year] = hijraDateFromPage
      ?.trim()
      .split("\n")[0]
      .split(" ");
    return { date, month, year };
  }

  try {
    return await fetchDateFromWebsite({
      url: websites.AE,
      onSuccess,
      onFailure: (error: unknown) => {
        throw new Error(`Something went wrong, \n${error}`);
      },
    });
  } catch (error: unknown) {
    throw new Error(`Something went wrong, \n${error}`);
  }
}
