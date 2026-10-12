'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Bot,
  UserCheck,
  Send,
  CheckCheck,
  RotateCcw,
  ShoppingBag,
  Heart,
  ChevronRight,
  Wifi,
  Signal,
  Battery,
  ShieldCheck,
  ArrowLeft,
  Sparkle,
  Image as ImageIcon
} from 'lucide-react';

export default function MaisonDeStyleChat() {
  // Step tracker:
  // 1 = AI intro & preference selection form
  // 2 = Transitioning to Stylist (Bot acknowledgment + 2s delay)
  // 3 = Stylist Darafika introduced & waiting for user reply
  // 4 = Lookbook & recommendations arriving (1.5s delay then displayed)
  // 5 = Completed / Conversation ongoing
  const [currentStep, setCurrentStep] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState('');

  // Form selections for Step 1
  const [selectedAge, setSelectedAge] = useState('18-30');
  const [selectedBodyShape, setSelectedBodyShape] = useState('Pear');
  const [selectedBudget, setSelectedBudget] = useState('Rp 150k - Rp 250k');

  // Chat message history
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      senderName: 'AI Style Assistant',
      senderRole: 'Smart Matcher',
      timestamp: '10:00',
      text: 'Halo! Selamat datang di Maison De Style, solusi kilat bebas cemas outfit kamu! ✨ Yuk isi data singkat ini biar aku bisa cari stylist yang pas buat kamu:',
      isForm: true,
    },
  ]);

  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll on new messages or typing indicator
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, currentStep]);

  // Handle Step 1 -> Step 2 submission
  const handleSubmitData = () => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add user reply bubble
    const userMsg = {
      id: 'm-user-data',
      sender: 'user',
      senderName: 'Kamu',
      timestamp: timeNow,
      text: `Usia: ${selectedAge} • Body Shape: ${selectedBodyShape} • Budget: ${selectedBudget}`,
      dataBadge: {
        age: selectedAge,
        shape: selectedBodyShape,
        budget: selectedBudget,
      },
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep(2);

    // 2. Bot acknowledgment
    setTimeout(() => {
      const botAck = {
        id: 'm-bot-ack',
        sender: 'bot',
        senderName: 'AI Style Assistant',
        senderRole: 'Smart Matcher',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Data diterima! Sebentar ya, AI kami sedang menganalisis kecocokan... Menghubungkan kamu ke Stylist Profesional kami. ⏳',
      };
      setMessages((prev) => [...prev, botAck]);

      // Show typing indicator during transition to human stylist
      setIsTyping(true);
      setTypingSender('Mencari stylist terbaik...');

      // 3. Delay 2 seconds -> Stylist enters (Step 3)
      setTimeout(() => {
        setIsTyping(false);
        setCurrentStep(3);

        const stylistIntro = {
          id: 'm-stylist-intro',
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          senderRole: 'Senior Personal Stylist',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `Halo! Kenalin aku Darafika, personal stylist kamu hari ini. Aku lihat kamu butuh outfit dengan budget hemat untuk body shape ${selectedBodyShape}. Ada acara apa nih? Dan di lemari lagi ada baju basic apa aja?`,
        };

        setMessages((prev) => [...prev, stylistIntro]);
      }, 2000);
    }, 600);
  };

  // Handle Step 3 user reply -> Step 4 Lookbook
  const handleUserReply = (replyText) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg = {
      id: 'm-user-reply',
      sender: 'user',
      senderName: 'Kamu',
      timestamp: timeNow,
      text: replyText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setCurrentStep(4);
    setIsTyping(true);
    setTypingSender('Stylist Darafika sedang menyusun lookbook...');

    // Delay 1.5 seconds -> Stylist sends lookbook & recommendation
    setTimeout(() => {
      setIsTyping(false);
      const stylistLookbook = {
        id: 'm-stylist-lookbook',
        sender: 'stylist',
        senderName: 'Stylist Darafika',
        senderRole: 'Senior Personal Stylist',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Sip! Kemeja putih oversized bisa jadi outer, dalemnya kaos dan kulot hitam high-waist. Bikin kaki kelihatan jenjang! Ini visual lookbook-nya:',
        attachment: {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
          title: 'Casual Chic Look: Oversized Shirt & High-Waist Culottes',
          tags: ['Pear Body Shape', 'Hangout Ready', 'Bawah Budget'],
        },
      };

      const stylistRecommendation = {
        id: 'm-stylist-acc',
        sender: 'stylist',
        senderName: 'Stylist Darafika',
        senderRole: 'Senior Personal Stylist',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: 'Untuk aksesoris tambahan, aku rekomendasiin totebag kanvas lokal (Rp 65.000). Total masih aman di bawah budget kamu! Gimana menurutmu? 💕',
      };

      setMessages((prev) => [...prev, stylistLookbook, stylistRecommendation]);
      setCurrentStep(5);
    }, 1500);
  };

  // Reset demo to initial state
  const handleReset = () => {
    setSelectedAge('18-30');
    setSelectedBodyShape('Pear');
    setSelectedBudget('Rp 150k - Rp 250k');
    setCurrentStep(1);
    setIsTyping(false);
    setTypingSender('');
    setMessages([
      {
        id: 'm1',
        sender: 'bot',
        senderName: 'AI Style Assistant',
        senderRole: 'Smart Matcher',
        timestamp: '10:00',
        text: 'Halo! Selamat datang di Maison De Style, solusi kilat bebas cemas outfit kamu! ✨ Yuk isi data singkat ini biar aku bisa cari stylist yang pas buat kamu:',
        isForm: true,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9f3ef] via-[#f7eae6] to-[#eee2dc] flex items-center justify-center p-2 sm:p-6 md:p-8 font-sans">
      {/* Outer Presentation Card */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Top Tagline for Presenter */}
        <div className="w-full flex items-center justify-between px-2 mb-3 text-xs text-amber-900/70 font-medium">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-600 animate-pulse" />
            <span className="tracking-wide uppercase font-semibold">Maison De Style • Live Prototype</span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/70 hover:bg-white text-stone-700 hover:text-pink-700 shadow-xs border border-stone-200 transition-all text-xs"
            title="Reset simulasi chat dari awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Flow</span>
          </button>
        </div>

        {/* Mobile Device Frame */}
        <div className="w-full bg-white rounded-[38px] shadow-[0_20px_60px_-15px_rgba(115,75,65,0.22)] border-[8px] border-[#2b2523] overflow-hidden flex flex-col h-[780px] max-h-[92vh] relative">
          
          {/* Mobile Top Speaker & Dynamic Island */}
          <div className="bg-[#2b2523] pt-1 pb-1.5 px-6 flex items-center justify-between text-white text-[11px] font-medium select-none z-30">
            <span>09:41</span>
            {/* Pill / Camera Cutout */}
            <div className="w-20 h-4 bg-black rounded-full flex items-center justify-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-stone-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#1b4332]" />
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Sticky Header */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-pink-100/80 px-4 py-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={handleReset}
                  className="p-1 -ml-1 text-stone-400 hover:text-stone-700 rounded-full"
                  title="Kembali"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Avatar with Status Badge */}
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                    currentStep >= 3 
                      ? 'bg-gradient-to-tr from-pink-400 to-rose-300 text-white shadow-xs' 
                      : 'bg-pink-100 text-pink-700'
                  }`}>
                    {currentStep >= 3 ? (
                      <UserCheck className="w-5 h-5" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-pink-600" />
                    )}
                  </div>
                  {/* Status Indicator Dot */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  </span>
                </div>

                {/* Brand & Active Persona */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h1 className="font-semibold text-[15px] text-stone-900 leading-tight tracking-tight">
                      Maison De Style
                    </h1>
                    <span className="text-[10px] bg-pink-100/80 text-pink-800 font-medium px-1.5 py-0.5 rounded-sm">
                      Official
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {currentStep >= 3 ? (
                      <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Stylist Darafika (Online)
                      </span>
                    ) : (
                      <span className="text-stone-500 flex items-center gap-1 text-[11px]">
                        <Bot className="w-3 h-3 text-pink-600 inline" />
                        AI Style Matching
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Consultation Badge */}
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 text-amber-900 px-2 py-1 rounded-full text-[11px] font-medium shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-amber-700" />
                <span>VIP Consult</span>
              </div>
            </div>
          </header>

          {/* Chat Messages Body */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5 bg-gradient-to-b from-[#fdfbf9] to-[#fbf7f4] scroll-smooth"
          >
            {/* Security Notice / Timestamp */}
            <div className="text-center my-1">
              <span className="inline-block text-[10px] font-medium bg-stone-200/60 text-stone-600 px-2.5 py-0.5 rounded-full">
                Hari ini • Konsultasi Terenkripsi
              </span>
            </div>

            {/* Render Messages */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isStylist = msg.sender === 'stylist';
              const isBot = msg.sender === 'bot';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col animate-fade-in ${isUser ? 'items-end' : 'items-start'}`}
                >
                  {/* Sender Name & Role Label for incoming messages */}
                  {!isUser && (
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[11px] font-semibold text-stone-700">
                        {msg.senderName}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-medium ${
                        isStylist 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : 'bg-pink-100 text-pink-700 border border-pink-200'
                      }`}>
                        {msg.senderRole}
                      </span>
                    </div>
                  )}

                  {/* Main Bubble */}
                  <div className="flex items-end gap-1.5 max-w-[88%]">
                    {/* Incoming Avatar */}
                    {!isUser && (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-1 text-xs ${
                        isStylist 
                          ? 'bg-rose-400 text-white' 
                          : 'bg-pink-200 text-pink-800'
                      }`}>
                        {isStylist ? <UserCheck className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                      </div>
                    )}

                    {/* Chat Bubble Body */}
                    <div
                      className={`relative rounded-2xl p-3.5 shadow-2xs text-[13px] leading-relaxed transition-all ${
                        isUser
                          ? 'bg-amber-100 text-amber-950 rounded-br-xs border border-amber-200/70'
                          : isStylist
                          ? 'bg-pink-50/95 text-stone-800 rounded-bl-xs border border-pink-200/80'
                          : 'bg-pink-50 text-pink-950 rounded-bl-xs border border-pink-200/70'
                      }`}
                    >
                      {/* Message Content */}
                      <p className="whitespace-pre-line">{msg.text}</p>

                      {/* Attachment (Lookbook Card for Step 4) */}
                      {msg.attachment && (
                        <div className="mt-3 bg-white rounded-xl overflow-hidden border border-pink-100 shadow-xs">
                          <div className="relative group overflow-hidden">
                            <img
                              src={msg.attachment.url}
                              alt={msg.attachment.title}
                              className="w-full h-52 object-cover object-top transition-transform duration-300 group-hover:scale-102"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 font-medium">
                              <ImageIcon className="w-3 h-3" />
                              Visual Lookbook
                            </div>
                          </div>

                          <div className="p-2.5 bg-white">
                            <div className="font-semibold text-stone-900 text-xs">
                              {msg.attachment.title}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {msg.attachment.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/60 px-1.5 py-0.5 rounded-sm font-medium"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 1 Inline Form Chips inside Bot's First Message */}
                      {msg.isForm && currentStep === 1 && (
                        <div className="mt-3 pt-3 border-t border-pink-200/60 space-y-3">
                          {/* Age Selection */}
                          <div>
                            <label className="text-[11px] font-semibold text-pink-900 block mb-1">
                              1. Rentang Usia
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {['< 18', '18-30', '30+'].map((age) => (
                                <button
                                  key={age}
                                  type="button"
                                  onClick={() => setSelectedAge(age)}
                                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                                    selectedAge === age
                                      ? 'bg-pink-700 text-white shadow-2xs ring-2 ring-pink-300'
                                      : 'bg-white/80 text-pink-900 hover:bg-white border border-pink-200'
                                  }`}
                                >
                                  {age}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Body Shape Selection */}
                          <div>
                            <label className="text-[11px] font-semibold text-pink-900 block mb-1">
                              2. Bentuk Tubuh (Body Shape)
                            </label>
                            <div className="grid grid-cols-3 gap-1.5">
                              {['Pear', 'Hourglass', 'Rectangle'].map((shape) => (
                                <button
                                  key={shape}
                                  type="button"
                                  onClick={() => setSelectedBodyShape(shape)}
                                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                                    selectedBodyShape === shape
                                      ? 'bg-pink-700 text-white shadow-2xs ring-2 ring-pink-300'
                                      : 'bg-white/80 text-pink-900 hover:bg-white border border-pink-200'
                                  }`}
                                >
                                  {shape}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Budget Selection */}
                          <div>
                            <label className="text-[11px] font-semibold text-pink-900 block mb-1">
                              3. Target Budget Outfit
                            </label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {['< Rp 150k', 'Rp 150k - Rp 250k', 'Rp 250k - Rp 500k', 'Flexible'].map((budget) => (
                                <button
                                  key={budget}
                                  type="button"
                                  onClick={() => setSelectedBudget(budget)}
                                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all text-center ${
                                    selectedBudget === budget
                                      ? 'bg-pink-700 text-white shadow-2xs ring-2 ring-pink-300'
                                      : 'bg-white/80 text-pink-900 hover:bg-white border border-pink-200'
                                  }`}
                                >
                                  {budget}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Submit Button */}
                          <button
                            type="button"
                            onClick={handleSubmitData}
                            className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-pink-700 to-rose-600 hover:from-pink-800 hover:to-rose-700 text-white font-medium text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all transform active:scale-98"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Kirim Data Preferensi</span>
                          </button>
                        </div>
                      )}

                      {/* Bubble Timestamp and Read Status */}
                      <div className={`flex items-center gap-1 mt-1 text-[10px] ${
                        isUser ? 'justify-end text-amber-800/80' : 'justify-end text-stone-500'
                      }`}>
                        <span>{msg.timestamp}</span>
                        {isUser && <CheckCheck className="w-3 h-3 text-amber-800" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 animate-fade-in pl-1">
                <div className="w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center text-pink-700 text-xs shrink-0">
                  <Sparkle className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-pink-50 border border-pink-200/60 rounded-2xl rounded-bl-xs px-3.5 py-2.5 text-xs text-pink-900 flex items-center gap-2 shadow-2xs">
                  <span className="text-[11px] font-medium text-pink-800">{typingSender}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Dynamic Interactive Action Area (Bottom Controls) */}
          <div className="bg-white border-t border-stone-200/80 p-3 z-10">
            {/* Step 3: Human Stylist Waiting for user reply */}
            {currentStep === 3 && (
              <div className="space-y-2 animate-fade-in">
                <div className="text-[11px] font-semibold text-stone-600 flex items-center gap-1">
                  <span>💡 Rekomendasi Jawaban Cepat:</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleUserReply('Buat hangout, ada kulot hitam & kemeja putih')}
                  className="w-full text-left p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/90 text-amber-950 font-medium text-xs flex items-center justify-between gap-2 shadow-2xs transition-all transform active:scale-98 group"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-700 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>Balas: "Buat hangout, ada kulot hitam & kemeja putih"</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-600 shrink-0" />
                </button>
              </div>
            )}

            {/* Step 5: Finished Flow - presenter actions */}
            {currentStep === 5 && (
              <div className="space-y-2 animate-fade-in">
                <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium px-1">
                  <span>Konsultasi Selesai ✨</span>
                  <span className="text-emerald-700 font-semibold">Tersimpan di Profil</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setMessages((prev) => [
                        ...prev,
                        {
                          id: `feedback-${Date.now()}`,
                          sender: 'user',
                          senderName: 'Kamu',
                          timestamp: timeNow,
                          text: 'Suka banget rekomendasinya! Minta link pembelian produknya dong 😍',
                        },
                      ]);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            id: `stylist-link-${Date.now()}`,
                            sender: 'stylist',
                            senderName: 'Stylist Darafika',
                            senderRole: 'Senior Personal Stylist',
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            text: 'Siap! Katalog & diskon toko resminya sudah aku sematkan ke menu wishlist kamu ya. Selamat bereksperimen dengan gaya barumu! 🛍️✨',
                          },
                        ]);
                      }, 1000);
                    }}
                    className="py-2 px-3 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-900 font-medium text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span>Minta Link Produk</span>
                  </button>
                  <button
                    onClick={handleReset}
                    className="py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200/80 border border-amber-300/80 text-amber-950 font-medium text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                    <span>Ulangi Simulasi</span>
                  </button>
                </div>
              </div>
            )}

            {/* Default Input bar simulator */}
            {(currentStep === 1 || currentStep === 2 || currentStep === 4) && (
              <div className="flex items-center gap-2 bg-stone-100/90 rounded-2xl px-3.5 py-2 text-xs text-stone-400 select-none border border-stone-200/50">
                <span className="flex-1 truncate">
                  {currentStep === 1
                    ? 'Pilih opsi di atas untuk melanjutkan...'
                    : currentStep === 2
                    ? 'AI sedang memproses kecocokan stylist...'
                    : 'Stylist sedang membalas...'}
                </span>
                <button
                  disabled
                  className="w-7 h-7 rounded-xl bg-stone-200 flex items-center justify-center text-stone-400 cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Bar Indicator (Home bar) */}
          <div className="bg-white pb-2 pt-1 flex justify-center">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>

        {/* Presentation Context Footer */}
        <div className="mt-4 text-center text-xs text-stone-600 max-w-sm">
          <p className="font-semibold text-stone-800">
            Maison De Style &copy; 2026 • Interactive Chatbot Prototype
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Desain mobile-first dengan tema Soft Pink & Soft Brown.
          </p>
        </div>
      </div>
    </main>
  );
}
