// import { startLocationScraping } from "./scraping/locationScraping";
import prisma from "./lib/prisma";
// import { startPackageScraping } from "./scraping/packageScraping";
// import { startFlightScraping } from "./scraping/flightsScraping";
// import { startHotelScraping } from "./scraping/hotelScraping";

const SBR_WS_ENDPOINT = process.env.SBR_WS_ENDPOINT;

export const register = async () => {
  console.log("server started")
};
