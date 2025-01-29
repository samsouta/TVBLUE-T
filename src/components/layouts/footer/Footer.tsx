import React, { useState } from 'react';
import {  Mail, Sparkles, Heart } from 'lucide-react';
import Swal from 'sweetalert2';
import { FaTelegram } from 'react-icons/fa';

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
            <footer className="bg-gradient-to-r from-[var(--dark-blue)] mt-10 to-[var(--medium-blue)] text-[var(--soft-blue)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Section with Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Sparkles className="w-6 h-6 text-[var(--light-blue)]" />
                                <h3 className="text-xl font-bold bg-gradient-to-r from-[var(--medium-blue)] to-[var(--soft-blue)] inline-block text-transparent bg-clip-text">
                                    TVBlue
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed">
                            ပင်ပန်းနေပြီလား??ဒီမှာလာအနားယူပါ 🙂‍↔️ <br/>
                            Are u tired ? Come and relax here dude
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold text-[#ffffff] mb-4">Contact</h4>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="mailto:darkken415@gmail.com"
                                        className="text-sm hover:text-[#007c8e] transition-colors duration-300 flex items-center font-bold space-x-2 group"
                                    >
                                        <Mail className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                        <span>Contact Now</span>
                                    </a>
                                </li>
                                <a
                                    href="https://t.me/bluetv67"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm hover:text-[#007c8e] transition-colors duration-300 flex items-center font-bold space-x-2 group"
                                >
                                    <FaTelegram className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                                    <span>Join Our Telegram</span>
                                </a>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        {/* <div>
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
                        </div> */}
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
                                    © {currentYear} TVBLUE. All rights reserved.
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
