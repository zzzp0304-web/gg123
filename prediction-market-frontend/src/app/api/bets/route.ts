import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { marketId, option, amount, optionText } = body;

    if (!marketId || option === undefined || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bet = {
      marketId,
      option,
      amount,
      optionText,
      timestamp: new Date().toISOString(),
      userAddress: "demo-user",
    };

    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${backendUrl}/api/bets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bet),
      });

      if (response.ok) {
        const savedBet = await response.json();
        return NextResponse.json(savedBet, { status: 201 });
      }
    } catch (error) {
      console.log("Database not available, continuing in demo mode");
    }

    return NextResponse.json(bet, { status: 201 });
  } catch (error) {
    console.error("Error creating bet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
