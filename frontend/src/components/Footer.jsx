'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-bgalt mt-10">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div>
            <h4 className="text-xs uppercase tracking-wide font-semibold mb-4">About</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/faqs">FAQs</Link>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/track-order">Track Your Order</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wide font-semibold mb-4">Policy</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/returns">Return Policy</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/shipping">Shipping Information</Link>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs uppercase tracking-wide font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-inksoft mb-4">
              Questions? Reach out and we'll get back to you within a day.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 border border-black/10 rounded px-3 py-2.5 text-sm bg-white min-w-0"
              />
              <button type="submit" className="bg-rosedeep text-white px-4 py-2.5 rounded text-sm font-medium whitespace-nowrap">
                Subscribe
              </button>
            </form>
            {subscribed && <p className="text-sage text-xs mt-2">Thanks for subscribing!</p>}
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wide font-semibold mb-4">Contact</h4>
            <div className="text-sm text-inksoft space-y-3">
              <p className="font-medium text-ink">Mubashir Trader LLC</p>

              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-sage flex-shrink-0 mt-0.5" />
                <span>5900 Balcones Drive Suite 100, Austin TX 78731</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-sage flex-shrink-0" />
                <a href="tel:+17373042971">+1 737-304-2971</a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-sage flex-shrink-0" />
                <a href="mailto:support@delmerra.com">support@delmerra.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-inksoft">
          <span>© 2026 Delmerra. All rights reserved.</span>
          <span>Cash on Delivery Available Nationwide</span>
        </div>
      </div>
    </footer>
  );
}