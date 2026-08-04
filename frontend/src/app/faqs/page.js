const faqs = [
  { q: 'How does Cash on Delivery work?', a: 'You place your order online with no payment required upfront. When your order arrives at your door, you pay the delivery rider in cash.' },
  { q: 'How long does delivery take?', a: 'Most orders arrive within 3-5 business days, depending on your location.' },
  { q: 'Can I return or exchange an item?', a: 'Yes, we accept returns within 7 days if the item arrives damaged or not as described. See our Return Policy page for details.' },
  { q: 'How do I track my order?', a: 'Use the Order ID from your confirmation page on our Track Your Order page to see your current status.' },
  { q: 'Do you ship nationwide?', a: 'Yes, we deliver across the country with cash on delivery available everywhere we ship.' },
];

export default function FaqsPage() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-16">
      <h1 className="font-display text-3xl mb-8">Frequently Asked Questions</h1>
      <div className="space-y-2">
        {faqs.map((item, i) => (
          <details key={i} className="border-b border-black/10 py-4 group">
            <summary className="cursor-pointer font-medium flex justify-between items-center list-none">
              {item.q}
              <span className="text-inksoft group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-inksoft text-sm mt-3 leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}