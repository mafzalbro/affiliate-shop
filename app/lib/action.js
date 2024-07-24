// app/action.js
'use server'

import { insertContact, sendContactForm } from '@/app/lib/contact';
import { z } from 'zod';

// Define schema for validation
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
});

export async function handleContactForm(formData) {
  // Validate the form data
  const result = schema.safeParse(formData);

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    // Insert into database
    await insertContact(result.data);
    
    // Send email
    await sendContactForm(result.data);

    return { success: true };
  } catch (error) {
    return { errors: { global: 'Failed to send the message. Please try again later.' } };
  }
}
