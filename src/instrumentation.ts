// import { startLocationScraping } from "./scraping/locationScraping";
// import puppeteer from 'puppeteer';
import prisma from "./lib/prisma";
// import { startPackageScraping } from "./scraping/packageScraping";
// import { startFlightScraping } from "./scraping/flightsScraping";
// import { startHotelScraping } from "./scraping/hotelScraping";

const SBR_WS_ENDPOINT = process.env.SBR_WS_ENDPOINT;

export const register = async () => {
  try {
    console.log('NEXT_RUNTIME: ', process.env.NEXT_RUNTIME);
    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { Worker } = await import("bullmq");
      const puppeteer = await import("puppeteer");
      const { connection } = await import("./lib");
      const { importQueue } = await import("./lib");


      new Worker(
        "jobQueue",
        async (job: any) => {
          let browser = null;
          try {
            browser = await puppeteer.connect({
              browserWSEndpoint: "wss://brd-customer-hl_6d21b639-zone-arklyte:ws0efsojv3sd@brd.superproxy.io:9222"
            })
            const page = await browser.newPage();
          } catch (error: any) {
            console.error("Error: puppeteer.connect", error.message)
          } finally {
            // await browser?.close()
            console.log("Borwer has been closed. ")
          }


        },
        {
          connection,
          concurrency: 10,
          removeOnComplete: { count: 1000 },
          removeOnFail: { count: 5000 }
        })
    }
  } catch (error: any) {
    console.error("Instramentation Error: ", error.message)
  }

};
