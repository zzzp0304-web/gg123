import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { error: "Address required" },
        { status: 400 }
      );
    }

    try {
      const backendUrl = process.env.BACKEND_URL || "http://localhost:9000";
      const response = await fetch(`${backendUrl}/api/balance/${address}`);

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    } catch (error) {
      console.log("Backend not available, returning zero balance");
    }

    return NextResponse.json({ balance: 0, address });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
