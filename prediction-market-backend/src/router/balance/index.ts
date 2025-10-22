import { Router } from "express";
import { addTransaction } from "../transactions";

const router = Router();

interface Balance {
  address: string;
  balance: number;
  lastUpdated: string;
}

interface Transaction {
  id: string;
  address: string;
  type: "deposit" | "bet" | "withdraw";
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  txHash?: string;
}

const balances: Map<string, Balance> = new Map();

const getBalance = (req: any, res: any) => {
  try {
    const { address } = req.params;

    if (!address) {
      return res.status(400).json({ error: "Address required" });
    }

    const balance = balances.get(address.toLowerCase()) || {
      address: address.toLowerCase(),
      balance: 0,
      lastUpdated: new Date().toISOString(),
    };

    return res.json(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const depositBalance = (req: any, res: any) => {
  try {
    const { address, amount, txHash } = req.body;

    if (!address || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedAddress = address.toLowerCase();
    const currentBalance = balances.get(normalizedAddress)?.balance || 0;
    const newBalance = currentBalance + parseFloat(amount);

    const updatedBalance: Balance = {
      address: normalizedAddress,
      balance: newBalance,
      lastUpdated: new Date().toISOString(),
    };

    balances.set(normalizedAddress, updatedBalance);

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      address: normalizedAddress,
      type: "deposit",
      amount: parseFloat(amount),
      status: "completed",
      date: new Date().toISOString(),
      txHash: txHash || undefined,
    };

    addTransaction(transaction);

    console.log(`Deposit: ${amount} BNB to ${normalizedAddress}. New balance: ${newBalance}`);

    return res.status(201).json({
      balance: newBalance,
      transaction,
      message: "Deposit successful",
    });
  } catch (error) {
    console.error("Error processing deposit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deductBalance = (req: any, res: any) => {
  try {
    const { address, amount, reason } = req.body;

    if (!address || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const normalizedAddress = address.toLowerCase();
    const currentBalance = balances.get(normalizedAddress)?.balance || 0;

    if (currentBalance < parseFloat(amount)) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const newBalance = currentBalance - parseFloat(amount);

    const updatedBalance: Balance = {
      address: normalizedAddress,
      balance: newBalance,
      lastUpdated: new Date().toISOString(),
    };

    balances.set(normalizedAddress, updatedBalance);

    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      address: normalizedAddress,
      type: "bet",
      amount: parseFloat(amount),
      status: "completed",
      date: new Date().toISOString(),
    };

    addTransaction(transaction);

    console.log(`Deduct: ${amount} BNB from ${normalizedAddress} for ${reason}. New balance: ${newBalance}`);

    return res.status(200).json({
      balance: newBalance,
      transaction,
      message: "Balance deducted successfully",
    });
  } catch (error) {
    console.error("Error deducting balance:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

router.get("/:address", getBalance);
router.post("/deposit", depositBalance);
router.post("/deduct", deductBalance);

export default router;
