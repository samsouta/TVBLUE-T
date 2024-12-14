import React, { useState, ChangeEvent, FormEvent } from 'react'
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

interface FormData {
    name: string;
    email: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your server
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
        Swal.fire("Thank you for your message! We will get back to you soon.");
    };

    return (
        <div className="min-h-screen mt-24 text-white">
            <header className="container mx-auto px-4 py-8">
                <motion.h1
                    className="text-4xl md:text-6xl font-bold text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to Our Creative Studio
                </motion.h1>
            </header>

            <main className="container mx-auto px-4 py-12">
                <motion.section
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Web Design', 'Branding', 'Digital Marketing'].map((service, index) => (
                            <motion.div
                                key={service}
                                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-6"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                                <p>We offer top-notch {service.toLowerCase()} services tailored to your needs.</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section
                    className="mb-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Over 10 years of industry experience</li>
                        <li>Dedicated team of creative professionals</li>
                        <li>Customized solutions for your unique needs</li>
                        <li>Proven track record of successful projects</li>
                    </ul>
                </motion.section>

                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="mb-4">
                            <label htmlFor="name" className="block mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                            ></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.section>
            </main>
        </div>
    )
}

export default Contact;