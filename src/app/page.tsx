'use client';
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Trophy, BookOpen, Users, Rocket, Award, CheckCircle, Star, Zap, Brain, Target, Send, Lightbulb, TrendingUp, Clock, Globe, FileText, UserCheck, DollarSign, Upload, X } from 'lucide-react';
import CircularText from '@/components/CircularText';
import CountTimer from '@/components/CountTimer';

export default function AIHacksLanding() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [formData, setFormData] = useState({
    teamName: '',
    leaderName: '',
    phone: '',
    members: '',
    agree: false,
    pitchDeck: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showObjWins, setShowObjWins] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked as boolean) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (100MB = 104857600 bytes)
      if (file.size > 104857600) {
        setError('File size must be less than 100MB');
        return;
      }
      
      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError('Only PDF and PPT files are allowed');
        return;
      }
      
      setFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        pitchDeck: file,
      }));
      setError('');
    }
  };

  const removeFile = (): void => {
    setFileName('');
    setFormData((prev) => ({
      ...prev,
      pitchDeck: null,
    }));
  };

  interface RegistrationFormValues {
    teamName: string;
    leaderName: string;
    phone: string;
    members: string;
    agree: boolean;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.pitchDeck) {
      setError('Please upload your pitch deck');
      setIsSubmitting(false);
      return;
    }

    const data = formData as RegistrationFormValues & { pitchDeck: File | null };

    const googleFormData = new FormData();
    googleFormData.append('entry.2092238618', data.teamName);
    googleFormData.append('entry.1556369182', data.leaderName);
    googleFormData.append('entry.1457601567', data.phone);
    googleFormData.append('entry.479301265', data.members || 'Individual');
    if (data.agree) {
      googleFormData.append('entry.2109138769', 'I agree');
    }

    const formUrl: string = "https://docs.google.com/forms/d/e/1FAIpQLSeOu_vIvA7JRlQKbChqPPwLAMpUOUSfv7c9Hkx82aqVqrT5Fw/formResponse";

    try {
      await fetch(formUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors',
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setFormData({ teamName: '', leaderName: '', phone: '', members: '', agree: false, pitchDeck: null });
        setFileName('');
      }, 4000);
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen text-white overflow-x-hidden">
      {/* Video Background - Fixed with Mobile Support */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover"
        >
          <source src="/animations/Background.mp4" type="video/mp4" />
        </video>
        {/* Mobile Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="block md:hidden w-full h-full object-cover"
        >
          <source src="/animations/MobileBackgorund.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-center max-w-6xl"
          >
            <motion.div
              animate={{
                textShadow: [
                  '0 0 20px rgba(250,204,21,0.5)',
                  '0 0 60px rgba(250,204,21,0.8)',
                  '0 0 20px rgba(250,204,21,0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter mb-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent leading-none">
                AI HACKS
              </h1>
            </motion.div>

            <p className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ textShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.5)' }}>
              Coimbatore Edition 2025
            </p>

            <div className="space-y-4 mb-12 text-lg md:text-xl">
              <p className="text-gray-200 font-semibold">
                Hosted by <span className="text-yellow-400 font-black">Automate Everything</span>
              </p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-gray-200 font-semibold">
                  Sponsored by
                </p>
                <a
                  href="https://pinesphere.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:scale-110 transition-transform"
                >
                  <img
                    src="/images/Pinesphere.png"
                    alt="PineSphere Logo"
                    className="h-8 md:h-10 w-auto"
                  />
                  <span className="text-orange-400 font-black hover:text-orange-300 transition-colors">The PineSphere</span>
                </a>
              </div>
              <p className="text-2xl text-cyan-400 font-bold flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6" />
                November 8–9, 2025
              </p>
              <p className="text-xl text-green-400 font-semibold">
                Win Cash Prizes & Internships
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(250,204,21,0.9)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-xl px-16 py-6 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Rocket className="w-6 h-6" />
              REGISTER NOW
            </motion.button>
          </motion.div>
        </section>

        {/* Theme Section */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-10 text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text" style={{ textShadow: '0 0 40px rgba(6,182,212,0.3)' }}>
              THEME: Use AI to Make Life Easier
            </h2>
            <p className="text-xl md:text-3xl text-gray-200 leading-relaxed font-light max-w-4xl mx-auto" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}>
              Turn stress into creativity. Build <span className="text-yellow-400 font-bold">Snapchat-level disruption</span> solutions using ChatGPT, Canva AI, Gemini, Notion, and Replit. No coding required—just imagination and drive.
            </p>
          </motion.div>
        </section>

        {/* What You'll Do */}
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-center mb-20 text-transparent bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text"
            >
              GO CRAZY, GET FUNDED
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  num: '01',
                  title: 'Choose a Problem',
                  desc: 'College, daily life, or social issues—pick anything that makes you shout: "There has to be an easier way!"',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'Design a Crazy Solution',
                  desc: 'Use AI tools to create a visionary solution. The wilder your idea, the better.',
                  color: 'from-yellow-500 to-green-500'
                },
                {
                  icon: Zap,
                  num: '03',
                  title: 'Build a Prototype',
                  desc: 'Show how it works through a prototype, diagram, or video demo. Keep it simple but clever.',
                  color: 'from-green-500 to-cyan-500'
                },
                {
                  icon: Send,
                  num: '04',
                  title: 'Pitch Your Vision',
                  desc: 'Submit a pitch deck: Problem, Solution, AI Integration, Target Users, and Massive Impact.',
                  color: 'from-cyan-500 to-blue-600'
                }
              ].map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                    transition={{ duration: 0.6, delay: i * 0.15 }}
                    className="relative p-10 rounded-3xl bg-gradient-to-br from-black/70 to-gray-900/70 backdrop-blur-xl border-2 border-white/10 shadow-2xl overflow-hidden group"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className={`absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br ${step.color} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity`}></div>
                    <span className="text-8xl font-black text-white/10 absolute top-4 right-6">{step.num}</span>

                    <IconComponent className={`w-12 h-12 mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent relative z-10`} strokeWidth={2.5} />

                    <h3 className={`text-3xl font-black mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent relative z-10`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed relative z-10">{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Updated "What Wins" Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-red-600/20 to-pink-600/20 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-orange-500/30 group-hover:border-orange-400/60 transition-all duration-300">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowObjWins(!showObjWins)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between group/btn"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <motion.div
                      animate={{ rotate: showObjWins ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 md:p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg shadow-orange-500/50 group-hover/btn:shadow-orange-400/70 transition-all flex-shrink-0"
                    >
                      <Lightbulb className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent break-words">
                        What Wins: Impact Over Perfection
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 mt-1">Tap to reveal the winning formula</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: showObjWins ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent ml-2 flex-shrink-0"
                  >
                    {showObjWins ? '−' : '+'}
                  </motion.div>
                </motion.button>

                {showObjWins && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-4 md:px-8 pb-6 md:pb-8 space-y-4 md:space-y-6"
                  >
                    <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="p-2 bg-yellow-500/20 rounded-lg flex-shrink-0">
                        <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed break-words">
                          We are looking for <span className="text-yellow-400 font-bold">big, disruptive ideas</span> that solve a painful problem for a large number of people.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 md:p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl border border-orange-500/30"
                    >
                      <p className="text-xl md:text-2xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent break-words">
                        A strong idea that is 10% built beats a weak idea that is 100% complete.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 md:gap-4"
                    >
                      <div className="p-2 bg-cyan-500/20 rounded-lg flex-shrink-0">
                        <Target className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed break-words">
                          Your project needs to be compelling, innovative, and show a deep understanding of how AI can solve the issue. <span className="text-cyan-400 font-bold">The pitch is the project.</span>
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Judge Section with Evaluation Details */}
        <section className="relative py-32 px-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto text-center bg-black/80 backdrop-blur-2xl p-8 md:p-16 rounded-3xl border-2 border-cyan-500/30 shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <Brain className="w-12 h-12 md:w-16 md:h-16 text-cyan-400 flex-shrink-0" />
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text break-words">
                Kalam Vidya AI Judge
              </h2>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 leading-relaxed break-words">
              Revolutionary <span className="text-yellow-400 font-bold">Explainable AI Agent</span> evaluates your pitch in real-time during Google Meet sessions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 mb-8 md:mb-12">
              {[
                { icon: Users, text: 'AI Live Interaction' },
                { icon: CheckCircle, text: 'Hybrid Evaluation' },
                { icon: Star, text: 'Personalized Feedback' }
              ].map((feature, i) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="p-6 md:p-8 bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm"
                  >
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-4 text-cyan-400" />
                    <p className="text-lg md:text-xl font-bold text-white break-words">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEvaluation(!showEvaluation)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 mx-auto active:scale-95"
            >
              <FileText className="w-4 h-4 md:w-5 md:h-5" />
              {showEvaluation ? 'Hide Details' : 'How Evaluation Works'}
            </motion.button>

            {showEvaluation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 md:mt-8 text-left space-y-4 md:space-y-6"
              >
                <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 md:p-8 rounded-2xl border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 flex-shrink-0" />
                    <h3 className="text-2xl md:text-3xl font-black text-yellow-400 break-words">The Selection Process</h3>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="break-words">AI Live Interaction (Online Round)</span>
                      </h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed pl-0 md:pl-7 break-words">
                        The Kalam Vidya AI Agent joins your Google Meet session during the online pitch. It actively listens to your presentation, analyzes your pitch deck in real-time, and asks follow-up questions like a human venture capitalist using its vast database of startup success factors.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="break-words">Hybrid Evaluation & Majority Weight</span>
                      </h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed pl-0 md:pl-7 break-words">
                        The AI's assessment combines with insights from two prominent human tech founders from India. The AI Agent holds the majority weight in the final decision, ensuring the process is data-driven and objective.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-cyan-400 mb-3 flex items-start gap-2">
                        <Trophy className="w-5 h-5 flex-shrink-0 mt-1" />
                        <span className="break-words">Top 10 Teams Advance to Finals</span>
                      </h4>
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed pl-0 md:pl-7 break-words">
                        The top <span className="text-yellow-400 font-bold">10 teams</span> selected by this revolutionary hybrid process will be invited to the high-stakes <span className="text-orange-400 font-bold">Offline Pitch (Round 2)</span> in Coimbatore on November 16, 2025.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 p-6 md:p-8 rounded-2xl border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-green-400 flex-shrink-0" />
                    <h3 className="text-2xl md:text-3xl font-black text-green-400 break-words">Unprecedented Feedback Guarantee</h3>
                  </div>

                  <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-4 break-words">
                    Even if you don't make the finals, you'll leave with more valuable insights than any other hackathon:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-yellow-400 break-words">Explainable Results</p>
                        <p className="text-sm md:text-base text-gray-300 break-words">Every team receives explicit, personalized feedback explaining why their idea wasn't selected and why winning ideas were chosen.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-orange-400 break-words">Negotiation Opportunity</p>
                        <p className="text-sm md:text-base text-gray-300 break-words">Unique window to negotiate your score and feedback with organizers and the Kalam Vidya AI Agent itself! Challenge the assessment and gain valuable startup validation insights.</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-gray-400 italic mt-6 border-t border-green-500/20 pt-4 break-words">
                    This transparency guarantees your entry fee is an investment in unparalleled learning and actionable startup validation.
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* Updated Prizes & Benefits Section */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-indigo-900/20 to-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-center mb-6 text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text"
            >
              WHY JOIN?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-center text-gray-300 mb-16 max-w-3xl mx-auto"
            >
              Beyond the competition—build skills, network, and launch your future
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: BookOpen, text: 'Free AI Learning Kit ₹10,000', color: 'from-red-500 to-pink-500', glow: 'red' },
                { icon: Sparkles, text: 'Startup Resource Repository', color: 'from-yellow-500 to-orange-500', glow: 'yellow' },
                { icon: Award, text: 'Participation Certificate', color: 'from-green-500 to-teal-500', glow: 'green' },
                { icon: Users, text: 'Live AI Workshop', color: 'from-cyan-500 to-blue-500', glow: 'cyan' },
                { icon: Trophy, text: 'Cash Prizes & Internships', color: 'from-purple-500 to-pink-500', glow: 'purple' },
                { icon: Rocket, text: 'Career Launchpad', color: 'from-indigo-500 to-purple-600', glow: 'indigo' }
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 group-hover:opacity-30 rounded-3xl blur-xl transition-all duration-300`}></div>
                    <div className={`relative p-10 bg-gradient-to-br ${item.color} rounded-3xl shadow-2xl text-center transform transition-all duration-300 border-2 border-white/10 group-hover:border-white/30`}>
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <IconComponent className="w-16 h-16 mx-auto mb-4 text-white drop-shadow-lg" strokeWidth={2} />
                      </motion.div>
                      <p className="text-white font-bold text-xl leading-tight">{item.text}</p>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Internship Highlight Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-16 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-orange-600/30 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative p-8 md:p-12 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-3xl border-2 border-purple-500/40 group-hover:border-purple-400/60 text-center transition-all duration-300 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Trophy className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                  <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                    Internship Opportunities
                  </h3>
                </div>

                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 max-w-4xl mx-auto">
                  Top performers get <span className="text-yellow-400 font-bold">exclusive internship offers</span> from our sponsor PineSphere and partner companies!
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  <div className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30">
                    <DollarSign className="w-10 h-10 mx-auto mb-3 text-green-400" />
                    <p className="text-lg font-bold text-white mb-2">Paid Internships</p>
                    <p className="text-gray-300">Real-world projects with competitive compensation</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl border border-orange-500/30">
                    <Rocket className="w-10 h-10 mx-auto mb-3 text-orange-400" />
                    <p className="text-lg font-bold text-white mb-2">Career Fast-Track</p>
                    <p className="text-gray-300">Direct path to full-time opportunities</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="relative py-32 px-6">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-transparent bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text">
            STUDENT VOICES
          </h2>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {[
              { name: 'Anjali R', college: 'PSG College of Technology', text: 'The feedback from mentors was priceless. This gave me confidence to present publicly.' },
              { name: 'Rohit S', college: 'Kumaraguru College of Technology', text: 'Changed how I view AI. Built something useful in just 2 days with practical tools.' },
              { name: 'Sahana M', college: 'Coimbatore Institute of Technology', text: 'Perfect blend of creativity and tech. Made connections with real professionals.' }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: i * 0.2 }}
                className="p-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border-2 border-white/10 shadow-2xl"
              >
                <Star className="w-8 h-8 text-yellow-400 mb-4" fill="currentColor" />
                <p className="text-gray-300 italic text-lg mb-6 leading-relaxed">"{t.text}"</p>
                <div className="border-t border-yellow-500/30 pt-4">
                  <p className="text-yellow-400 font-black text-xl">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.college}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Updated Objections Section */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-red-900/10 to-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-center mb-8 text-transparent bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text"
            >
              REASONS YOU MIGHT HESITATE
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-center text-gray-300 mb-16 font-bold flex items-center justify-center gap-3"
            >
              <UserCheck className="w-8 h-8 text-pink-400" />
              <span>And Why You're Wrong!</span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  objection: "I'm Not a Tech Genius / I Don't Know How to Code.",
                  response: "PERFECT! This event is MADE for you.",
                  detail: "This isn't a coding hackathon. It's about using existing, free AI tools (like ChatGPT, Canva AI) creatively. We'll teach you how. If you can use Instagram, you can build something amazing here.",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  objection: "I'm Too Busy with Classes and Assignments.",
                  response: "This event is designed to SAVE you time in the long run.",
                  detail: "It's only 2 evenings (6:30-9:30 PM), so it doesn't clash with your schedule. The skills you learn in AI will help you complete future assignments faster and smarter. Think of it as a high-value, time-saving investment.",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  objection: "My Idea Isn't Good Enough or It's Too Simple.",
                  response: "The simplest ideas are often the most brilliant!",
                  detail: "We're not looking for the next SpaceX. We're looking for solutions to real, everyday problems. That 'simple' idea to automate your notes or manage deadlines could be exactly what thousands of students need. Our mentors will help you polish it!",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  objection: "It's Online. Won't It Be Impersonal and Boring?",
                  response: "Get ready for a live, interactive experience!",
                  detail: "We have live workshops, real-time mentorship, and collaborative sessions. You'll be in a community of builders, not just watching another boring webinar. The energy will be electric!",
                  color: "from-green-500 to-teal-500"
                },
                {
                  objection: "What's the Point? It's Just Another Certificate.",
                  response: "This is more than a PDF. It's a career launchpad.",
                  detail: "Beyond the certificate, you get: Prizes & Internship Offers from real companies, a tangible project for your portfolio, networking with industry experts and sponsors, and proven skills that you can talk about in your next interview.",
                  color: "from-indigo-500 to-purple-500"
                },
                {
                  objection: "I Don't Have a Team. I'll Be at a Disadvantage.",
                  response: "Go solo or let us help you find a team!",
                  detail: "You can absolutely participate and win as an individual. If you want a team, we'll have dedicated channels and sessions to help solo innovators connect and form all-star squads.",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  objection: "Why Should I Pay Entry Fee?",
                  response: "Think of it as a commitment to your own growth.",
                  detail: "For less than the cost of a movie ticket, you're getting: A ₹10,000 learning kit for FREE, live mentorship, and a chance to win cash prizes that are many times the entry fee. It ensures that only serious, motivated students join, making the experience better for everyone.",
                  color: "from-orange-500 to-red-500"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-300`}></div>
                  <div className={`relative p-8 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border-2 border-white/10 group-hover:border-white/30 transition-all duration-300 shadow-xl`}>
                    <div className="mb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">✖</span>
                        <p className="text-xl font-bold text-gray-200">{item.objection}</p>
                      </div>
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl">✓</span>
                        <p className={`text-2xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.response}
                        </p>
                      </div>
                    </div>
                    <div className="pl-9">
                      <p className="text-gray-300 leading-relaxed">{item.detail}</p>
                    </div>
                    <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${item.color} rounded-full animate-pulse`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Updated Bottom Line Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-16 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-red-600/30 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative p-10 md:p-12 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-2xl rounded-3xl border-2 border-yellow-500/40 group-hover:border-yellow-400/60 text-center transition-all duration-300 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Target className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                  <h3 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    The Bottom Line:
                  </h3>
                </div>

                <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed mb-8 max-w-4xl mx-auto">
                  The only real reason you shouldn't join is if you're not ready to learn a valuable skill, have fun, and boost your resume in a single weekend.
                </p>

                <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mb-8"></div>

                <p className="text-xl md:text-2xl text-orange-400 font-bold mb-10">
                  Don't let doubt hold you back. Your future self will thank you for taking this chance.
                </p>

                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: '0 0 60px rgba(250,204,21,0.9)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-2xl px-14 py-6 rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-all flex items-center gap-3 mx-auto group/btn active:scale-95"
                >
                  <motion.div
                    animate={{
                      x: [0, 5, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="w-7 h-7 group-hover/btn:rotate-12 transition-transform" />
                  </motion.div>
                  SECURE YOUR SPOT NOW!
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-gray-900/40 to-transparent">
          <h2 className="text-5xl md:text-7xl font-black text-center mb-20 text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text">
            FAQ
          </h2>

          <div className="max-w-5xl mx-auto space-y-6">
            {[
              { q: 'Do I need to know coding?', a: 'Not at all. This focuses on creativity and using AI tools, not programming.' },
              { q: 'Can I participate solo?', a: 'Yes! Individuals and teams (2–5 members) are welcome.' },
              { q: 'What is the judging process?', a: 'Hybrid model using Kalam Vidya AI Judge and expert mentors for fairness.' },
              { q: 'Is it online or offline?', a: 'Round 1 is online (Nov 8–9). Top 10 teams advance to Round 2: offline final pitch (Nov 16) in Coimbatore.' },
              { q: 'Why should I pay entry fee?', a: 'Get ₹10,000 learning kit, live mentorship, and chance to win prizes many times the entry fee.' }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <h3 className="text-2xl font-bold text-cyan-400 mb-3 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6" />
                  {faq.q}
                </h3>
                <p className="text-gray-300 text-lg pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl overflow-y-auto flex items-center justify-center p-4"
            onClick={() => !submitted && setShowForm(false)}
          >
            <div className="absolute inset-0 -z-10">
              {/* Desktop Registration Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="hidden md:block w-full h-full object-cover"
              >
                <source src="/animations/register-page.mp4" type="video/mp4" />
              </video>
              {/* Mobile Registration Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="block md:hidden w-full h-full object-cover"
              >
                <source src="/animations/MobileRegister.mp4" type="video/mp4" />
              </video>
            </div>

            <div className="min-h-screen flex items-center justify-center p-4 py-8">
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto scrollbar-hide bg-gradient-to-br from-gray-900/95 to-black/95 border-2 border-cyan-500/30 rounded-3xl p-4 md:p-6 shadow-2xl backdrop-blur-sm"
              >
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl hover:text-red-500 transition-colors z-10"
                >
                  ×
                </button>

                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-400" />
                    <h2 className="text-4xl font-black text-green-400 mb-4">SUCCESS!</h2>
                    <p className="text-xl text-gray-300">Your registration has been submitted.</p>
                    <p className="text-gray-400 mt-4">Check your email for confirmation and next steps.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <Rocket className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
                      <h2 className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                        REGISTER NOW
                      </h2>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleChange}
                        placeholder="Team Name *"
                        required
                        className="w-full p-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="leaderName"
                        value={formData.leaderName}
                        onChange={handleChange}
                        placeholder="Team Leader Name *"
                        required
                        className="w-full p-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number (WhatsApp) *"
                        className="w-full p-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <textarea
                        name="members"
                        value={formData.members}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Team Members (Optional) e.g., John Doe, Priya Sharma (Leave blank if solo)"
                        className="w-full p-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                      />
                    </div>

                    {/* File Upload Section */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Upload Your Pitch Deck (PDF or PPT, Max 100MB) *
                      </label>
                      
                      {!fileName ? (
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.ppt,.pptx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="pitchDeckUpload"
                          />
                          <label
                            htmlFor="pitchDeckUpload"
                            className="flex items-center justify-center gap-3 w-full p-6 bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-xl hover:border-cyan-500 hover:bg-gray-800/70 transition-all cursor-pointer group"
                          >
                            <Upload className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                            <span className="text-gray-300 group-hover:text-cyan-400 transition-colors">
                              Click to upload your pitch deck
                            </span>
                          </label>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-4 bg-green-900/20 border-2 border-green-500/30 rounded-xl">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <FileText className="w-6 h-6 text-green-400 flex-shrink-0" />
                            <span className="text-green-400 font-semibold truncate">{fileName}</span>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="ml-2 p-2 hover:bg-red-500/20 rounded-lg transition-colors flex-shrink-0"
                          >
                            <X className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        Must include: Problem, Solution, Market Gap, Revenue Strategy, Target Customers
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        required
                        className="mt-1 h-5 w-5 text-cyan-500 rounded cursor-pointer flex-shrink-0"
                      />
                      <label htmlFor="agree" className="text-sm text-gray-300 cursor-pointer">
                        I agree to share my data for event communication & participation certificate delivery. *
                      </label>
                    </div>

                    <button
                      onClick={handleSubmit}
                      // ...code continues from the disabled prop of the button
                      disabled={isSubmitting || !formData.pitchDeck || !formData.teamName || !formData.leaderName || !formData.phone || !formData.agree}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-black font-black text-xl py-4 rounded-xl hover:shadow-2xl hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                          SUBMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          SUBMIT REGISTRATION
                        </>
                      )}
                    </button>

                    {error && (
                      <p className="text-red-400 text-center font-semibold">{error}</p>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="relative py-16 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border-2 border-cyan-500/30 p-10 mb-12"
            >
              <h3 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Contact Us
              </h3>

              <div className="text-center space-y-6">
                <p className="text-2xl font-bold text-yellow-400 mb-6">
                  For more details, reach out to:
                </p>

                <div className="text-xl text-gray-200 font-semibold mb-6">
                  Automate Everything Club
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <motion.a
                    href="tel:+919361802547"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all"
                  >
                    <div className="text-cyan-400 font-bold text-lg mb-2">Selvan</div>
                    <div className="text-white text-lg">+91 9361802547</div>
                  </motion.a>

                  <motion.a
                    href="tel:+916385329845"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all"
                  >
                    <div className="text-pink-400 font-bold text-lg mb-2">Mugesh</div>
                    <div className="text-white text-lg">+91 6385329845</div>
                  </motion.a>

                  <motion.a
                    href="tel:+919443884738"
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="p-6 bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-2xl border border-orange-500/30 hover:border-orange-400/50 transition-all"
                  >
                    <div className="text-orange-400 font-bold text-lg mb-2">Raj</div>
                    <div className="text-white text-lg">+91 9443884738</div>
                  </motion.a>
                </div>

                <div className="pt-6 border-t border-gray-700 mt-8">
                  <p className="text-gray-400 text-lg">
                    Email: <a href="mailto:automateeverythingofficial@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">automateeverythingofficial@gmail.com</a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sponsors & Copyright */}
            <div className="text-center space-y-4">
              <p className="text-gray-400 text-lg">Automate Everything © 2025</p>
              <div className="flex items-center justify-center gap-2 text-cyan-400 font-semibold">
                <span>Sponsored by</span>
                <a
                  href="https://pinesphere.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <img
                    src="/images/Pinesphere.png"
                    alt="PineSphere Logo"
                    className="h-6 w-auto inline-block"
                  />
                  <span className="text-orange-400 hover:text-orange-300 transition-colors">The PineSphere</span>
                </a>
              </div>
              <p className="text-gray-500">Designed for Coimbatore's Brightest Minds</p>
            </div>
          </div>
        </footer>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <CircularText
          text="AUTOMATION*FOR*EVERTHING*"
          onHover="speedUp"
          spinDuration={20}
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </div>

      <div className="fixed bottom-4 left-4 z-50">
        <CountTimer
          targetDate="2025-11-08T18:00:00"
          className="scale-50 md:scale-75 origin-bottom-left"
        />
      </div>
    </div>
  );
}