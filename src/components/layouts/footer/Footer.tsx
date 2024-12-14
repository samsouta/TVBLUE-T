import React, { useState } from 'react';
import { Github, Linkedin, Mail, Sparkles, Heart } from 'lucide-react';
import { SiViber } from 'react-icons/si';
import Swal from 'sweetalert2';

const Footer: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const currentYear = new Date().getFullYear();

    // Function to validate email
    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    const handleSubscript = () => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter your email!',
            });
        } else if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                text: 'Please enter a valid email address!',
            });
        } else {
            setError('');
            setEmail('');
            Swal.fire('Thank you for subscribing!');
        }
    };

    return (
        <>
            <footer className="bg-gradient-to-r from-[var(--dark-blue)] mt-20 to-[var(--medium-blue)] text-[var(--soft-blue)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Section with Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="w-6 h-6 text-[var(--light-blue)]" />
                                <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--medium-blue)] to-[var(--soft-blue)] inline-block text-transparent bg-clip-text">
                                    BlueTV
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed">
                                Discover premium adult content with a focus on privacy and quality. For terms, privacy policies, and support, check the links below. Thank you for choosing us.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold text-[#ffffff] mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="mailto:contact@future.com"
                                        className="text-sm hover:text-[#007c8e] transition-colors duration-300 flex items-center space-x-2 group"
                                    >
                                        <Mail className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span>darkken415@gmail.com</span>
                                    </a>
                                </li>
                                <li className="text-sm">73, Jalan Raja Chulan, Bukit Bintang</li>
                                <li className="text-sm">KL , Malaysia</li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-semibold text-[#ffffff] mb-4">Stay Connected</h4>
                            <div className="relative">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 bg-[#6b8784]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007c8e] transition-all duration-300 placeholder-[#93a4ab]"
                                />
                                <button
                                    onClick={handleSubscript}
                                    className="mt-2 w-full bg-gradient-to-r from-[var(--medium-blue)] via-[var(--soft-blue)] to-[var(--light-blue)] text-[var(--white)] py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2"
                                >
                                    <span>Subscribe</span>
                                    <Sparkles className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-[#93a4ab]/20 to-transparent" />

                    {/* Bottom Section */}
                    <div className="py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            {/* Copyright */}
                            <div className="flex items-center space-x-2">
                                <Heart className="w-4 h-4 text-[var(--light-blue)]" />
                                <p className="text-sm">
                                    © {currentYear} BlueTV. All rights reserved.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {[
                                    { icon: SiViber, href: 'viber://contact?number=+601117901410' },
                                    { icon: Github, href: 'https://github.com/samsouta' },
                                    { icon: Linkedin, href: 'https://www.linkedin.com/in/sam-souta-a28384321/' },
                                ].map(({ icon: Icon, href }, index) => (
                                    <a
                                        key={index}
                                        href={href}
                                        className="transform hover:scale-110 hover:text-[#007c8e] transition-all duration-300"
                                        aria-label={`Social link ${index + 1}`}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
