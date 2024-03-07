// import { startLocationScraping } from "./scraping/locationScraping";
import prisma from "./lib/prisma";
// import { startPackageScraping } from "./scraping/packageScraping";
// import { startFlightScraping } from "./scraping/flightsScraping";
// import { startHotelScraping } from "./scraping/hotelScraping";

const SBR_WS_ENDPOINT = process.env.SBR_WS_ENDPOINT;

export const register = async () => {
  console.log('NEXT_RUNTIME: ', process.env.NEXT_RUNTIME);
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { Worker } = await import("bullmq");
    // const puppeteer = await import("puppeteer");
    const { connection } = await import("./lib");
    const { importQueue } = await import("./lib");

    new Worker(
      "jobQueue",
      async (job) => {
        // surp

      },
      {
        connection,
        concurrency: 10,
        removeOnComplete: { count: 1000 },
        removeOnFail: { count: 5000 }
      })
  }
};
