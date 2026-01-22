import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

interface OrderData {
  name: string;
  email: string;
  service: string;
  description: string;
  deadline: string;
}

interface OrderResponse {
  ticketId: string;
  discordChannelUrl: string;
  inviteUrl: string;
}

const OrderPage = () => {
  const [formData, setFormData] = useState<OrderData>({
    name: '',
    email: '',
    service: '',
    description: '',
    deadline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data: OrderResponse = await response.json();
      setOrderResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Place Order – Aryavrat Studios | Custom Thumbnails & Video Editing</title>
        <meta name="description" content="Place your order for professional thumbnail design and video editing services. Get started with your creator journey today." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main className="pt-20 md:pt-24 pb-20">
        <section className="py-20 bg-brand-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-h1 font-bold text-brand-white mb-6">Place Your Order</h1>
              <p className="text-body text-brand-light-gray max-w-2xl mx-auto">
                Ready to elevate your content? Fill out the form below and we'll create a dedicated Discord channel for your project collaboration.
              </p>
            </motion.div>

            {!orderResponse ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-brand-secondary p-8 rounded-lg"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-brand-light-gray mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-brand-black border border-brand-dark-gray rounded-lg text-brand-white placeholder-brand-light-gray focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-brand-light-gray mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-brand-black border border-brand-dark-gray rounded-lg text-brand-white placeholder-brand-light-gray focus:outline-none focus:ring-2 focus:ring-brand-blue"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-brand-light-gray mb-2">Service</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-brand-black border border-brand-dark-gray rounded-lg text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    >
                      <option value="">Select a service</option>
                      <option value="thumbnail">Custom Thumbnail Design</option>
                      <option value="video-editing">Video Editing</option>
                      <option value="thumbnail-video">Thumbnail + Video Editing Package</option>
                      <option value="retainer">Monthly Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-brand-light-gray mb-2">Project Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-brand-black border border-brand-dark-gray rounded-lg text-brand-white placeholder-brand-light-gray focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none"
                      placeholder="Describe your project, video topic, style preferences, and any specific requirements..."
                    />
                  </div>

                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-brand-light-gray mb-2">Preferred Deadline</label>
                    <input
                      type="date"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-brand-black border border-brand-dark-gray rounded-lg text-brand-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-white text-brand-black py-3 px-6 rounded-lg font-semibold hover:bg-brand-light-gray transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-brand-secondary p-8 rounded-lg text-center"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-brand-white mb-2">Order Placed Successfully!</h2>
                  <p className="text-brand-light-gray mb-6">
                    Your order has been submitted and a dedicated Discord channel has been created for project collaboration.
                  </p>
                </div>

                <div className="bg-brand-black p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-brand-white mb-4">Project Details</h3>
                  <div className="text-left space-y-2">
                    <p className="text-brand-light-gray"><strong>Ticket ID:</strong> {orderResponse.ticketId}</p>
                    <p className="text-brand-light-gray"><strong>Discord Channel:</strong> <a href={orderResponse.discordChannelUrl} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">{orderResponse.discordChannelUrl}</a></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-brand-light-gray">
                    Please join our Discord server and navigate to your private channel to discuss project details with our team.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={orderResponse.inviteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Join Discord Server
                    </a>
                    <Link
                      href="/"
                      className="border border-brand-white text-brand-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-white hover:text-brand-black transition-colors"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;