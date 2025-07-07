import { useState } from 'react';
import { submitContactForm } from '../api/wp';

export default function ContactForm() {
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);

    submitContactForm(formData)
      .then(() => {
        setStatus('success');
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input name="your-name" placeholder="Name" className="w-full border p-2" required />
      <input name="your-email" type="email" placeholder="Email" className="w-full border p-2" required />
      <textarea name="your-message" placeholder="Message" className="w-full border p-2" required />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>

      {status === 'success' && <p className="text-green-600">✅ Message sent!</p>}
      {status === 'error' && <p className="text-red-600">❌ Something went wrong.</p>}
    </form>
  );
}
