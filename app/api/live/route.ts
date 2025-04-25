import { NextResponse } from "next/server";
import { ref, get } from "firebase/database";

import { db } from "@/lib/firebase/firebaseConnection";

export async function GET() {
  try {
    const dataRef = ref(db, "Live");
    const snapshot = await get(dataRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ success: false, message: "No data found" });
    }

    const data = snapshot.val();


    const formatted = {
      iR: data.iR ?? 0,
      red: data.red ?? 0,
      spO2: data.spO2 ?? 0,
      averageHeartRate: data.averageHeartRate ?? 0,
      fireStatus: data.fireStatus ?? 0,
      heartRate: data.heartRate ?? 0,
      humidity: data.humidity ?? 0,
      motionDetected: data.motionDetected ?? 0,
      soundLevel: data.soundLevel ?? 0,
      temperature: data.temperature ?? 0,
      timestamp: data.timestamp ?? null,
      fallDetected: data.fallDetected ?? 0,
      touchSOS: data.touchSOS ?? 0,
    };

    return NextResponse.json({ success: true, data: formatted });
  } catch (error) {

    return NextResponse.json(
      { success: false, message: `Server error : ${error}` },
      { status: 500 }
    );
  }
}
