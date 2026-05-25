'use client';

import { profile } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Mail, Github, Linkedin, MapPin, Send, Phone, Clock, MessageSquare, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocale } from '@/src/context/LocaleContext';

export default function ContactPage() {
    const { t } = useLocale();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setSubmitStatus('idle'), 5000);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const socialLinks = [
        {
            name: 'Email',
            icon: Mail,
            value: profile.email,
            href: `mailto:${profile.email}`,
            color: 'from-red-500 to-pink-500',
            description: t('contact.social.emailDesc'),
        },
        {
            name: 'GitHub',
            icon: Github,
            value: 'github.com/ntnhan19',
            href: profile.github,
            color: 'from-slate-700 to-slate-900',
            description: t('contact.social.githubDesc'),
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            value: 'LinkedIn Profile',
            href: profile.linkedin,
            color: 'from-blue-600 to-blue-700',
            description: t('contact.social.linkedinDesc'),
        },
    ];

    const contactInfo = [
        { icon: MapPin, title: t('contact.info.address'), value: t('contact.info.addressValue'), color: 'text-red-600' },
        { icon: Phone,  title: t('contact.info.phone'),   value: t('contact.info.phoneValue'),   color: 'text-green-600' },
        { icon: Clock,  title: t('contact.info.hours'),   value: t('contact.info.hoursValue'),   color: 'text-blue-600' },
    ];

    const faqs: { q: string; a: string }[] = [
        { q: t('contact.faq.items.0.q'), a: t('contact.faq.items.0.a') },
        { q: t('contact.faq.items.1.q'), a: t('contact.faq.items.1.a') },
        { q: t('contact.faq.items.2.q'), a: t('contact.faq.items.2.a') },
        { q: t('contact.faq.items.3.q'), a: t('contact.faq.items.3.a') },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        {t('contact.backHome')}
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
                            <MessageSquare size={40} className="text-blue-300" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            {t('contact.pageTitle')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                {t('contact.pageTitleHighlight')}
                            </span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            {t('contact.pageDesc')}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Form — 3 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-3"
                    >
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{t('contact.formTitle')}</h2>
                            <p className="text-slate-600 mb-8">{t('contact.formSubtitle')}</p>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                                >
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-semibold text-green-900">{t('contact.successTitle')}</h3>
                                        <p className="text-sm text-green-700">{t('contact.successDesc')}</p>
                                    </div>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name & Email */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            {t('contact.fields.name')} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={t('contact.fields.namePlaceholder')}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            {t('contact.fields.email')} <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={t('contact.fields.emailPlaceholder')}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        {t('contact.fields.subject')} <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">{t('contact.fields.subjectPlaceholder')}</option>
                                        <option value="internship">{t('contact.fields.subjectInternship')}</option>
                                        <option value="project">{t('contact.fields.subjectProject')}</option>
                                        <option value="question">{t('contact.fields.subjectQuestion')}</option>
                                        <option value="other">{t('contact.fields.subjectOther')}</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        {t('contact.fields.message')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder={t('contact.fields.messagePlaceholder')}
                                    />
                                    <p className="text-xs text-slate-500 mt-2">
                                        {formData.message.length}/500 {t('contact.chars')}
                                    </p>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            {t('contact.sending')}
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            {t('contact.send')}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Sidebar — 2 columns */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Contact Info */}
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">{t('contact.info.title')}</h3>
                            <div className="space-y-4">
                                {contactInfo.map((info, i) => {
                                    const Icon = info.icon;
                                    return (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className={`p-3 ${info.color} bg-opacity-10 rounded-xl`}>
                                                <Icon className={info.color} size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-slate-900 text-sm">{info.title}</h4>
                                                <p className="text-slate-600 text-sm">{info.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-6">{t('contact.social.title')}</h3>
                            <div className="space-y-3">
                                {socialLinks.map((link, i) => {
                                    const Icon = link.icon;
                                    return (
                                        <a
                                            key={i}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all group border border-slate-200 hover:border-slate-300"
                                        >
                                            <div className={`p-3 bg-gradient-to-br ${link.color} rounded-xl`}>
                                                <Icon className="text-white" size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                                    {link.name}
                                                </h4>
                                                <p className="text-slate-500 text-xs">{link.description}</p>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CV Download */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white">
                            <h3 className="text-xl font-bold mb-3">{t('contact.cv.title')}</h3>
                            <p className="text-blue-100 mb-6 text-sm">{t('contact.cv.desc')}</p>
                            <Link
                                href="/resume"
                                className="block w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-blue-50 transition-all text-center"
                            >
                                {t('contact.cv.link')}
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t('contact.faq.title')}</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {faqs.map((faq, i) => (
                                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2 text-sm">{faq.q}</h3>
                                    <p className="text-slate-600 text-sm">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}