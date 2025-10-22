export interface Market {
  id: string;
  title: string;
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
}

export const topicMarkets: Record<string, Market[]> = {
  crypto: [
    {
      id: "1",
      title: "Will ZCASH flip MONERO before December?",
      image: "/carousel_12.png",
      category: "crypto",
      options: [
        { text: "Yes", percentage: 56 },
        { text: "No", percentage: 44 }
      ],
      participants: 18,
      volume: "$1.4k",
      endDate: "Nov 28"
    },
    {
      id: "2",
      title: "48 BNB Candles before Friday noon",
      image: "/carousel_13.png",
      category: "crypto",
      options: [
        { text: "More Green", percentage: 45 },
        { text: "More Red", percentage: 55 }
      ],
      participants: 64,
      volume: "$1.79k",
      endDate: "Oct 23"
    },
    {
      id: "3",
      title: "Will ZCASH hit $369 before November?",
      image: "/carousel_11.png",
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
      image: "/carousel_22.png",
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
      image: "/carousel_12.png",
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
      image: "/carousel_13.png",
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
      image: "/carousel_12.png",
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
      image: "/carousel_22.png",
      category: "crypto",
      options: [
        { text: "Fear", percentage: 51 },
        { text: "Greed", percentage: 49 }
      ],
      participants: 453,
      volume: "$200k",
      status: "perpetual"
    },
    {
      id: "9",
      title: "Will PNKSTR hit $400M during October?",
      image: "/carousel_23.png",
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
      image: "/carousel_11.png",
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
      image: "/carousel_11.png",
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
      image: "/carousel_22.png",
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
      title: "New Solana ATH by end of year?",
      image: "/carousel_13.png",
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
      image: "/carousel_12.png",
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
      image: "/carousel_21.png",
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
      image: "/carousel_22.png",
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
      title: "Will Real Madrid win Champions League 2025?",
      image: "/carousel_23.png",
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
      image: "/carousel_21.png",
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
      image: "/carousel_22.png",
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
      image: "/carousel_12.png",
      category: "sports",
      options: [
        { text: "Yes", percentage: 67 },
        { text: "No", percentage: 33 }
      ],
      participants: 534,
      volume: "$67.8k",
      endDate: "Dec 2025"
    }
  ],
  politics: [
    {
      id: "p1",
      title: "Will Donald Trump visit China in 2025?",
      image: "/carousel_21.png",
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
      image: "/carousel_22.png",
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
      id: "p3",
      title: "Will Biden run for re-election in 2024?",
      image: "/carousel_23.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 8 },
        { text: "No", percentage: 92 }
      ],
      participants: 2345,
      volume: "$456k",
      status: "ended"
    },
    {
      id: "p4",
      title: "UK General Election before 2025?",
      image: "/carousel_21.png",
      category: "politics",
      options: [
        { text: "Yes", percentage: 12 },
        { text: "No", percentage: 88 }
      ],
      participants: 789,
      volume: "$67.8k",
      status: "ended"
    }
  ],
  economy: [
    {
      id: "e1",
      title: "Will US inflation drop below 2% in 2025?",
      image: "/carousel_12.png",
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
      image: "/carousel_13.png",
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
      image: "/carousel_11.png",
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
      image: "/carousel_22.png",
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
      image: "/carousel_23.png",
      category: "economy",
      options: [
        { text: "Yes", percentage: 27 },
        { text: "No", percentage: 73 }
      ],
      participants: 1789,
      volume: "$234k",
      endDate: "Dec 31"
    }
  ],
  gaming: [
    {
      id: "g1",
      title: "LoL Worlds 2025 - T1 to win again?",
      image: "/lol-2025-worlds.jpg",
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
      image: "/carousel_21.png",
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
      id: "g3",
      title: "TI 2025 Dota 2 - Will Team Liquid win?",
      image: "/carousel_22.png",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 38 },
        { text: "No", percentage: 62 }
      ],
      participants: 892,
      volume: "$123k",
      endDate: "Aug 2025"
    },
    {
      id: "g4",
      title: "Will Xbox Game Pass reach 50M subscribers in 2025?",
      image: "/carousel_23.png",
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
      title: "Fortnite to add a Battle Royale map in China?",
      image: "/carousel_11.png",
      category: "gaming",
      options: [
        { text: "Yes", percentage: 61 },
        { text: "No", percentage: 39 }
      ],
      participants: 1234,
      volume: "$145k",
      endDate: "Jun 2025"
    }
  ],
  culture: [
    {
      id: "c1",
      title: "Will Taylor Swift announce a new album in 2025?",
      image: "/carousel_21.png",
      category: "culture",
      options: [
        { text: "Yes", percentage: 73 },
        { text: "No", percentage: 27 }
      ],
      participants: 2345,
      volume: "$189k",
      endDate: "Dec 31"
    },
    {
      id: "c2",
      title: "Will Barbie 2 be announced in 2025?",
      image: "/carousel_22.png",
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
      id: "c3",
      title: "Oscars 2025 - Will Oppenheimer win Best Picture?",
      image: "/carousel_23.png",
      category: "culture",
      options: [
        { text: "Yes", percentage: 82 },
        { text: "No", percentage: 18 }
      ],
      participants: 2890,
      volume: "$298k",
      status: "ended"
    },
    {
      id: "c4",
      title: "Will Marvel announce Avengers 6 release date in 2025?",
      image: "/carousel_11.png",
      category: "culture",
      options: [
        { text: "Yes", percentage: 67 },
        { text: "No", percentage: 33 }
      ],
      participants: 1890,
      volume: "$167k",
      endDate: "Dec 31"
    },
    {
      id: "c5",
      title: "Will The Weeknd release a new album in H1 2025?",
      image: "/carousel_12.png",
      category: "culture",
      options: [
        { text: "Yes", percentage: 48 },
        { text: "No", percentage: 52 }
      ],
      participants: 987,
      volume: "$89.7k",
      endDate: "Jun 30"
    }
  ]
};

export const getAllMarkets = (): Market[] => {
  return Object.values(topicMarkets).flat();
};

export const getMarketsByCategory = (category: string): Market[] => {
  return topicMarkets[category.toLowerCase()] || [];
};
