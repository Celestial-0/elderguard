import { Metadata } from "next";
import { EmailSettings } from "@/components/email-settings";
import { title } from "@/components/primitives";

export const metadata: Metadata = {
  title: "Settings",
  description: "Configure your ElderGuard notification preferences and account settings.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className={title()}>Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Configure your notification preferences and account settings.
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <EmailSettings />
        </div>
        
        <div className="col-span-1">
          <h2 className="text-xl font-semibold mb-4">User Guide</h2>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Setting Up Email Notifications</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your email address where you want to receive alerts.</li>
              <li>Provide your name to personalize the notifications.</li>
              <li>Click "Save Settings" to apply your preferences.</li>
              <li>Test the system by triggering a test alert if available.</li>
            </ol>
            
            <h3 className="text-lg font-medium mt-6 mb-2">Important Notes</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Make sure to use an email you check frequently.</li>
              <li>Add elderguard@example.com to your contacts to prevent emails from going to spam.</li>
              <li>Email notifications are sent instantly when the system detects a warning.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 