# Elder Guard

**Elder Guard** is an AI-powered IoT solution designed to enhance the safety and well-being of elderly individuals. By integrating multiple sensors with advanced AI algorithms, it provides real-time monitoring and instant alerts for falls, health anomalies, and distress signals, ensuring timely assistance and peace of mind for caregivers and family members.

![Elder Guard](https://www.yashkumarsingh.tech/img/elderguard.png)

## Problem Statement

Falls and medical emergencies are leading causes of injury-related deaths among older adults. Traditional monitoring systems often rely on wearable devices that can be forgotten, misplaced, or become unusable during emergencies such as unconsciousness. Elder Guard addresses these challenges by providing a non-intrusive, autonomous monitoring solution.

## Features

- **Multi-Sensor Monitoring**: Continuously tracks environmental and physiological data, including temperature, humidity, motion, sound, and SpO₂ levels
- **AI-Based Anomaly Detection**: Accurately identifies falls, abnormal health patterns, fires, and distress signals
- **Real-Time Dashboard**: Offers a web application for real-time monitoring of sensor data and system status
- **Instant Alerts**: Sends immediate email notifications to caregivers and family members during critical events
- **Historical Data Analysis**: Stores and displays sensor readings history for trend analysis
- **User Authentication**: Secure access control using Clerk authentication
- **Mobile Responsive**: Fully responsive design works on desktop and mobile devices

## Technical Architecture

### Hardware Components

- **ESP32 Microcontroller**: Processes sensor data and ensures cloud connectivity
- **DHT11 Sensor**: Measures temperature and humidity levels
- **HC-SR501 PIR Motion Sensor**: Detects movement and potential falls
- **MAX9814 Sound Sensor**: Captures distress noises for analysis
- **MAX30102 Heart Rate & SpO₂ Sensor**: Monitors pulse and blood oxygen levels
- **Touch Sensor**: Enables manual SOS triggering

### Software Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, HeroUI components
- **Backend**: Firebase Realtime Database
- **Authentication**: Clerk
- **Email Service**: Nodemailer with Gmail
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Development Tools**: ESLint, Turbopack

## Installation

To set up the Elder Guard web application locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Celestial-0/elderguard.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd elderguard
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env.local` file in the root directory and add the following variables:

   ```ini
   # Firebase Configuration
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id

   # Gmail Configuration for Notifications
   GMAIL_EMAIL=your_gmail_address@gmail.com
   GMAIL_APP_PASSWORD=your_gmail_app_password
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

## Project Structure

- **`/app`**: Next.js application routes and pages
- **`/components`**: Reusable UI components
- **`/lib`**: Utilities, firebase configuration, and email service
- **`/types`**: TypeScript type definitions
- **`/constants`**: Static data and configuration
- **`/public`**: Static assets
- **`/styles`**: Global CSS and styling utilities

## Key Features

### Dashboard Monitoring

The home page displays real-time sensor data through an intuitive dashboard interface with the following metrics:
- Temperature and humidity
- Heart rate and SpO₂ levels
- Motion detection status
- Sound level monitoring
- Fall detection alerts
- SOS signal status

### Alert System

The system continuously monitors sensor data for anomalies and triggers alerts for:
- Fall detection
- Fire warnings
- SOS signals triggered manually
- Abnormal vital signs

### Email Notifications

Critical alerts are automatically sent via email to configured recipients, featuring:
- Personalized messages
- Alert type identification
- Timestamp information
- Clear call-to-action instructions

### Settings Management

The settings page allows configuration of:
- Email notification preferences
- Recipient contact information
- Alert thresholds (configurable by administrators)

### History Analysis

The history page provides:
- Date-time range selection for data analysis
- Tabular view of historical sensor readings
- Data filtering and sorting capabilities

## Working Mechanism

1. Sensors collect real-time physiological and environmental data
2. The ESP32 microcontroller processes and transmits this data to Firebase
3. The Next.js application retrieves and displays the data in real-time
4. AI algorithms analyze the data for anomalies
5. When abnormal patterns are detected, email alerts are triggered automatically
6. Caregivers can access the dashboard from anywhere to monitor status

## Contributing

We welcome contributions to enhance Elder Guard. To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).

---

Developed by [Yash Kumar Singh](https://www.yashkumarsingh.tech/) | [Contact](mailto:yashkumarsingh@ieee.org)

