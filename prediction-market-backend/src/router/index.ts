import { Router, Request, Response } from "express";
import marketRouter from "./market";
import oracleRouter from "./oracle";
import referralRouter from './referral';
import getProfile from './profile';
import betsRouter from './bets';
import balanceRouter from './balance';
import transactionsRouter from './transactions';

const router = Router();
router.use("/market", marketRouter);
router.use("/oracle", oracleRouter);
router.use("/referral", referralRouter);
router.use("/profile", getProfile);
router.use("/bets", betsRouter);
router.use("/balance", balanceRouter);
router.use("/transactions", transactionsRouter);

export default router;
