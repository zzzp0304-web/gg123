import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, amount, reason } = body;

    if (!address || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${backendUrl}/api/balance/deduct`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, amount, reason }),
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
      } else {
        const errorData = await response.json().catch(() => ({ error: "Failed to deduct balance" }));
        return NextResponse.json(errorData, { status: response.status });
      }
    } catch (error) {
      console.log("Backend not available");
      return NextResponse.json(
        { error: "Backend not available" },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Error deducting balance:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
