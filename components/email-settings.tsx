"use client";

import { useState, useEffect } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';

export function EmailSettings() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load saved values on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('elderguard_email') || '';
    const savedName = localStorage.getItem('elderguard_name') || '';
    setEmail(savedEmail);
    setName(savedName);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save values to localStorage
      localStorage.setItem('elderguard_email', email);
      localStorage.setItem('elderguard_name', name);
      
      // Show success message
      setSaveStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving email settings:', error);
      setSaveStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Email Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Recipient Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Recipient Name
          </label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            className="w-full"
          />
        </div>
        
        <Button type="submit" className="w-full">
          Save Settings
        </Button>
        
        {saveStatus === 'success' && (
          <p className="mt-2 text-sm text-green-500">Settings saved successfully!</p>
        )}
        
        {saveStatus === 'error' && (
          <p className="mt-2 text-sm text-red-500">
            Error saving settings. Please try again.
          </p>
        )}
      </form>
      
      <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded text-sm">
        <p className="font-medium mb-2">About Email Notifications</p>
        <p>
          Email notifications will be sent to this address when the system detects
          warnings such as falls, fire, or SOS signals. Make sure to use a valid
          email address that you check regularly.
        </p>
      </div>
    </div>
  );
} 