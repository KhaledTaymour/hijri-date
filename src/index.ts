import {
  countriesCodes,
  countriesFunctionsMapping,
  countryKey,
} from "./data/countries";
import { capitalizeString } from "./utils/utils";

async function getHijriDateByCountry({ country }: { country: string }) {
  const countryCapitalized = capitalizeString(country);

  if (countriesCodes[countryCapitalized]) {
    // check if country we have it
    // TODO:

    const code = countriesCodes[countryCapitalized];
    const { date, month, year } = await countriesFunctionsMapping[
      code as countryKey
    ]();
    // console.log({ date, month, year });
    return { date, month, year };
  } else {
    return `We currently don't support ${country}'s hijri date, Please enter a valid country name`;
  }
}

getHijriDateByCountry({ country: "egypt" });

export default getHijriDateByCountry;
