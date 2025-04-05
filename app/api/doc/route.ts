import { NextResponse } from "next/server";

export async function GET() {
  const elderGuardData = {
    title: "Elder Guard",
    introduction: {
      text: "As the global population ages, ensuring the safety and well-being of elderly individuals has become increasingly vital. Falls and medical emergencies represent significant risks for older adults in today’s world. Elder Guard, an AI-powered, IoT-based solution, addresses these challenges effectively. Designed for elderly individuals living independently or in care facilities, this system provides instant alerts and remote monitoring to enhance safety and health."
    },
    problem_statement: {
      text: "Research indicates that falls are a leading cause of injury-related deaths among older adults. Many elderly individuals live alone, making it difficult for caregivers or family members to monitor their health and well-being continuously. Traditional monitoring systems often rely on manual check-ins or wearable sensors, which can be impractical if forgotten, misplaced, or rendered unusable during emergencies such as unconsciousness."
    },
    solution_overview: {
      text: "Elder Guard delivers a non-intrusive, autonomous monitoring solution by integrating IoT sensors with advanced AI algorithms. The system is housed in a compact physical unit that can be installed in a room. Using an array of sensors, it continuously monitors for unusual activities—such as falls, irregular heartbeats, or distress cries—and analyzes the data in real time. A cloud-based web platform allows caregivers and family members to access live and historical data, while critical events trigger immediate SMS alerts to designated contacts, including emergency responders."
    },
    key_features: [
      {
        name: "Multi-Sensor Monitoring",
        description: "Incorporates temperature, motion, sound, and SpO2 sensors for comprehensive tracking."
      },
      {
        name: "AI-Based Anomaly Detection",
        description: "Detects falls, abnormal health patterns, and distress signals with precision."
      },
      {
        name: "Remote Monitoring",
        description: "A web application provides real-time updates and emergency notifications."
      },
      {
        name: "Instant Alerts",
        description: "Sends immediate SMS notifications to caregivers and family members."
      },
      {
        name: "Non-Intrusive Design",
        description: "Operates seamlessly in the background without requiring wearables."
      }
    ],
    technical_architecture: {
      hardware_components: [
        {
          name: "ESP32 Microcontroller",
          description: "Processes sensor data and ensures cloud connectivity."
        },
        {
          name: "DHT11 Sensor",
          description: "Tracks temperature and humidity levels."
        },
        {
          name: "HC-SR501 PIR Motion Sensor",
          description: "Detects movement and potential falls."
        },
        {
          name: "MAX9814 Sound Sensor",
          description: "Captures distress noises for analysis."
        },
        {
          name: "MAX30102 Heart Rate & SpO2 Sensor",
          description: "Monitors pulse and blood oxygen levels."
        }
      ],
      tech_stack: {
        web_stack: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "HeroUI"],
        web_tools: ["Dotenv"],
        deployment: "Vercel",
        database: "Google Firebase",
        ide: "Arduino IDE"
      },
      working_mechanism: [
        "Sensors collect real-time physiological and environmental data.",
        "The ESP32 microcontroller processes and transmits this data to the cloud.",
        "AI algorithms analyze the data for anomalies, triggering SMS alerts to caregivers or emergency services when necessary.",
        "Caregivers access live and historical data via the web platform."
      ]
    },
    unique_selling_points: [
      {
        name: "Fully Autonomous",
        description: "Operates without wearables or manual intervention."
      },
      {
        name: "Remote Accessibility",
        description: "Enables global status monitoring for caregivers and family members."
      },
      {
        name: "Scalability",
        description: "Integrates seamlessly with smart home systems and healthcare facilities."
      }
    ],
    market_potential_and_impact: {
      market_potential: [
        "The global elderly care market is projected to reach $2.8 trillion by 2030, growing at a CAGR of 6.8%.",
        "The World Health Organization reports 37.3 million severe falls annually requiring medical attention.",
        "The fall detection market alone is expected to surpass $1.5 billion by 2027."
      ],
      impact: [
        "Shortens emergency response times, potentially saving lives.",
        "Promotes independence for older adults through safer living conditions.",
        "Empowers caregivers with real-time insights and remote oversight."
      ]
    },
    future_enhancements: [
      "Integration with smart home devices like Alexa for enhanced functionality.",
      "Development of an optional wearable for outdoor monitoring.",
      "Creation of a mobile app with an SOS emergency alert feature to improve mobility and security."
    ],
    conclusion: {
      text: "Elder Guard combines cutting-edge AI and IoT technology to deliver a secure, non-intrusive solution for elderly safety. By providing real-time monitoring and instant emergency notifications, it offers peace of mind to both seniors and their caregivers. With planned enhancements, Elder Guard has the potential to become a cornerstone of elderly healthcare and monitoring worldwide."
    }
  };

  return NextResponse.json(elderGuardData, { status: 200 });
}