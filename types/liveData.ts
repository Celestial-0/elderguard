export interface LiveData {
    data: {
      temperature: number;
      spO2: number;
      averageHeartRate: number;
      fireStatus: number;
      heartRate: number;
      humidity: number;
      motionDetected: number;
      soundLevel: number;
      timestamp: string;
      fallDetected: number;
    };
  }