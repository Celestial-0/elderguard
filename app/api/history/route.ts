import { NextResponse } from "next/server";
import { ref, get, query, orderByKey, startAt, endAt, Query } from "firebase/database";
import { db } from "@/lib/firebase/firebaseConnection";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const historyRef = ref(db, "History");
    let historyQuery: Query = historyRef;

    if (from && to) {
      historyQuery = query(historyRef, orderByKey(), startAt(from), endAt(to));
    }

    const snapshot = await get(historyQuery);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const formatted = Object.entries(data).map(([id, value]) => ({
        id,
        ...(typeof value === "object" && value !== null ? value : {}),
      }));
      return NextResponse.json({ success: true, data: formatted });
    } else {
      return NextResponse.json(
        { success: false, message: "No data found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Firebase GET error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, message: `Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
