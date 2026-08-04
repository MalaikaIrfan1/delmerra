'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Message from ' + form.name);
    const body = encodeURIComponent(form.message + '\n\nFrom: ' + form.email);
    window.location.href = `mailto:support@delmerra.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="max-w-xl mx-auto px-8 py-16">
      <h1 className="font-display text-3xl mb-3">Contact Us</h1>
      <p className="text-inksoft mb-8">Have a question? We usually reply within a day.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-black/10 rounded px-3 py-2.5 text-sm"
        />
        <input
          required
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-black/10 rounded px-3 py-2.5 text-sm"
        />
        <textarea
          required
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-black/10 rounded px-3 py-2.5 text-sm min-h-[120px]"
        />
        <button className="bg-ink text-white px-6 py-3 rounded font-medium">Send Message</button>
      </form>
    </main>
  );
}