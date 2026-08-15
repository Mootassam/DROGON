import axios from "axios";
import cron from "node-cron";
import { RedisService } from "../redisConnection";
import { COINS, FIATS } from "./currencies";


export function startRatesCron() {
  const redis = RedisService.getClient();

  cron.schedule("* * * * *", async () => {

    console.log("I am here bro");
    
    try {
      // 1) Fetch crypto → USD prices
      const cryptoRes = await axios.get(
        "https://min-api.cryptocompare.com/data/pricemulti",
        {
          params: {
            fsyms: COINS.join(","),
            tsyms: "USD",
          },
        }
      );

      const cryptoUSD: Record<string, number> = {};
      for (const symbol of COINS) {
        cryptoUSD[symbol] = cryptoRes.data[symbol]?.USD ?? 0;
      }

      // 2) Fetch USD → FIAT conversion rates  
      const fiatRes = await axios.get(
        "https://open.er-api.com/v6/latest/USD"
      );

      const fiatRates: Record<string, number> = {};
      for (const fiat of FIATS) {
        fiatRates[fiat] = fiatRes.data.rates[fiat] ?? 1;
      }

      // Save to redis
      redis.set("CRYPTO_USD", JSON.stringify(cryptoUSD));
      redis.set("FIAT_RATES", JSON.stringify(fiatRates));

      console.log("✔ Rates updated");
    } catch (err: any) {
      console.error("Cron error:", err?.response?.status, err?.message);
    }
  });
}
