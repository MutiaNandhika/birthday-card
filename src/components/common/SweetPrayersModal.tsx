"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  X,
  BookOpen,
  Image as ImageIcon,
  Shield,
  Sun,
  Copy,
  Check,
} from "lucide-react";
import Image from "next/image";
import { birthdayData, MemoryItem, PrayerItem } from "@/data/birthday";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SweetPrayersModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "letter" | "prayers" | "gallery";
}

export function SweetPrayersModal({
  isOpen,
  onClose,
  defaultTab = "prayers",
}: SweetPrayersModalProps) {
  const [activeTab, setActiveTab] = useState<"letter" | "prayers" | "gallery">(defaultTab);
  const [copiedPrayerId, setCopiedPrayerId] = useState<string | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<MemoryItem | null>(null);
  const { playClick, playSparkle } = useSoundEffects();

  const handleTabChange = (tab: "letter" | "prayers" | "gallery") => {
    playClick();
    setActiveTab(tab);
  };

  const handleCopyPrayer = (prayer: PrayerItem) => {
    playSparkle();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(`${prayer.title}\n\n"${prayer.prayer}"`);
      setCopiedPrayerId(prayer.id);
      setTimeout(() => setCopiedPrayerId(null), 2000);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="w-5 h-5 text-bday-primary fill-bday-primary" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-bday-accent" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-indigo-400" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-amber-500" />;
      default:
        return <Heart className="w-5 h-5 text-bday-primary" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-bday-secondary/50 flex flex-col overflow-hidden my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-bday-secondary/30 bg-gradient-to-r from-bday-bg via-white to-bday-bg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-bday-secondary/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-bday-primary fill-bday-primary" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-bday-text">
                  Persembahan Cinta &amp; Doa
                </h3>
                <p className="text-[11px] text-bday-muted">
                  Khusus untuk Ibrahim Septiardy • 1st Anniversary &amp; Birthday
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              aria-label="Tutup modal"
              className="p-1.5 rounded-full hover:bg-black/5 text-bday-muted hover:text-bday-text transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 py-2.5 bg-bday-subtle/40 border-b border-bday-secondary/20">
            <button
              onClick={() => handleTabChange("prayers")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "prayers"
                  ? "bg-bday-primary text-white shadow-sm"
                  : "bg-white text-bday-muted hover:text-bday-text border border-bday-secondary/40"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Doa-Doa Manis</span>
            </button>

            <button
              onClick={() => handleTabChange("letter")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "letter"
                  ? "bg-bday-primary text-white shadow-sm"
                  : "bg-white text-bday-muted hover:text-bday-text border border-bday-secondary/40"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Surat Cinta</span>
            </button>

            <button
              onClick={() => handleTabChange("gallery")}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === "gallery"
                  ? "bg-bday-primary text-white shadow-sm"
                  : "bg-white text-bday-muted hover:text-bday-text border border-bday-secondary/40"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>10 Kenangan Kita</span>
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 overflow-y-auto space-y-4 max-h-[calc(90vh-140px)]">
            {/* TAB 1: PRAYERS & BLESSINGS */}
            {activeTab === "prayers" && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-bday-primary">
                    Untaian Harapan Tulus
                  </span>
                  <h4 className="font-serif text-xl font-bold text-bday-text mt-0.5">
                    Kumpulan Doa untuk Ibrahim
                  </h4>
                  <p className="text-xs text-bday-muted mt-1">
                    Semoga semesta senantiasa melimpahkan kebaikan, kelapangan, dan kebahagiaan untukmu.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {birthdayData.prayers.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-gradient-to-br from-white to-bday-bg border border-bday-secondary/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {renderIcon(item.icon)}
                            <span className="text-[11px] font-bold uppercase tracking-wider text-bday-muted">
                              {item.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleCopyPrayer(item)}
                            aria-label={`Salin ${item.title}`}
                            className="p-1 rounded text-bday-muted hover:text-bday-primary hover:bg-bday-secondary/20 transition-colors"
                            title="Salin Doa"
                          >
                            {copiedPrayerId === item.id ? (
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <h5 className="font-serif font-bold text-sm sm:text-base text-bday-text">
                          {item.title}
                        </h5>
                        <p className="text-xs text-bday-text/80 leading-relaxed italic">
                          &ldquo;{item.prayer}&rdquo;
                        </p>
                      </div>
                      <div className="pt-2 border-t border-bday-secondary/20 flex items-center justify-between text-[10px] text-bday-muted">
                        <span>Aamiin ya Rabbal &apos;Alamin ❤️</span>
                        <Sparkles className="w-3 h-3 text-bday-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: SURAT CINTA */}
            {activeTab === "letter" && (
              <div className="space-y-4">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-bday-primary">
                    Surat dari Lubuk Hati
                  </span>
                  <h4 className="font-serif italic text-lg sm:text-xl font-bold text-bday-text mt-0.5">
                    &ldquo;{birthdayData.letter.leadText}&rdquo;
                  </h4>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-bday-subtle/30 border border-bday-secondary/40 space-y-3 font-serif text-sm sm:text-base text-bday-text/90 leading-relaxed">
                  {birthdayData.letter.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  <div className="pt-4 border-t border-bday-secondary/40 text-right space-y-0.5">
                    <p className="font-handwriting text-2xl text-bday-primary font-bold">
                      {birthdayData.letter.signature}
                    </p>
                    <p className="text-[10px] text-bday-muted font-sans uppercase tracking-widest">
                      1st Anniversary &amp; Birthday
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: 10 KENANGAN KITA */}
            {activeTab === "gallery" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-bday-primary">
                    10 Jejak Momen Spesial
                  </span>
                  <h4 className="font-serif text-xl font-bold text-bday-text mt-0.5">
                    Galeri Kenangan Manis
                  </h4>
                  <p className="text-xs text-bday-muted">
                    Klik pada salah satu foto untuk melihat catatan cinta di baliknya ✨
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {birthdayData.memories.map((mem, index) => (
                    <div
                      key={mem.id}
                      onClick={() => {
                        playClick();
                        setSelectedGalleryItem(mem);
                      }}
                      className="group relative rounded-xl bg-white p-2 border border-bday-secondary/40 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col"
                    >
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-bday-subtle">
                        <Image
                          src={mem.image}
                          alt={mem.caption}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="pt-2 text-center">
                        <p className="font-serif font-bold text-xs text-bday-text truncate">
                          {mem.caption}
                        </p>
                        <p className="text-[10px] text-bday-muted truncate">
                          {mem.date || "Momen Indah"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sub-Modal / Lightbox for single memory */}
                {selectedGalleryItem && (
                  <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                    onClick={() => setSelectedGalleryItem(null)}
                  >
                    <div
                      className="relative w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-white/60 space-y-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedGalleryItem(null)}
                        className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-bday-text"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-bday-subtle">
                        <Image
                          src={selectedGalleryItem.image}
                          alt={selectedGalleryItem.caption}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="text-center space-y-1 pt-1">
                        <h5 className="font-serif font-bold text-base text-bday-text">
                          {selectedGalleryItem.caption}
                        </h5>
                        <p className="font-handwriting text-base text-bday-primary italic">
                          &ldquo;{selectedGalleryItem.note || selectedGalleryItem.caption}&rdquo;
                        </p>
                        <div className="pt-2 text-[10px] text-bday-muted flex items-center justify-center gap-3 border-t border-bday-secondary/30 mt-2">
                          <span>{selectedGalleryItem.date}</span>
                          <span>•</span>
                          <span>{selectedGalleryItem.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 border-t border-bday-secondary/30 bg-bday-bg flex items-center justify-between">
            <span className="text-xs text-bday-muted font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-bday-accent" />
              <span>Kita Lewati Berdua • Ibrahim Septiardy</span>
            </span>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-bday-text text-white text-xs font-semibold hover:bg-bday-primary transition-all"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
