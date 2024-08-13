'use client'

import { useState } from 'react';
import { handleContactForm } from '@/app/lib/action';
import HeroSection from '@/app/components/HeroSection';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [response, setResponse] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true)
    const res = await handleContactForm(formData);
    setResponse(res);
    setIsSending(false)
    setFormData({ name: '', email: '', message: '' })
  };
  

  return (
    <>
      <HeroSection 
        title="Contact"
        className="py-10"
      />
    <div className="w-full md:w-2/4 mx-auto p-8 bg-white rounded-lg min-h-[83vh] flex justify-center flex-col">
      {/* <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows="5"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 disabled:bg-blue-400 ${isSending ? 'disabled:cursor-wait' : 'disabled:cursor-not-allowed'}`}
            disabled={isSending || formData.name === '' || formData.email === '' || formData.message === ''}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
        {response && (
          <div
            className={`mt-4 text-center ${
              response.success ? 'text-green-500' : 'text-red-500'
            }
            `}
          >
            {response.success ? 'Message sent successfully!' : 'Failed to send message'}
          </div>
        )}
      </form>
    </div>
          </>
  );
};

export default ContactPage;
