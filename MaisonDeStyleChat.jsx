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
  Heart,
  Check,
  Sparkle,
  ShieldCheck,
  GraduationCap,
  Coffee,
  Briefcase,
  User,
  DollarSign
} from 'lucide-react';

// Stylist Avatar Constant
const STYLIST_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

/**
 * Dynamic Lookbook Generator based on scenario, body shape, and budget.
 * Maps pricing dynamically into cheap (<150k), medium (150k-250k), or premium (>250k).
 * Injects shape-balancing styling rationale into the text and product descriptions.
 */
function generateDynamicLookbook(scenario, shape = 'Pear', budget = 'Rp 150k - 250k') {
  const activeShape = shape || 'Pear';
  const activeBudget = budget || 'Rp 150k - 250k';

  // Determine pricing tier
  const isBudget = activeBudget === '< Rp 150k';
  const isPremium = activeBudget === '> Rp 250k';
  const tier = isBudget ? 'budget' : isPremium ? 'premium' : 'medium';

  // Shape specific styling notes
  const shapeTips = {
    Pear: 'menyeimbangkan proporsi pinggul dengan fokus siluet atasan & aksen pinggang tinggi',
    Hourglass: 'mempertahankan keseimbangan proporsi alami dan menonjolkan lekuk pinggang',
    Rectangle: 'menciptakan ilusi lekukan tubuh dan dimensi siluet yang dinamis',
  };
  const shapeTip = shapeTips[activeShape] || shapeTips['Pear'];

  if (scenario === 'campus') {
    let items = [];
    let totalPrice = '';
    let budgetLabel = '';

    if (tier === 'budget') {
      budgetLabel = 'Koleksi Hemat (< Rp 150k)';
      totalPrice = 'Rp 140.000';
      items = [
        {
          id: 'campus-b1',
          title: 'Cropped Linen Outer',
          price: 'Rp 55.000',
          tag: 'Outer Ramah Kantong',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
          desc: `Outer linen sejuk dengan potongan crop yang pas untuk menyeimbangkan siluet ${activeShape}.`,
        },
        {
          id: 'campus-b2',
          title: 'Basic White Tee 30s',
          price: 'Rp 35.000',
          tag: 'Inner Esensial',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          desc: 'Kaos katun combed lembut, adem dan menyerap keringat di ruang kelas.',
        },
        {
          id: 'campus-b3',
          title: 'Canvas Slip-on Shoes',
          price: 'Rp 50.000',
          tag: 'Sepatu Kuliah',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
          desc: 'Sepatu slip-on simpel dan ringan untuk mobilitas aktif di kampus.',
        },
      ];
    } else if (tier === 'premium') {
      budgetLabel = 'Koleksi Premium (> Rp 250k)';
      totalPrice = 'Rp 520.000';
      items = [
        {
          id: 'campus-p1',
          title: 'Tailored Wool-Blend Blazer',
          price: 'Rp 210.000',
          tag: 'Designer Outer',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
          desc: `Blazer berfuring sutra dengan struktur bahu presisi, menyempurnakan siluet ${activeShape}.`,
        },
        {
          id: 'campus-p2',
          title: 'Supima Cotton Tee',
          price: 'Rp 120.000',
          tag: 'Luxury Inner',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          desc: 'Katun Supima grade-A anti kusut dengan handfeel ekstra halus.',
        },
        {
          id: 'campus-p3',
          title: 'Chunky Leather Loafers',
          price: 'Rp 190.000',
          tag: 'Platform Shoes',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
          desc: 'Sol platform kulit asli 4cm, empuk dan memberi efek kaki jenjang.',
        },
      ];
    } else {
      // Medium: Rp 150k - 250k
      budgetLabel = 'Best Value (Rp 150k - 250k)';
      totalPrice = 'Rp 230.000';
      items = [
        {
          id: 'campus-m1',
          title: 'Oversized Soft Blazer',
          price: 'Rp 110.000',
          tag: 'Smart Outer',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
          desc: `Potongan semi-formal jatuh rapi, dirancang untuk ${shapeTip}.`,
        },
        {
          id: 'campus-m2',
          title: 'Ribbed Knit Inner Top',
          price: 'Rp 45.000',
          tag: 'Essential Inner',
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
          desc: 'Kain rajut halus bertekstur, nyaman dan elastis seharian.',
        },
        {
          id: 'campus-m3',
          title: 'Classic Penny Loafers',
          price: 'Rp 75.000',
          tag: 'Footwear',
          image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&auto=format&fit=crop&q=80',
          desc: 'Sol berdaya cengkeram empuk, aman dipakai keliling gedung fakultas.',
        },
      ];
    }

    return {
      theme: `Smart Casual Kampus (${activeShape})`,
      budgetLabel,
      totalPrice,
      shapeTag: activeShape,
      budgetTag: activeBudget,
      botReply: `Cocok banget! Untuk ke kampus, gaya Smart Casual ini bakal menyeimbangkan bentuk tubuh ${activeShape} kamu agar terlihat jenjang dan proporsional. Seluruh item juga dikurasi khusus untuk target budget ${activeBudget}. Cek lookbook ini ya:`,
      followUp: `Total kombinasi outfit kampus untuk body shape ${activeShape} ini adalah ${totalPrice} (sesuai budget ${activeBudget}). Mau langsung checkout atau ada yang mau disesuaikan? 🎓✨`,
      items,
    };
  } else if (scenario === 'hangout') {
    let items = [];
    let totalPrice = '';
    let budgetLabel = '';

    if (tier === 'budget') {
      budgetLabel = 'Koleksi Hemat (< Rp 150k)';
      totalPrice = 'Rp 130.000';
      items = [
        {
          id: 'hangout-b1',
          title: 'High-Waist Cotton Pants',
          price: 'Rp 50.000',
          tag: 'Casual Bottom',
          image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80',
          desc: `Celana katun pinggang karet tinggi yang nyaman untuk bentuk tubuh ${activeShape}.`,
        },
        {
          id: 'hangout-b2',
          title: 'Ribbed Crop Cami',
          price: 'Rp 35.000',
          tag: 'Trendy Top',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          desc: 'Atasan crop knit simpel untuk nongkrong santai di cafe.',
        },
        {
          id: 'hangout-b3',
          title: 'Mini Canvas Tote',
          price: 'Rp 45.000',
          tag: 'Aksesoris Cafe',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
          desc: 'Tas kain minimalis estetik untuk membawa barang esensial.',
        },
      ];
    } else if (tier === 'premium') {
      budgetLabel = 'Koleksi Premium (> Rp 250k)';
      totalPrice = 'Rp 530.000';
      items = [
        {
          id: 'hangout-p1',
          title: 'Wide-Leg Selvedge Denim',
          price: 'Rp 220.000',
          tag: 'Designer Denim',
          image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80',
          desc: `Jeans potongan wide-leg premium yang memberi dimensi anggun pada tubuh ${activeShape}.`,
        },
        {
          id: 'hangout-p2',
          title: 'Seamless Halter Knit Top',
          price: 'Rp 130.000',
          tag: 'Statement Top',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          desc: 'Rajut seamless berkualitas tinggi dengan garis leher halterneck modis.',
        },
        {
          id: 'hangout-p3',
          title: 'Vegan Leather Baguette Bag',
          price: 'Rp 180.000',
          tag: 'Y2K Luxury Bag',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
          desc: 'Tas kulit sintetis premium dengan gold buckle aksen mewah.',
        },
      ];
    } else {
      // Medium: Rp 150k - 250k
      budgetLabel = 'Best Value (Rp 150k - 250k)';
      totalPrice = 'Rp 225.000';
      items = [
        {
          id: 'hangout-m1',
          title: 'Khaki Cargo Pants High-Waist',
          price: 'Rp 115.000',
          tag: 'Statement Bottom',
          image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80',
          desc: `Potongan cargo high-waist yang pas untuk ${shapeTip}.`,
        },
        {
          id: 'hangout-m2',
          title: 'Square-Neck Knit Crop Top',
          price: 'Rp 45.000',
          tag: 'Top Pick',
          image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80',
          desc: 'Kerah square mempertegas garis bahu dan leher agar siluet lebih proporsional.',
        },
        {
          id: 'hangout-m3',
          title: 'Baguette Shoulder Bag',
          price: 'Rp 65.000',
          tag: 'Aksesoris Chic',
          image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
          desc: 'Tas bahu warna earthy chic yang melengkapi estetika gaya Y2K kamu.',
        },
      ];
    }

    return {
      theme: `Y2K / Casual Chic (${activeShape})`,
      budgetLabel,
      totalPrice,
      shapeTag: activeShape,
      budgetTag: activeBudget,
      botReply: `Wah, seru banget! Untuk hangout, gaya Y2K / Casual Chic ini bakal menyeimbangkan bentuk tubuh ${activeShape} kamu agar terlihat lebih ramping dan stand out di cafe. Pilihan ini disesuaikan dengan budget ${activeBudget}:`,
      followUp: `Total lookbook hangout untuk body shape ${activeShape} ini adalah ${totalPrice} (masuk dalam target budget ${activeBudget}). Gimana menurutmu? ☕📸`,
      items,
    };
  } else {
    // Formal / Kerja / Interview
    let items = [];
    let totalPrice = '';
    let budgetLabel = '';

    if (tier === 'budget') {
      budgetLabel = 'Koleksi Hemat (< Rp 150k)';
      totalPrice = 'Rp 145.000';
      items = [
        {
          id: 'formal-b1',
          title: 'Pleated Culottes Pant',
          price: 'Rp 55.000',
          tag: 'Office Bottom',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
          desc: `Bahan jatuh anti kusut yang memberi ilusi jenjang pada tubuh ${activeShape}.`,
        },
        {
          id: 'formal-b2',
          title: 'Basic Chiffon Blouse',
          price: 'Rp 45.000',
          tag: 'Clean Blouse',
          image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80',
          desc: 'Kerah V rapi yang memberi kesan leher lebih jenjang untuk wawancara.',
        },
        {
          id: 'formal-b3',
          title: 'Low Block Heels 3cm',
          price: 'Rp 45.000',
          tag: 'Comfort Heels',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
          desc: 'Hak tahu stabil anti pegal untuk seharian beraktivitas formal.',
        },
      ];
    } else if (tier === 'premium') {
      budgetLabel = 'Koleksi Premium (> Rp 250k)';
      totalPrice = 'Rp 595.000';
      items = [
        {
          id: 'formal-p1',
          title: 'Tailored Semi-Wool Trousers',
          price: 'Rp 240.000',
          tag: 'Executive Trouser',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
          desc: `Celana semi-wool potongan lurus presisi, memeluk pinggang ${activeShape} dengan sempurna.`,
        },
        {
          id: 'formal-p2',
          title: 'Mulberry Silk Bow Blouse',
          price: 'Rp 160.000',
          tag: 'Silk Luxury',
          image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80',
          desc: 'Sutra murbei bertekstur anggun dengan aksen pita leher profesional.',
        },
        {
          id: 'formal-p3',
          title: 'Pointed Stiletto Heels 6cm',
          price: 'Rp 195.000',
          tag: 'Designer Heels',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
          desc: 'Sol busa memori empuk dengan siluet lancip yang memancarkan wibawa.',
        },
      ];
    } else {
      // Medium: Rp 150k - 250k
      budgetLabel = 'Best Value (Rp 150k - 250k)';
      totalPrice = 'Rp 240.000';
      items = [
        {
          id: 'formal-m1',
          title: 'High-waist Semi-Wool Culottes',
          price: 'Rp 110.000',
          tag: 'Tailored Trouser',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80',
          desc: `Bahan semi-wool flowy, dirancang untuk ${shapeTip}.`,
        },
        {
          id: 'formal-m2',
          title: 'Silk Satin Blouse',
          price: 'Rp 55.000',
          tag: 'Elegant Top',
          image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80',
          desc: 'Aksen kerah mewah dengan kilau satin lembut yang profesional.',
        },
        {
          id: 'formal-m3',
          title: 'Pointed Kitten Heels 5cm',
          price: 'Rp 75.000',
          tag: 'Footwear',
          image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
          desc: 'Hak 5cm yang stabil dan elegan untuk wawancara maupun meeting.',
        },
      ];
    }

    return {
      theme: `Professional Chic (${activeShape})`,
      budgetLabel,
      totalPrice,
      shapeTag: activeShape,
      budgetTag: activeBudget,
      botReply: `Untuk acara profesional, gaya Professional Chic ini bakal menyeimbangkan bentuk tubuh ${activeShape} kamu agar terlihat clean, elegan, dan berwibawa. Harganya juga disesuaikan dengan target budget ${activeBudget}. Ini rekomendasinya:`,
      followUp: `Total kombinasi profesional untuk bentuk tubuh ${activeShape} ini adalah ${totalPrice} (terjangkau dalam rentang ${activeBudget}). Mau checkout sekarang atau ada yang ingin ditanyakan? 💼✨`,
      items,
    };
  }
}

export default function MaisonDeStyleChat() {
  // Input state for user free typing
  const [inputText, setInputText] = useState('');

  // 1. Global User Profile State (Requirement 1)
  const [userProfile, setUserProfile] = useState({
    shape: '',
    budget: '',
  });

  const [isQuestionnaireAnswered, setIsQuestionnaireAnswered] = useState(false);

  // Typing simulator state
  const [isTyping, setIsTyping] = useState(false);
  const [activePersona, setActivePersona] = useState('AI Style Matcher');
  const [isStylistActive, setIsStylistActive] = useState(false);

  // Message list state
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
  const inputRef = useRef(null);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // -------------------------------------------------------------
  // Initial Questionnaire Chip Selection Logic
  // -------------------------------------------------------------
  const handlePillSelect = (type, value) => {
    const updatedProfile = {
      shape: type === 'shape' ? value : userProfile.shape,
      budget: type === 'budget' ? value : userProfile.budget,
    };

    setUserProfile(updatedProfile);

    // If both shape and budget have been picked, submit automatically
    if (updatedProfile.shape && updatedProfile.budget && !isQuestionnaireAnswered) {
      setIsQuestionnaireAnswered(true);
      submitInitialPreferences(updatedProfile.shape, updatedProfile.budget);
    }
  };

  const submitInitialPreferences = (shape, budget) => {
    const time = getCurrentTime();

    // 1. Append User Preference message
    const userMsg = {
      id: `pref-${Date.now()}`,
      sender: 'user',
      senderName: 'Kamu',
      timestamp: time,
      text: `Preferensi Saya:\n• Body Shape: ${shape}\n• Target Budget: ${budget}`,
    };

    setMessages((prev) => [...prev, userMsg]);

    // 2. Bot acknowledgment
    setTimeout(() => {
      const botAck = {
        id: `ack-${Date.now()}`,
        sender: 'bot',
        senderName: 'AI Style Matcher',
        timestamp: getCurrentTime(),
        text: `Data disimpan! 📝 Profil kamu (${shape} • ${budget}) sedang dihubungkan ke Stylist profesional kami...`,
      };

      setMessages((prev) => [...prev, botAck]);
      setIsTyping(true);
      setActivePersona('Stylist Darafika');

      // 3. Connect to Stylist Darafika after 1.5 seconds
      setTimeout(() => {
        setIsTyping(false);
        setIsStylistActive(true);

        const stylistIntro = {
          id: `stylist-intro-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: `Halo! Aku Darafika, personal stylist kamu hari ini. Senang banget bisa bantu styling untuk body shape ${shape} dengan budget ${budget}! ✨\n\nKamu lagi cari outfit untuk acara apa nih? Boleh ketik langsung di kolom pesan di bawah (misalnya: ke kampus, hangout cafe, atau interview kerja)!`,
          suggestQuickReplies: true,
        };

        setMessages((prev) => [...prev, stylistIntro]);

        // Focus input field so user can type freely right away
        setTimeout(() => inputRef.current?.focus(), 200);
      }, 1500);
    }, 400);
  };

  // -------------------------------------------------------------
  // Dynamic Response Engine (Keyword & Profile Driven)
  // -------------------------------------------------------------
  const processUserMessage = (textToSend) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const time = getCurrentTime();

    // 1. Add user message to history
    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      senderName: 'Kamu',
      timestamp: time,
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Active Profile: fallback safely if user typed before selecting chips
    const activeShape = userProfile.shape || 'Pear';
    const activeBudget = userProfile.budget || 'Rp 150k - 250k';

    // 2. Trigger typing indicator for 1.5 seconds
    setIsTyping(true);
    setActivePersona('Stylist Darafika');
    setIsStylistActive(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = trimmed.toLowerCase();

      // Keyword matchers
      const isCampus = ['kampus', 'kuliah', 'campus', 'kelas', 'skripsi', 'dosen'].some((k) =>
        lower.includes(k)
      );
      const isHangout = [
        'hangout',
        'main',
        'cafe',
        'jalan',
        'ulang tahun',
        'nongkrong',
        'mall',
        'kencan',
        'santai',
      ].some((k) => lower.includes(k));
      const isFormal = [
        'kerja',
        'interview',
        'kantor',
        'formal',
        'rapat',
        'meeting',
        'magang',
        'sidang',
      ].some((k) => lower.includes(k));

      if (isCampus) {
        // Condition A: Campus / Kuliah (Dynamically mapped with userProfile.shape & budget)
        const lookbookData = generateDynamicLookbook('campus', activeShape, activeBudget);

        const botResponse = {
          id: `reply-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.botReply,
          lookbook: lookbookData,
        };
        const followUpResponse = {
          id: `followup-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.followUp,
          hasActionButtons: true,
        };
        setMessages((prev) => [...prev, botResponse, followUpResponse]);
      } else if (isHangout) {
        // Condition B: Hangout / Cafe / Y2K (Dynamically mapped)
        const lookbookData = generateDynamicLookbook('hangout', activeShape, activeBudget);

        const botResponse = {
          id: `reply-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.botReply,
          lookbook: lookbookData,
        };
        const followUpResponse = {
          id: `followup-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.followUp,
          hasActionButtons: true,
        };
        setMessages((prev) => [...prev, botResponse, followUpResponse]);
      } else if (isFormal) {
        // Condition C: Kerja / Interview / Kantor (Dynamically mapped)
        const lookbookData = generateDynamicLookbook('formal', activeShape, activeBudget);

        const botResponse = {
          id: `reply-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.botReply,
          lookbook: lookbookData,
        };
        const followUpResponse = {
          id: `followup-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: lookbookData.followUp,
          hasActionButtons: true,
        };
        setMessages((prev) => [...prev, botResponse, followUpResponse]);
      } else {
        // Condition D: Fallback / Clarification (Dynamically mentions userProfile)
        const fallbackResponse = {
          id: `reply-fallback-${Date.now()}`,
          sender: 'stylist',
          senderName: 'Stylist Darafika',
          timestamp: getCurrentTime(),
          text: `Hmm, menarik! Biar aku bisa kasih rekomendasi lookbook yang paling pas buat menyeimbangkan bentuk tubuh ${activeShape} kamu di bawah budget ${activeBudget}, acaranya ini lebih ke formal (kayak interview/kerja) atau santai (kayak hangout/kuliah) nih? 😊`,
          suggestQuickReplies: true,
        };
        setMessages((prev) => [...prev, fallbackResponse]);
      }
    }, 1500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    processUserMessage(inputText);
  };

  // Reset entire conversation
  const handleReset = () => {
    setInputText('');
    setUserProfile({ shape: '', budget: '' });
    setIsQuestionnaireAnswered(false);
    setIsTyping(false);
    setIsStylistActive(false);
    setActivePersona('AI Style Matcher');
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
    <main className="min-h-screen bg-rose-50 flex items-center justify-center p-2 sm:p-4 md:p-6 font-sans antialiased select-none">
      <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">
        
        {/* Top Control Bar for Presenter */}
        <div className="w-full flex items-center justify-between px-3 mb-2.5 text-xs text-[#7c5344] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-semibold tracking-wider text-[11px] uppercase text-[#6f4536]">
              Maison De Style • Live Dynamic Chat
            </span>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-rose-700 shadow-xs border border-rose-200/80 transition-all text-[11px] font-semibold active:scale-95"
            title="Reset percakapan dari awal"
          >
            <RotateCcw className="w-3 h-3 text-rose-600" />
            <span>Reset Flow</span>
          </button>
        </div>

        {/* iPhone Mockup Container */}
        <div className="w-full bg-rose-50 rounded-[44px] shadow-[0_25px_70px_-15px_rgba(95,50,40,0.25)] border-[9px] border-[#1e1918] overflow-hidden flex flex-col h-[820px] max-h-[94vh] relative ring-1 ring-black/10">
          
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

          {/* Sticky Glassmorphic Header */}
          <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/85 border-b border-rose-200/50 px-3.5 py-2.5 shadow-xs transition-colors">
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleReset}
                  className="p-1 -ml-1 text-stone-500 hover:text-stone-800 active:scale-90 transition-transform rounded-full"
                  title="Kembali ke awal"
                >
                  <ChevronLeft className="w-5 h-5 text-stone-700" />
                </button>

                {/* Avatar with Green Online Indicator */}
                <div className="relative">
                  {isStylistActive ? (
                    <img
                      src={STYLIST_AVATAR}
                      alt="Stylist Darafika"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-300 shadow-xs"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-300 via-pink-200 to-amber-200 flex items-center justify-center text-pink-900 ring-2 ring-rose-200 shadow-xs">
                      <Sparkles className="w-5 h-5 text-rose-700" />
                    </div>
                  )}

                  {/* Pulsing Green Dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-100 animate-ping" />
                  </span>
                </div>

                {/* Title & Active Persona */}
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
                    {isStylistActive ? (
                      <span className="text-stone-600">
                        <strong className="text-stone-800 font-semibold">Darafika</strong> • Online
                      </span>
                    ) : (
                      <span className="text-rose-700 font-medium">AI Smart Matcher</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Profile Indicator Badge */}
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-100/90 to-rose-100/90 border border-amber-300/60 text-[#74452e] text-[10px] font-semibold shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Personal Stylist</span>
                </div>
                {userProfile.shape && (
                  <span className="text-[9px] font-bold text-rose-800 bg-rose-100/80 px-1.5 py-0.2 rounded-sm border border-rose-200">
                    {userProfile.shape} • {userProfile.budget}
                  </span>
                )}
              </div>
            </div>
          </header>

          {/* Chat Messages Body with Auto-Scroll */}
          <div className="flex-1 overflow-y-auto px-3.5 py-3.5 space-y-3.5 bg-rose-50/70 scroll-smooth">
            
            <div className="flex justify-center my-1">
              <span className="text-[10px] font-semibold tracking-wide uppercase px-3 py-0.5 rounded-full bg-stone-200/70 text-stone-600">
                Sesi Konsultasi Interaktif
              </span>
            </div>

            {/* Framer Motion Animated Message Bubbles */}
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isStylist = msg.sender === 'stylist';

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    {/* Sender Tag */}
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
                      {/* Avatar */}
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

                      {/* Bubble Surface */}
                      <div
                        className={`relative rounded-2xl p-3.5 text-[13px] leading-relaxed shadow-sm transition-all ${
                          isUser
                            ? 'bg-amber-100 text-amber-900 rounded-br-xs border border-amber-200/90 font-normal'
                            : 'bg-pink-100 text-pink-900 rounded-bl-xs border border-pink-200/80'
                        }`}
                      >
                        <p className="whitespace-pre-line font-medium">{msg.text}</p>

                        {/* Interactive Questionnaire Pills (Initial State) */}
                        {msg.isQuestionnaire && !isQuestionnaireAnswered && (
                          <div className="mt-3 pt-3 border-t border-pink-200/70 space-y-3">
                            {/* Body Shape Row */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[11px] font-bold text-pink-900 tracking-wide uppercase">
                                  1. Body Shape
                                </label>
                                {userProfile.shape && (
                                  <span className="text-[10px] text-pink-700 font-semibold">
                                    Dipilih: {userProfile.shape}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['Pear', 'Hourglass', 'Rectangle'].map((shape) => {
                                  const isSelected = userProfile.shape === shape;
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

                            {/* Budget Row */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-[11px] font-bold text-pink-900 tracking-wide uppercase">
                                  2. Target Budget
                                </label>
                                {userProfile.budget && (
                                  <span className="text-[10px] text-pink-700 font-semibold">
                                    Dipilih: {userProfile.budget}
                                  </span>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {['< Rp 150k', 'Rp 150k - 250k', '> Rp 250k'].map((budget) => {
                                  const isSelected = userProfile.budget === budget;
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

                            <div className="text-[10px] text-pink-800/80 italic text-center pt-1 font-medium">
                              Ketuk pilihan di atas untuk menyesuaikan lookbook & harga ✨
                            </div>
                          </div>
                        )}

                        {/* Dynamic Lookbook Carousel (Driven by Shape & Budget) */}
                        {msg.lookbook && (
                          <div className="mt-3 pt-3 border-t border-pink-200/70">
                            
                            {/* Lookbook Profile Indicator Banner */}
                            <div className="bg-white/80 rounded-xl p-2 mb-2 border border-pink-200 flex items-center justify-between shadow-2xs">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-stone-800">
                                <Sparkle className="w-3.5 h-3.5 text-rose-600" />
                                <span>{msg.lookbook.theme}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded-md">
                                  {msg.lookbook.budgetLabel}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-1.5 px-0.5">
                              <span className="text-[10px] text-pink-900 font-semibold">
                                Total Look: <strong className="text-rose-700 font-extrabold">{msg.lookbook.totalPrice}</strong>
                              </span>
                              <span className="text-[10px] font-medium text-pink-700">Geser Kartu ➔</span>
                            </div>

                            {/* Horizontal Scrollable Carousel */}
                            <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 -mx-2 px-2 snap-x snap-mandatory scrollbar-none">
                              {msg.lookbook.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="min-w-[205px] max-w-[205px] bg-white rounded-2xl overflow-hidden border border-rose-200/90 shadow-sm flex-shrink-0 snap-start flex flex-col hover:shadow-md transition-shadow"
                                >
                                  {/* Product Image */}
                                  <div className="relative h-36 bg-stone-100 overflow-hidden group">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md shadow-xs bg-white/95 text-stone-800 border border-stone-200">
                                      {item.tag}
                                    </span>
                                    <button
                                      type="button"
                                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-rose-600 hover:text-rose-800 shadow-xs"
                                    >
                                      <Heart className="w-3.5 h-3.5" />
                                    </button>
                                  </div>

                                  {/* Product Details */}
                                  <div className="p-2.5 flex-1 flex flex-col justify-between bg-white">
                                    <div>
                                      <h4 className="font-bold text-stone-900 text-xs leading-snug">
                                        {item.title}
                                      </h4>
                                      <p className="text-[10px] text-stone-500 mt-0.5 line-clamp-2 leading-relaxed">
                                        {item.desc}
                                      </p>
                                    </div>

                                    <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                                      <span className="font-extrabold text-[12px] text-rose-700">
                                        {item.price}
                                      </span>
                                      <span className="text-[10px] font-semibold text-stone-400 flex items-center gap-0.5">
                                        Pilih <ChevronRight className="w-3 h-3" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Quick Action Buttons for Completed Lookbook */}
                        {msg.hasActionButtons && (
                          <div className="mt-2 pt-2 border-t border-pink-200/70 flex gap-1.5">
                            <button
                              type="button"
                              onClick={() => processUserMessage(`Mau checkout paket ${msg.lookbook?.theme || 'lookbook'} sekarang! 🛍️`)}
                              className="flex-1 py-1.5 px-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 text-white rounded-lg text-[10px] font-bold shadow-2xs flex items-center justify-center gap-1 active:scale-95"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Checkout Sekarang</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => processUserMessage('Bisa carikan opsi lain untuk acara hangout santai?')}
                              className="py-1.5 px-2 bg-white hover:bg-stone-50 text-stone-700 border border-pink-200 rounded-lg text-[10px] font-semibold active:scale-95"
                            >
                              Ganti Opsi Lain
                            </button>
                          </div>
                        )}

                        {/* Suggest Quick Replies Pills (Contextual Helper) */}
                        {msg.suggestQuickReplies && (
                          <div className="mt-2.5 pt-2 border-t border-pink-200/70">
                            <p className="text-[10px] font-bold text-pink-900 uppercase tracking-wide mb-1.5">
                              Saran Respon Cepat:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              <button
                                type="button"
                                onClick={() => processUserMessage('Mau cari outfit buat ke kampus kuliah 🎓')}
                                className="py-1 px-2 rounded-lg bg-white/95 text-stone-700 hover:bg-white border border-pink-200/90 text-[10px] font-semibold flex items-center gap-1 shadow-2xs active:scale-95"
                              >
                                <GraduationCap className="w-3 h-3 text-emerald-600" />
                                <span>Ke Kampus / Kuliah</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => processUserMessage('Buat hangout cafe sama teman-teman ☕')}
                                className="py-1 px-2 rounded-lg bg-white/95 text-stone-700 hover:bg-white border border-pink-200/90 text-[10px] font-semibold flex items-center gap-1 shadow-2xs active:scale-95"
                              >
                                <Coffee className="w-3 h-3 text-rose-600" />
                                <span>Hangout / Cafe</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => processUserMessage('Untuk interview kerja formal di kantor 💼')}
                                className="py-1 px-2 rounded-lg bg-white/95 text-stone-700 hover:bg-white border border-pink-200/90 text-[10px] font-semibold flex items-center gap-1 shadow-2xs active:scale-95"
                              >
                                <Briefcase className="w-3 h-3 text-amber-700" />
                                <span>Interview / Kantor</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Timestamp & Read Check */}
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
                  <span className="text-[11px] font-semibold text-pink-900">{activePersona} sedang mengetik...</span>
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

          {/* Sticky Functional Input Bar */}
          <div className="bg-white/95 backdrop-blur-md border-t border-rose-100/90 p-3 z-30">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              
              {/* Attachment Paperclip Button */}
              <button
                type="button"
                onClick={() => processUserMessage('Ini foto baju lemari saya: kemeja putih & kulot 📸')}
                className="p-2 rounded-xl text-stone-500 hover:text-rose-700 hover:bg-rose-50 active:scale-95 transition-all"
                title="Kirim Foto Lemari"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Working Text Input Field */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    userProfile.shape
                      ? `Ketik acara untuk ${userProfile.shape} (misal: kampus, hangout, kantor)...`
                      : 'Ketik acara kamu (misal: kampus, hangout, kantor)...'
                  }
                  className="w-full bg-stone-100/90 hover:bg-stone-100 focus:bg-white rounded-2xl px-3.5 py-2 text-xs text-stone-900 placeholder:text-stone-400 border border-stone-200/80 focus:border-rose-300 focus:ring-2 focus:ring-rose-200 focus:outline-hidden transition-all"
                />
              </div>

              {/* Functional Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  inputText.trim()
                    ? 'bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-xs active:scale-95 cursor-pointer hover:shadow-md'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
                title="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-stone-400 mt-1.5 px-1 font-medium">
              <span>Tekan Enter ↵ untuk kirim</span>
              <span>
                {userProfile.shape ? (
                  <span className="text-rose-600 font-semibold">
                    Profil: {userProfile.shape} ({userProfile.budget})
                  </span>
                ) : (
                  'Pilih chip di atas untuk filter harga'
                )}
              </span>
            </div>
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="bg-white pb-2 pt-1 flex justify-center">
            <div className="w-32 h-1 bg-stone-300 rounded-full" />
          </div>
        </div>

        {/* Presentation Context Footer */}
        <div className="mt-3 text-center text-[11px] text-[#784d3d]/90 font-medium max-w-xs">
          <p className="font-semibold text-stone-800">Maison De Style &bull; Profile-Driven Engine</p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            Body Shape &amp; Budget dynamically customize lookbook text, items &amp; pricing
          </p>
        </div>
      </div>
    </main>
  );
}
