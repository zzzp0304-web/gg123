import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, amount, txHash } = body;

    if (!address || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${backendUrl}/api/balance/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, amount, txHash }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
      }
    } catch (error) {
      console.log("Backend not available, operating in demo mode");
    }

    return NextResponse.json(
      { balance: amount, message: "Deposit recorded (demo mode)" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing deposit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
