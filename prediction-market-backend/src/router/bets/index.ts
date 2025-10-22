import { Router } from "express";

const router = Router();

interface Bet {
  marketId: string;
  option: number;
  amount: number;
  optionText: string;
  timestamp: string;
  userAddress: string;
}

const bets: Bet[] = [];

const createBet = (req: any, res: any) => {
  try {
    const { marketId, option, amount, optionText, userAddress } = req.body;

    if (!marketId || option === undefined || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bet: Bet = {
      marketId,
      option,
      amount,
      optionText,
      timestamp: new Date().toISOString(),
      userAddress: userAddress || "demo-user",
    };

    bets.push(bet);

    console.log(`Bet saved: ${amount} BNB on ${optionText} for market ${marketId}`);

    return res.status(201).json(bet);
  } catch (error) {
    console.error("Error saving bet:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getBets = (req: any, res: any) => {
  try {
    const { marketId, userAddress } = req.query;

    let filteredBets = bets;

    if (marketId) {
      filteredBets = filteredBets.filter((b) => b.marketId === marketId);
    }

    if (userAddress) {
      filteredBets = filteredBets.filter((b) => b.userAddress === userAddress);
    }

    return res.json(filteredBets);
  } catch (error) {
    console.error("Error fetching bets:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.post("/", createBet);
router.get("/", getBets);

export default router;
