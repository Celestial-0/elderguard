# Elder Guard

**Elder Guard** is an AI-powered IoT solution designed to enhance the safety and well-being of elderly individuals. By integrating multiple sensors with advanced AI algorithms, it provides real-time monitoring and instant alerts for falls, health anomalies, and distress signals, ensuring timely assistance and peace of mind for caregivers and family members.

## Features

- **Multi-Sensor Monitoring**: Continuously tracks environmental and physiological data, including temperature, motion, sound, and SpO₂ levels.
- **AI-Based Anomaly Detection**: Accurately identifies falls, abnormal health patterns, and distress signals.
- **Remote Monitoring**: Offers a web application for real-time updates and emergency notifications.
- **Instant Alerts**: Sends immediate SMS notifications to caregivers and family members during critical events.

## Technical Architecture

### Hardware Components

- **ESP32 Microcontroller**: Processes sensor data and ensures cloud connectivity.
- **DHT11 Sensor**: Measures temperature and humidity levels.
- **HC-SR501 PIR Motion Sensor**: Detects movement and potential falls.
- **MAX9814 Sound Sensor**: Captures distress noises for analysis.
- **MAX30102 Heart Rate & SpO₂ Sensor**: Monitors pulse and blood oxygen levels.

### Software Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, HeroUI
- **Backend**: Firebase (Google Cloud)
- **Deployment**: Vercel
- **Development Tools**: Arduino IDE, Dotenv

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
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

   Replace `your_api_key`, `your_project_id`, `your_messaging_sender_id`, and `your_app_id` with your actual Firebase project credentials. You can find these in your Firebase project's settings under the "General" tab.

5. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   The application will be running at `http://localhost:3000`.

## Usage

- **Home**: View real-time sensor data and system status.
- **Alerts**: Configure and manage emergency contacts for SMS notifications.
- **History**: Customize monitoring parameters and system preferences.

## Contributing

We welcome contributions to enhance Elder Guard. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

For more information, visit our [website](https://elderguard.vercel.app/) or contact us at [contact@elderguard.com](mailto:yashkumarsingh@ieee.org).

