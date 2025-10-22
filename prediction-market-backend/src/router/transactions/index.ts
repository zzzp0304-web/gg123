import { Router } from "express";

const router = Router();

interface Transaction {
  id: string;
  address: string;
  type: "deposit" | "bet" | "withdraw";
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  txHash?: string;
}

const transactions: Transaction[] = [];

export function addTransaction(transaction: Transaction) {
  transactions.push(transaction);
}

const getTransactions = (req: any, res: any) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ error: "Address required" });
    }

    const normalizedAddress = address.toLowerCase();
    const userTransactions = transactions.filter(
      (tx) => tx.address === normalizedAddress
    );

    return res.json({
      transactions: userTransactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/:address", getTransactions);

export default router;
