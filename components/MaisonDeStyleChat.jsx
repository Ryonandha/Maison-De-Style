'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  Paperclip,
  Send,
  CheckCheck,
  RotateCcw,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Signal,
  Battery,
  Camera,
  Heart,
  Check,
  Sparkle,
  ExternalLink,
  ShieldCheck,
  Tag
} from 'lucide-react';

// Stylist Avatar and Media Constants
const STYLIST_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

const USER_WARDROBE_PHOTO =
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80';

const LOOKBOOK_ITEMS = [
  {
    id: 'look-1',
    tag: 'Lookbook Inspo',
    title: 'Casual Chic Vibes',
    subtitle: 'Oversized white shirt as outer + high-waist culottes silhouette',
    price: 'Kombinasi Lemari',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
    accent: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'look-2',
    tag: 'Aksesoris Lokal',
    title: 'Local Canvas Bag',
    subtitle: 'Totebag bahan kanvas tebal dengan jahitan estetis minimalis',
    price: 'Rp 65.000',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    accent: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'look-3',
    tag: 'Sepatu Favorit',
    title: 'White Platform Sneakers',
    subtitle: 'Sol tebal 3.5cm bikin kaki jenjang & empuk dipakai seharian',
    price: 'Rp 120.000',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    accent: 'bg-pink-100 text-pink-800',
  },
];

export default function MaisonDeStyleChat() {
  /**
   * Phase states:
   * 1 = Phase 1: AI Questionnaire (Interactive pills inside chat)
   * 2 = Phase 2a: AI transitioning to Stylist (delay 2s)
   * 3 = Phase 2b: Stylist Darafika prompts user to upload wardrobe photo (Paperclip pulsing)
   * 4 = Phase 2c: User sent wardrobe photo -> Stylist analyzing (delay 2.5s)
   * 5 = Phase 3: Lookbook carousel & recommendations delivered
   */
  const [phase, setPhase] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingPersona, setTypingPersona] = useState({ name: 'AI Stylist Matcher', isHuman: false });

  // Selections for Phase 1
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  // Attachment highlight animation trigger
  const [highlightAttachment, setHighlightAttachment] = useState(false);

  // Messages array
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      senderName: 'AI Style Matcher',
      timestamp: '09:41',
      text: 'Halo! Selamat datang di Maison De Style ✨ Sebelum dihubungkan ke Stylist, yuk pilih preferensi kamu:',
      isQuestionnaire: true,
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, phase]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // -------------------------------------------------------------
  // Phase 1 -> Phase 2: User completes choices
  // -------------------------------------------------------------
  const handlePillSelect = (type, value) => {
    let nextShape = selectedShape;
    let nextBudget = selectedBudget;

    if (type === 'shape') {
      setSelectedShape(value);
      nextShape = value;
    } else if (type === 'budget') {
      setSelectedBudget(value);
      nextBudget = value;
    }

    // When both are chosen, automatically progress or let user submit
    if (nextShape && nextBudget) {
      triggerFormSubmission(nextShape, nextBudget);
    }
  };

  const triggerFormSubmission = (shape, budget) => {
    const time = getCurrentTime();

    // 1. Remove questionnaire pills by marking it answered and push User Bubble
    setMessages((prev) =>
      prev.map((m) => (m.isQuestionnaire ? { ...m, isQuestionnaire: false, answered: true } : m))
    );

    const userSummaryMsg = {
      id: `user-pref-${Date.now()}`,
      sender: 'user',
      senderName: 'Kamu',
      timestamp: time,
      text: `Preferensi Gaya:\n• Body Shape: ${shape}\n• Target Budget: ${budget}`,
    };

    setMessages((prev) => [...prev, userSummaryMsg]);
    setPhase(2);

    // 2. Bot acknowledgment
    setTimeout(() => {
      const botAckMsg = {
        id: `bot-ack-${Date.now()}`,
        sender: 'bot',
        senderName: 'AI Style Matcher',
        timestamp: getCurrentTime(),
        text: 'Data disimpan! 📝 Menghubungkan ke Stylist profesional kami...',
      };

      setMessages((prev) => [...prev, botAckMsg]);

      // Show typing indicator for 2 seconds
      setIsTyping(true);
      setTypingPersona({ name: 'Stylist Darafika', isHuman: true });

      setTimeout(() => {
        setIsTyping(false);
        setPhase(3);

        const stylistIntroMsg = {
          id: `stylist-intro-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: 'Halo! Aku Darafika, personal stylist kamu. Boleh kirim foto baju/celana di lemari kamu yang mau di mix & match?',
        };

        setMessages((prev) => [...prev, stylistIntroMsg]);
        setHighlightAttachment(true);
      }, 2000);
    }, 450);
  };

  // -------------------------------------------------------------
  // Phase 2 -> Phase 3: User uploads wardrobe photo
  // -------------------------------------------------------------
  const handleSendWardrobePhoto = () => {
    if (phase !== 3) return;

    setHighlightAttachment(false);
    setPhase(4);

    const userPhotoMsg = {
      id: `user-photo-${Date.now()}`,
      sender: 'user',
      senderName: 'Kamu',
      timestamp: getCurrentTime(),
      text: 'Ini baju atasan putih & celana kulot khaki di lemari aku yang mau di-styling! ✨',
      media: {
        url: USER_WARDROBE_PHOTO,
        caption: 'Koleksi Lemari: White Top & Khaki Pants',
      },
    };

    setMessages((prev) => [...prev, userPhotoMsg]);

    // Show typing indicator for 2.5 seconds
    setIsTyping(true);
    setTypingPersona({ name: 'Stylist Darafika', isHuman: true });

    setTimeout(() => {
      setIsTyping(false);
      setPhase(5);

      const stylistLookbookIntroMsg = {
        id: `stylist-lookbook-intro-${Date.now()}`,
        sender: 'stylist',
        senderName: 'Stylist Darafika',
        timestamp: getCurrentTime(),
        text: 'Sempurna! ✨ Celana dan atasan itu bisa kita sulap jadi gaya Y2K / Casual Chic. Tambahin aksesoris ini biar makin stand out. Ini Lookbook visualnya:',
        isLookbookGallery: true,
      };

      const stylistClosingMsg = {
        id: `stylist-closing-${Date.now()}`,
        sender: 'stylist',
        senderName: 'Stylist Darafika',
        timestamp: getCurrentTime(),
        text: 'Semua item tambahannya masih masuk budget kamu! Mau checkout sekarang atau ada yang mau diganti? 💕',
      };

      setMessages((prev) => [...prev, stylistLookbookIntroMsg, stylistClosingMsg]);
    }, 2500);
  };

  // Reset entire flow
  const handleReset = () => {
    setPhase(1);
    setSelectedShape(null);
    setSelectedBudget(null);
    setIsTyping(false);
    setHighlightAttachment(false);
    setMessages([
      {
        id: 'msg-welcome',
        sender: 'bot',
        senderName: 'AI Style Matcher',
        timestamp: '09:41',
        text: 'Halo! Selamat datang di Maison De Style ✨ Sebelum dihubungkan ke Stylist, yuk pilih preferensi kamu:',
        isQuestionnaire: true,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-[#f7eff1] bg-gradient-to-tr from-[#fbf2f0] via-[#f7eae8] to-[#f4e2de] flex items-center justify-center p-2 sm:p-4 md:p-6 font-sans antialiased select-none">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">
        
        {/* Presenter Top Bar */}
        <div className="w-full flex items-center justify-between px-3 mb-2.5 text-xs text-[#7c5344] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-semibold tracking-wider text-[11px] uppercase text-[#6f4536]">
              Maison De Style • High-Fidelity App
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-rose-700 shadow-xs border border-rose-200/60 transition-all text-[11px] font-semibold active:scale-95"
            title="Reset simulasi chat"
          >
            <RotateCcw className="w-3 h-3 text-rose-600" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* iPhone Mobile Container Mockup */}
        <div className="w-full bg-rose-50 rounded-[44px] shadow-[0_25px_70px_-15px_rgba(95,50,40,0.28)] border-[9px] border-[#1e1918] overflow-hidden flex flex-col h-[810px] max-h-[94vh] relative ring-1 ring-black/10">
          
          {/* iOS Top Status Bar & Dynamic Island */}
          <div className="bg-[#1e1918] pt-2 pb-1.5 px-7 flex items-center justify-between text-white text-[12px] font-semibold tracking-tight z-40">
            <span className="pl-1">09:41</span>
            
            {/* Dynamic Island Pill */}
            <div className="w-24 h-[18px] bg-black rounded-full flex items-center justify-between px-2.5 mx-auto">
              <div className="w-2 h-2 rounded-full bg-[#1b4332] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
            </div>

            <div className="flex items-center gap-1.5 pr-1 text-white/90">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* Glassmorphic Sticky Header */}
          <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/85 border-b border-rose-200/40 px-3.5 py-2.5 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              
              {/* Back button & Profile Info */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleReset}
                  className="p-1 -ml-1 text-stone-500 hover:text-stone-800 active:scale-90 transition-transform rounded-full"
                  title="Kembali"
                >
                  <ChevronLeft className="w-5 h-5 text-stone-700" />
                </button>

                {/* Avatar with Live Status */}
                <div className="relative">
                  {phase >= 3 ? (
                    <img
                      src={STYLIST_AVATAR}
                      alt="Stylist Darafika"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-300/80 shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-300 via-pink-200 to-amber-200 flex items-center justify-center text-pink-900 ring-2 ring-rose-200 shadow-xs">
                      <Sparkles className="w-5 h-5 text-rose-700" />
                    </div>
                  )}

                  {/* Pulsing Green Online Dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-100 animate-ping" />
                  </span>
                </div>

                {/* Title & Status */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h1 className="font-bold text-[14px] text-stone-900 leading-tight tracking-tight">
                      Maison De Style
                    </h1>
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                      VIP
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium leading-none mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {phase >= 3 ? (
                      <span className="text-stone-600">
                        <strong className="text-stone-800 font-semibold">Darafika</strong> • Online
                      </span>
                    ) : (
                      <span className="text-rose-700 font-medium">AI Smart Matcher</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Consultation Tag */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100/90 to-rose-100/90 border border-amber-300/60 text-[#74452e] text-[10px] font-semibold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Verified Stylist</span>
              </div>
            </div>
          </header>

          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3.5 bg-rose-50/70 scroll-smooth">
            
            {/* Timestamp Notice */}
            <div className="flex justify-center my-1">
              <span className="text-[10px] font-semibold tracking-wide uppercase px-3 py-0.5 rounded-full bg-stone-200/70 text-stone-600">
                Konsultasi Personal Dimulai
              </span>
            </div>

            {/* Message List with Framer Motion */}
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isStylist = msg.sender === 'stylist';
                const isBot = msg.sender === 'bot';

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender Label */}
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px]">
                        <span className="font-semibold text-stone-700">{msg.senderName}</span>
                        {isStylist ? (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                            Senior Stylist
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-pink-100 text-pink-700 border border-pink-200">
                            AI Bot
                          </span>
                        )}
                      </div>
                    )}

                    {/* Chat Bubble Container */}
                    <div className="flex items-end gap-1.5 max-w-[88%]">
                      {/* Avatar for incoming */}
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full shrink-0 mb-1 overflow-hidden shadow-2xs">
                          {isStylist ? (
                            <img src={STYLIST_AVATAR} alt="Darafika" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-pink-200 text-pink-800 flex items-center justify-center">
                              <Sparkles className="w-3.5 h-3.5 text-pink-700" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Bubble Text & Content */}
                      <div
                        className={`relative rounded-2xl p-3.5 text-[13px] leading-relaxed shadow-sm transition-all ${
                          isUser
                            ? 'bg-amber-100 text-amber-950 rounded-br-xs border border-amber-200/90 font-normal'
                            : 'bg-pink-100 text-pink-950 rounded-bl-xs border border-pink-200/80'
                        }`}
                      >
                        <p className="whitespace-pre-line font-medium text-stone-800">{msg.text}</p>

                        {/* Interactive Questionnaire Pills (Phase 1) */}
                        {msg.isQuestionnaire && phase === 1 && (
                          <div className="mt-3 pt-3 border-t border-pink-200/70 space-y-3">
                            {/* Row 1: Body Shape */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[11px] font-bold text-pink-900 tracking-wide uppercase">
                                  1. Body Shape
                                </label>
                                {selectedShape && (
                                  <span className="text-[10px] text-pink-700 font-semibold">
                                    Dipilih: {selectedShape}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['Pear', 'Hourglass', 'Rectangle'].map((shape) => {
                                  const isSelected = selectedShape === shape;
                                  return (
                                    <button
                                      key={shape}
                                      type="button"
                                      onClick={() => handlePillSelect('shape', shape)}
                                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-2xs flex items-center gap-1 ${
                                        isSelected
                                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs ring-2 ring-rose-300'
                                          : 'bg-white/90 text-stone-700 hover:bg-white border border-pink-200/80 hover:border-pink-300'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                      <span>{shape}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Row 2: Budget */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[11px] font-bold text-pink-900 tracking-wide uppercase">
                                  2. Target Budget
                                </label>
                                {selectedBudget && (
                                  <span className="text-[10px] text-pink-700 font-semibold">
                                    Dipilih: {selectedBudget}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['< Rp 150k', 'Rp 150k - 250k', '> Rp 250k'].map((budget) => {
                                  const isSelected = selectedBudget === budget;
                                  return (
                                    <button
                                      key={budget}
                                      type="button"
                                      onClick={() => handlePillSelect('budget', budget)}
                                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 shadow-2xs flex items-center gap-1 ${
                                        isSelected
                                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-xs ring-2 ring-rose-300'
                                          : 'bg-white/90 text-stone-700 hover:bg-white border border-pink-200/80 hover:border-pink-300'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                      <span>{budget}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Prompt text */}
                            <div className="text-[10px] text-pink-800/80 italic text-center pt-1 font-medium">
                              {selectedShape && selectedBudget
                                ? '✨ Menghubungkan ke Stylist...'
                                : 'Ketuk pilihan di atas untuk melanjutkan'}
                            </div>
                          </div>
                        )}

                        {/* User Sent Wardrobe Photo (Phase 2c) */}
                        {msg.media && (
                          <div className="mt-2.5 rounded-xl overflow-hidden border border-amber-200/90 shadow-xs bg-white">
                            <img
                              src={msg.media.url}
                              alt="Foto Lemari Kamu"
                              className="w-full h-44 object-cover object-center"
                            />
                            <div className="p-2 bg-amber-50/80 text-[11px] font-semibold text-amber-950 flex items-center justify-between">
                              <span>{msg.media.caption}</span>
                              <Camera className="w-3.5 h-3.5 text-amber-800" />
                            </div>
                          </div>
                        )}

                        {/* Premium Lookbook Carousel Gallery (Phase 3) */}
                        {msg.isLookbookGallery && (
                          <div className="mt-3 pt-3 border-t border-pink-200/70">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-bold text-pink-900 uppercase tracking-wider flex items-center gap-1">
                                <Sparkle className="w-3 h-3 text-rose-600" />
                                Curated Outfit Lookbook
                              </span>
                              <span className="text-[10px] font-medium text-pink-700">Geser ➔</span>
                            </div>

                            {/* Horizontal Scroll Carousel */}
                            <div className="flex gap-3 overflow-x-auto pb-2 pt-1 -mx-2 px-2 snap-x snap-mandatory scrollbar-none">
                              {LOOKBOOK_ITEMS.map((item) => (
                                <div
                                  key={item.id}
                                  className="min-w-[215px] max-w-[215px] bg-white rounded-2xl overflow-hidden border border-rose-200/90 shadow-md flex-shrink-0 snap-start flex flex-col hover:shadow-lg transition-shadow"
                                >
                                  {/* Card Image */}
                                  <div className="relative h-40 bg-stone-100 overflow-hidden group">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span
                                      className={`absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-xs ${item.accent}`}
                                    >
                                      {item.tag}
                                    </span>
                                    <button
                                      type="button"
                                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-rose-600 hover:text-rose-800 shadow-xs"
                                    >
                                      <Heart className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* Card Info */}
                                  <div className="p-3 flex-1 flex flex-col justify-between bg-white">
                                    <div>
                                      <h4 className="font-bold text-stone-900 text-xs leading-snug">
                                        {item.title}
                                      </h4>
                                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                                        {item.subtitle}
                                      </p>
                                    </div>

                                    <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                                      <span className="font-extrabold text-[12px] text-rose-700">
                                        {item.price}
                                      </span>
                                      <span className="text-[10px] font-semibold text-stone-400 group-hover:text-stone-700 flex items-center gap-0.5">
                                        Pilih <ChevronRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Timestamp & Read Receipts */}
                        <div
                          className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${
                            isUser ? 'justify-end text-amber-800/80' : 'justify-end text-stone-400'
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isUser && <CheckCheck className="w-3 h-3 text-amber-800 stroke-[2.5]" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing Indicator with 3 Bouncing Dots */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="flex items-center gap-2 pl-1 animate-fade-in"
              >
                <div className="w-7 h-7 rounded-full bg-rose-200/80 flex items-center justify-center text-rose-700 text-xs shrink-0 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="bg-pink-100 border border-pink-200/80 rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs text-pink-900 flex items-center gap-2 shadow-2xs">
                  <span className="text-[11px] font-semibold text-pink-900">{typingPersona.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 typing-dot" />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Bottom Area: Callout & Input Bar */}
          <div className="bg-white/95 backdrop-blur-md border-t border-rose-100/90 p-3 z-30">
            
            {/* Phase 3 Action Banner: Prompt to click paperclip */}
            <AnimatePresence>
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mb-2 p-2 rounded-xl bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-300/80 flex items-center justify-between text-xs text-amber-950 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 font-medium">
                    <Camera className="w-4 h-4 text-amber-700 animate-pulse" />
                    <span>Stylist meminta foto baju/celana di lemari kamu</span>
                  </div>
                  <button
                    onClick={handleSendWardrobePhoto}
                    className="px-2.5 py-1 rounded-lg bg-amber-700 text-white font-semibold text-[11px] hover:bg-amber-800 transition-all shadow-xs active:scale-95"
                  >
                    Kirim Foto
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 5 Action Banner: Final Checkout Options */}
            <AnimatePresence>
              {phase === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 space-y-1.5"
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        const time = getCurrentTime();
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: `checkout-${Date.now()}`,
                            sender: 'user',
                            senderName: 'Kamu',
                            timestamp: time,
                            text: 'Mau checkout paket lengkap sekarang ya! (Total: Rp 185.000) 🛍️',
                          },
                        ]);
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: `stylist-thanks-${Date.now()}`,
                              sender: 'stylist',
                              senderName: 'Stylist Darafika',
                              timestamp: getCurrentTime(),
                              text: 'Yeay! Link checkout diskon VIP sudah dikirimkan ke pesan kamu. Selamat bereksperimen dengan outfit barumu! ✨💖',
                            },
                          ]);
                        }, 900);
                      }}
                      className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Checkout Paket Lengkap</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="py-2.5 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                      <span>Ulangi Simulasi</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Bar */}
            <div className="flex items-center gap-2 bg-stone-100/90 rounded-2xl px-3 py-2 border border-stone-200/70 focus-within:ring-2 focus-within:ring-rose-200 focus-within:bg-white transition-all">
              
              {/* Attachment Paperclip Button (Highlighted with pulsing animation on Phase 3) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleSendWardrobePhoto}
                  className={`p-1.5 rounded-full transition-all relative ${
                    highlightAttachment
                      ? 'bg-rose-500 text-white shadow-md animate-bounce ring-4 ring-rose-300'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-200/80'
                  }`}
                  title="Lampirkan Foto Lemari (Mix & Match)"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                {highlightAttachment && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                )}
              </div>

              {/* Text Input Simulator */}
              <input
                type="text"
                disabled={phase !== 5}
                placeholder={
                  phase === 1
                    ? 'Pilih preferensi kuesioner di atas...'
                    : phase === 2
                    ? 'Menghubungkan ke Stylist...'
                    : phase === 3
                    ? 'Ketuk klip kertas untuk kirim foto...'
                    : phase === 4
                    ? 'Stylist sedang merancang lookbook...'
                    : 'Ketik pesan balasan untuk Darafika...'
                }
                className="flex-1 bg-transparent text-xs text-stone-800 placeholder:text-stone-400 focus:outline-hidden font-normal"
              />

              {/* Send Button */}
              <button
                type="button"
                disabled={phase !== 3 && phase !== 5}
                onClick={() => {
                  if (phase === 3) handleSendWardrobePhoto();
                }}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  phase === 3
                    ? 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-xs active:scale-95'
                    : phase === 5
                    ? 'bg-stone-800 text-white hover:bg-stone-900 active:scale-95'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="bg-white pb-2 pt-1 flex justify-center">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-3.5 text-center text-[11px] text-[#784d3d]/90 font-medium max-w-xs">
          <p className="font-semibold text-stone-800">Maison De Style &bull; Premium iOS Prototype</p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            Framer Motion transitions &bull; Interactive questionnaire pills &bull; Lookbook gallery
          </p>
        </div>
      </div>
    </main>
  );
}
