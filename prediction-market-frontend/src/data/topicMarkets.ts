import { createSlug } from '../utils/slug';

export interface Market {
  id: string;
  slug: string;
  title: string;
  titleKey?: string; // Translation key for title
  image: string;
  category: string;
  options: {
    text: string;
    percentage: number;
  }[];
  participants: number;
  volume: string;
  endDate?: string;
  status?: 'active' | 'ended' | 'perpetual';
  description?: string;
  rules?: string;
  resolutionSource?: string;
  createdAt?: string;
}

export const topicMarkets: Record<string, Market[]> = {
  crypto: [
    {
      id: "1",
      slug: "will-zcash-flip-monero-before-december",
      title: "Will ZCASH flip MONERO before December?",
      titleKey: "markets.willZcashFlipMonero",
      image: "/featured-markets/zcash_vs_monero.webp",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 56 },
        { text: "No", percentage: 44 }
      ],
      participants: 18,
      volume: "$1.4k",
      endDate: "Nov 28",
      description: "This market predicts whether Zcash (ZEC) will surpass Monero (XMR) in market capitalization before the end of November 2025.",
      rules: `**Resolution Criteria:**
- This market resolves to YES if Zcash's market cap exceeds Monero's market cap at any point before December 1, 2025, 00:00 UTC
- This market resolves to NO if Zcash's market cap does not exceed Monero's market cap before the deadline

**Resolution Source:**
- Market cap data from CoinGecko and CoinMarketCap will be used for verification
- The market will resolve based on the daily closing prices

**Cancelation Conditions:**
- If either Zcash or Monero becomes delisted from all major exchanges before resolution
- If there is a significant protocol change or network failure affecting either asset`,
      resolutionSource: "CoinGecko & CoinMarketCap",
      createdAt: "Oct 15, 2025"
    },
    {
      id: "2",
      slug: "48-bnb-candles-before-friday-noon",
      title: "48 BNB Candles before Friday noon",
      titleKey: "markets.bnbCandlesBeforeFriday",
      image: "/featured-markets/GettyImages-867941110-10f3a92a788c4e78abbec428a355618e.jpg",
      category: "crypto",
      options: [
        { text: "More Green", percentage: 45 },
        { text: "More Red", percentage: 55 }
      ],
      participants: 64,
      volume: "$1.79k",
      endDate: "Oct 23",
      description: "Predict whether BNB will have more green (up) or red (down) hourly candles in the next 48 hours before Friday at 12:00 PM UTC.",
      rules: `**Resolution Criteria:**
- Count all hourly candles for BNB/USDT from the current time until Friday at 12:00 PM UTC
- Green candles: Close price > Open price
- Red candles: Close price < Open price
- Resolves to "More Green" if green candles outnumber red candles
- Resolves to "More Red" if red candles outnumber green candles
- If equal, market resolves to the option with more volume traded

**Resolution Source:**
- Data from Binance BNB/USDT hourly charts

**Notes:**
- Doji candles (equal open/close) are not counted toward either side`,
      resolutionSource: "Binance Exchange",
      createdAt: "Oct 21, 2025"
    },
    {
      id: "3",
      title: "Will ZCASH hit $369 before November?",
      titleKey: "markets.zcashHit369",
      image: "/featured-markets/zcash-1.png",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 11 },
        { text: "No", percentage: 89 }
      ],
      participants: 71,
      volume: "$15.8k",
      endDate: "Oct 29"
    },
    {
      id: "4",
      title: "Will ZORA flip PUMP in Market Cap within 120 days?",
      titleKey: "markets.zoraFlipPump",
      image: "/featured-markets/pump.fun_rival_zora.webp",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 34 },
        { text: "No", percentage: 66 }
      ],
      participants: 101,
      volume: "$4.82k",
      endDate: "Feb 16"
    },
    {
      id: "5",
      title: "ETH's next move: Pump to 4500 or Dump to 3100?",
      titleKey: "markets.ethPump4500Dump3100",
      image: "/featured-markets/im-333228.avif",
      category: "crypto",
      options: [
        { text: "$4500", percentage: 56 },
        { text: "$3100", percentage: 44 }
      ],
      participants: 300,
      volume: "$24.4k",
      status: "ended"
    },
    {
      id: "6",
      title: "Gold vs ETH - Which hits $5K first?",
      image: "/assets/ethereum-coin-eth-digital-cryptocurrency_258219-297.jpg",
      category: "crypto",
      options: [
        { text: "Gold", percentage: 44 },
        { text: "ETH", percentage: 56 }
      ],
      participants: 331,
      volume: "$30.8k",
      status: "ended"
    },
    {
      id: "7",
      title: "Mando vs KBM on BTC's next move: 120K or 100K?",
      image: "/featured-markets/3d-illustration-bitcoin-over-red-600nw-709680643.webp",
      category: "crypto",
      options: [
        { text: "120K", percentage: 44 },
        { text: "100K", percentage: 56 }
      ],
      participants: 578,
      volume: "$395k",
      status: "ended"
    },
    {
      id: "8",
      title: "Fear or Greed?",
      image: "/featured-markets/iStock-1387454800-scaled-e1673289014746.jpg",
      category: "crypto",
      options: [
        { text: "Fear", percentage: 51 },
        { text: "Greed", percentage: 49 }
      ],
      participants: 453,
      volume: "$200k",
      status: "perpetual",
      description: "A perpetual social experiment gauging crypto market sentiment. This market never closes and will never be resolved.",
      rules: `**This market is a social experiment to gauge social sentiment. To ensure a fair playground for all, there will be no trading fees charged for this market. This market is TRADING ONLY and will never be resolved.**

Fear or Greed? The eternal question that drives markets, moves crowds, and shapes destinies.

Are we in a state of collective fear, with uncertainty and doubt creeping into every decision? Or has greed taken over, with euphoria and FOMO driving the masses?

**Market Period:** 
- Infinite. This is a perpetual market that never closes.

**Resolution Criteria:**
- This market will NEVER resolve
- No winners or losers - purely a gauge of sentiment

**Cancelation Conditions:**
This market will be canceled only if:
- Platform undergoes technical changes requiring all markets to close
- Platform administrators decide to end this experiment

In the event of cancelation, participants may claim their stakes at the market value at the time of cancelation. This could result in a profit or a loss depending on price movements.`,
      resolutionSource: "Never resolves",
      createdAt: "Sep 10, 2025"
    },
    {
      id: "9",
      title: "Will PNKSTR hit $400M during October?",
      image: "/featured-markets/1LnDWcIhmJ_Hmtqw.jpg",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 3 },
        { text: "No", percentage: 97 }
      ],
      participants: 700,
      volume: "$211k",
      endDate: "Oct 31"
    },
    {
      id: "10",
      title: "Stablecoin market cap to pass $360B before February?",
      image: "/featured-markets/images.jpg",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 56 },
        { text: "No", percentage: 44 }
      ],
      participants: 285,
      volume: "$13.2k",
      endDate: "Jan 29"
    },
    {
      id: "11",
      title: "Will MetaMask launch its token before November?",
      image: "/featured-markets/35d448869a91486ba8b872ff98647195.png",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 2 },
        { text: "No", percentage: 98 }
      ],
      participants: 625,
      volume: "$104k",
      endDate: "Oct 31"
    },
    {
      id: "12",
      title: "Will Polymarket announce a token this year?",
      image: "/featured-markets/1756988619-polymarket-generica-03.webp",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 15 },
        { text: "No", percentage: 85 }
      ],
      participants: 527,
      volume: "$134k",
      endDate: "Dec 31"
    },
    {
      id: "13",
      title: "New BNB ATH by end of year?",
      image: "/featured-markets/bnb.jpg",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 30 },
        { text: "No", percentage: 70 }
      ],
      participants: 1150,
      volume: "$155k",
      endDate: "Dec 30"
    },
    {
      id: "14",
      title: "Will Strategy (MSTR) sell any BTC by end of 2025?",
      image: "/featured-markets/913e5664d265cf37455be9ef109cbd76.avif",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 6 },
        { text: "No", percentage: 94 }
      ],
      participants: 545,
      volume: "$78.1k",
      endDate: "Dec 31"
    }
  ],
  sports: [
    {
      id: "s1",
      title: "Will the Lakers win the NBA Championship 2025?",
      image: "/featured-markets/eb0d58b5106cd47839be81daf40bfeab14868727fc69b0777ea6e70705d4d32b.webp",
      category: "sports",
      options: [
        { text: "Yes", percentage: 35 },
        { text: "No", percentage: 65 }
      ],
      participants: 420,
      volume: "$45.2k",
      endDate: "Jun 2025"
    },
    {
      id: "s2",
      title: "Messi to score 30+ goals this season?",
      image: "/featured-markets/dims.apnews.jpg",
      category: "sports",
      options: [
        { text: "Yes", percentage: 62 },
        { text: "No", percentage: 38 }
      ],
      participants: 890,
      volume: "$78.5k",
      endDate: "May 2025"
    },
    {
      id: "s3",
      title: "Will Real Madrid win the 25-26 UEFA Champions League?",
      image: "/featured-markets/madrid.avif",
      category: "sports",
      options: [
        { text: "Yes", percentage: 48 },
        { text: "No", percentage: 52 }
      ],
      participants: 1240,
      volume: "$156k",
      endDate: "May 31"
    },
    {
      id: "s4",
      title: "Will Manchester City win the Premier League?",
      image: "/featured-markets/LRNAAO7EBVOZBF6YLY33C53SPU.jpg",
      category: "sports",
      options: [
        { text: "Yes", percentage: 71 },
        { text: "No", percentage: 29 }
      ],
      participants: 965,
      volume: "$123k",
      endDate: "May 2025"
    },
    {
      id: "s5",
      title: "Tyson Fury vs Usyk rematch - Who wins?",
      image: "/featured-markets/GettyImages-2153594708-scaled.jpg",
      category: "sports",
      options: [
        { text: "Fury", percentage: 44 },
        { text: "Usyk", percentage: 56 }
      ],
      participants: 678,
      volume: "$89.3k",
      endDate: "Dec 21"
    },
    {
      id: "s6",
      title: "Will Lewis Hamilton win another F1 race in 2025?",
      image: "/featured-markets/lewis-hamilton-ferrari.jpg",
      category: "sports",
      options: [
        { text: "Yes", percentage: 67 },
        { text: "No", percentage: 33 }
      ],
      participants: 534,
      volume: "$67.8k",
      endDate: "Dec 2025"
    },
    {
      id: "s7",
      title: "Will Shanghai Port F.C. win the 2025 Chinese Super League?",
      image: "/featured-markets/Screenshot 2025-10-22 222801.png",
      category: "sports",
      options: [
        { text: "Yes", percentage: 61 },
        { text: "No", percentage: 39 }
      ],
      participants: 1234,
      volume: "$145k",
      endDate: "Jun 2025"
    },
    {
      id: "s8",
      title: "Will Ohio State go back to back in the College Football Playoff?",
      image: "/featured-markets/1920_championshippic.jpg",
      category: "sports",
      options: [
        { text: "Yes", percentage: 35 },
        { text: "No", percentage: 65 }
      ],
      participants: 856,
      volume: "$98.2k",
      endDate: "Jan 2026"
    }
  ],
  politics: [
    {
      id: "p1",
      title: "Will Donald Trump meet with Xi Jinping by the end of the year?",
      image: "/featured-markets/china.jpg",
      category: "politics",
      options: [
        { text: "Yes", percentage: 14 },
        { text: "No", percentage: 86 }
      ],
      participants: 1190,
      volume: "$98.7k",
      endDate: "Dec 31"
    },
    {
      id: "p2",
      title: "Will there be a new EU member state by end of 2025?",
      image: "/featured-markets/istockphoto-480985277-612x612.jpg",
      category: "politics",
      options: [
        { text: "Yes", percentage: 22 },
        { text: "No", percentage: 78 }
      ],
      participants: 456,
      volume: "$34.5k",
      endDate: "Dec 31"
    },
    {
      id: "p5",
      title: "China–Taiwan status change by end of 2025?",
      image: "/carousel_11.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 15 },
        { text: "No", percentage: 85 }
      ],
      participants: 1234,
      volume: "$89.2k",
      endDate: "Dec 31"
    },
    {
      id: "p6",
      title: "China passes major national security law in 2025?",
      image: "/carousel_12.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 78 },
        { text: "No", percentage: 22 }
      ],
      participants: 987,
      volume: "$76.5k",
      endDate: "Dec 31"
    },
    {
      id: "p7",
      title: "US issues executive order on NATO by end of 2025?",
      image: "/carousel_13.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 42 },
        { text: "No", percentage: 58 }
      ],
      participants: 654,
      volume: "$45.3k",
      endDate: "Dec 31"
    },
    {
      id: "p8",
      title: "US–China sign new bilateral treaty in 2025?",
      image: "/carousel_21.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 23 },
        { text: "No", percentage: 77 }
      ],
      participants: 543,
      volume: "$38.7k",
      endDate: "Dec 31"
    },
    {
      id: "p9",
      title: "UK opens parliamentary inquiry on foreign interference in 2025?",
      image: "/carousel_22.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 67 },
        { text: "No", percentage: 33 }
      ],
      participants: 432,
      volume: "$29.8k",
      endDate: "Dec 31"
    },
    {
      id: "p10",
      title: "Xi Jinping visits the US in 2025?",
      image: "/carousel_23.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 34 },
        { text: "No", percentage: 66 }
      ],
      participants: 876,
      volume: "$54.2k",
      endDate: "Dec 31"
    },
    {
      id: "p11",
      title: "New UN Security Council resolution on Ukraine in 2025?",
      image: "/carousel_11.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 78 },
        { text: "No", percentage: 22 }
      ],
      participants: 765,
      volume: "$67.3k",
      endDate: "Dec 31"
    },
    {
      id: "p12",
      title: "China announces new military base abroad in 2025?",
      image: "/carousel_12.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 45 },
        { text: "No", percentage: 55 }
      ],
      participants: 321,
      volume: "$23.4k",
      endDate: "Dec 31"
    }
  ],
  economy: [
    {
      id: "e1",
      title: "Will US inflation drop below 2% in 2025?",
      titleKey: "markets.inflationTarget2Percent",
      image: "/featured-markets/Feds-2-percent-inflation-target.webp",
      category: "economy",
      options: [
        { text: "Yes", percentage: 41 },
        { text: "No", percentage: 59 }
      ],
      participants: 876,
      volume: "$112k",
      endDate: "Dec 31"
    },
    {
      id: "e2",
      title: "Fed to cut rates 3+ times in 2025?",
      titleKey: "markets.fedRateCut2025",
      image: "/featured-markets/fed.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 58 },
        { text: "No", percentage: 42 }
      ],
      participants: 1123,
      volume: "$145k",
      endDate: "Dec 31"
    },
    {
      id: "e3",
      title: "Will Tesla stock hit $500 before March 2025?",
      image: "/featured-markets/tesla_tsla_stock_247199dfbd.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 33 },
        { text: "No", percentage: 67 }
      ],
      participants: 934,
      volume: "$87.6k",
      endDate: "Mar 1"
    },
    {
      id: "e4",
      title: "S&P 500 to reach 7000 before end of 2025?",
      image: "/featured-markets/sandp.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 64 },
        { text: "No", percentage: 36 }
      ],
      participants: 1456,
      volume: "$198k",
      endDate: "Dec 31"
    },
    {
      id: "e5",
      title: "Will there be a US recession in 2025?",
      image: "/featured-markets/will-there-be-a-recession-in-2025.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 27 },
        { text: "No", percentage: 73 }
      ],
      participants: 1789,
      volume: "$234k",
      endDate: "Dec 31"
    },
    {
      id: "e6",
      title: "BYD outsells Tesla in China EV market in 2025?",
      image: "/featured-markets/BYD_VS_TESLA-1024x576.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    },
    {
      id: "e7",
      title: "Alibaba regains #1 e-commerce market share in China by end of 2025?",
      image: "/featured-markets/122123979.avif",
      category: "economy",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    },
    {
      id: "e8",
      title: "TikTok (Douyin) parent ByteDance surpasses Tencent in domestic ad revenue in 2025?",
      image: "/featured-markets/TencentByteDanceFI.jpg",
      category: "economy",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    }
  ],
  gaming: [
    {
      id: "g1",
      title: "LoL Worlds 2025 - T1 to win again?",
      titleKey: "markets.lolWorldsT1Win",
      image: "/featured-markets/worlds2.jpg",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 52 },
        { text: "No", percentage: 48 }
      ],
      participants: 2134,
      volume: "$287k",
      endDate: "Nov 2025"
    },
    {
      id: "g2",
      title: "Will GTA 6 release in 2025?",
      titleKey: "markets.gta6Release2025",
      image: "/featured-markets/gta6.jpg",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 78 },
        { text: "No", percentage: 22 }
      ],
      participants: 3456,
      volume: "$456k",
      endDate: "Dec 31"
    },
    {
      id: "g4",
      title: "Will Xbox Game Pass reach 50M subscribers in 2025?",
      titleKey: "markets.xboxGamePass50m",
      image: "/featured-markets/Game-Pass.webp",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 45 },
        { text: "No", percentage: 55 }
      ],
      participants: 567,
      volume: "$67.8k",
      endDate: "Dec 31"
    },
    {
      id: "g5",
      title: "LoL Worlds 2025 - will a Chinese team win worlds?",
      titleKey: "markets.lolWorldsChineseTeam",
      image: "/featured-markets/worlds3.jpg",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 67 },
        { text: "No", percentage: 33 }
      ],
      participants: 1890,
      volume: "$167k",
      endDate: "Dec 31"
    },
  ],
  culture: [
    {
      id: "c2",
      title: "Will Barbie 2 be announced in 2025?",
      titleKey: "markets.barbieBoxOffice",
      image: "/featured-markets/barbie.jpg",
      category: "culture",
      options: [
        { text: "Yes", percentage: 56 },
        { text: "No", percentage: 44 }
      ],
      participants: 1567,
      volume: "$134k",
      endDate: "Dec 31"
    },
    {
      id: "c4",
      title: "Will a meme dance challenge surpass 10 billion plays on Douyin by the end of 2025?",
      image: "/featured-markets/231201122258-subject-three-dance-china.jpg",
      category: "culture",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    },
    {
      id: "c5",
      title: "Will a new Chinese collectible toy surpass Labubu in search volume in 2025?",
      image: "/featured-markets/GettyImages-2220163705-e1750416224401.webp",
      category: "culture",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    },
    {
      id: "c6",
      title: "Will MrBeast break all-time YouTube video record in 2025?",
      image: "/featured-markets/mr_beast_003 PC self.avif",
      category: "culture",
      options: [
        { text: "Yes", percentage: 50 },
        { text: "No", percentage: 50 }
      ],
      participants: 0,
      volume: "$0k",
      endDate: "Dec 31"
    },
  ]
};

export const getAllMarkets = (): Market[] => {
  const allMarkets = Object.values(topicMarkets).flat();
  
  // Auto-generate slugs for markets that don't have them
  return allMarkets.map(market => ({
    ...market,
    slug: market.slug || createSlug(market.title)
  }));
};

export const getMarketsByCategory = (category: string): Market[] => {
  const markets = topicMarkets[category.toLowerCase()] || [];
  
  // Auto-generate slugs for markets that don't have them
  return markets.map(market => ({
    ...market,
    slug: market.slug || createSlug(market.title)
  }));
};
