import { useMemo, useState } from "react";
import { Reveal, RevealText } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowUpRight, Sparkles, Clock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type EventStatus = "Upcoming" | "Past";

interface Evt {
  id: string;
  title: string;
  cat: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  format: "Online" | "In-Person";
  img: string;
  status: EventStatus;
}

// Mock data updated with Upcoming/Past statuses and split dates for the new UI
const events: Evt[] = [
  { id: "1", title: "Sunday Karaoke Night", cat: "Karaoke", date: "18", month: "May", day: "Sunday", time: "7:00 PM", location: "Bandra, Mumbai", format: "In-Person", status: "Upcoming", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80" },
  { id: "2", title: "Acoustic Jam Circle", cat: "Music", date: "22", month: "May", day: "Thursday", time: "6:30 PM", location: "Indiranagar, Bengaluru", format: "In-Person", status: "Upcoming", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=80" },
  { id: "3", title: "Book Club: 'The Midnight Library'", cat: "Books", date: "28", month: "May", day: "Wednesday", time: "11:00 AM", location: "Koregaon Park, Pune", format: "In-Person", status: "Upcoming", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80" },
  { id: "4", title: "Sunrise Meditation Circle", cat: "Meditation", date: "30", month: "May", day: "Friday", time: "6:00 AM", location: "Online", format: "Online", status: "Upcoming", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80" },
  { id: "5", title: "Free Movement Workshop", cat: "Dance", date: "12", month: "Apr", day: "Saturday", time: "5:00 PM", location: "Online", format: "Online", status: "Past", img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=80" },
  { id: "6", title: "Open Mic: Storytelling Edition", cat: "Open Mic", date: "04", month: "Mar", day: "Tuesday", time: "8:00 PM", location: "Hauz Khas, Delhi", format: "In-Person", status: "Past", img: "https://images.unsplash.com/photo-1499415479124-43c32433a620?auto=format&fit=crop&w=900&q=80" },
  { id: "7", title: "Bollywood Dance Social", cat: "Dance", date: "28", month: "Feb", day: "Friday", time: "7:30 PM", location: "Powai, Mumbai", format: "In-Person", status: "Past", img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=900&q=80" },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState<EventStatus>("Upcoming");

  const filteredEvents = useMemo(
    () => events.filter((e) => e.status === activeTab),
    [activeTab]
  );

  return (
    <div className="bg-[#fbfaf8] dark:bg-black min-h-screen transition-colors duration-300 overflow-hidden relative">
      
      {/* Background Glows for Dark Mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      {/* =========================================
          HERO SECTION
          ========================================= */}
      <section className="pt-32 md:pt-30 pb-12 px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-500/10 mb-6 border border-orange-200 dark:border-orange-500/20 shadow-sm transition-colors duration-300">
              <CalendarDays className="w-4 h-4 text-[#ff6a3d]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.15em] text-[#c04a18] dark:text-orange-400 uppercase">
                Gatherings
              </span>
            </div>
          </Reveal>
          <RevealText
            as="h1"
            text="Experience the joy of living your passion."
            className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight max-w-[18ch] transition-colors duration-300"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-white/70 max-w-2xl font-medium transition-colors duration-300">
              Hosted periodically — online and in-person — so you can engage at your convenience with a community that shares your energy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================================
          EVENTS SECTION
          ========================================= */}
      <section className="pb-24 px-4 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Custom Sleek Tabs */}
          <div className="flex justify-center md:justify-start mb-12">
            <div className="inline-flex p-1.5 bg-slate-200/50 dark:bg-zinc-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 transition-colors duration-300">
              {(["Upcoming", "Past"] as EventStatus[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 outline-none"
                >
                  {activeTab === tab ? (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm border border-slate-200 dark:border-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  ) : null}
                  <span className={cn(
                    "relative z-10",
                    activeTab === tab 
                      ? "text-slate-900 dark:text-white" 
                      : "text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/80"
                  )}>
                    {tab} Events
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Event Grid with AnimatePresence for smooth filtering */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((e, i) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  key={e.id}
                  className="group flex flex-col h-full rounded-[2rem] overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl dark:shadow-none dark:hover:shadow-[0_0_30px_rgba(255,106,61,0.15)] transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Header */}
                  <div className="aspect-[16/10] overflow-hidden relative m-2 rounded-[1.5rem]">
                    <img
                      src={e.img}
                      alt={e.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                        {e.cat}
                      </span>
                      <span className={cn(
                        "text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border",
                        e.format === "Online" 
                          ? "bg-emerald-500/90 text-white border-emerald-400" 
                          : "bg-orange-500/90 text-white border-orange-400"
                      )}>
                        {e.format}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 md:p-8 flex-grow flex flex-col">
                    <div className="flex gap-5 items-start">
                      
                      {/* Big Date Block */}
                      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-black border border-slate-100 dark:border-white/10 rounded-2xl p-3 w-[72px] shadow-sm transition-colors duration-300">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#ff6a3d] mb-1">
                          {e.month}
                        </span>
                        <span className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">
                          {e.date}
                        </span>
                      </div>

                      {/* Title & Details */}
                      <div className="flex-grow pt-1">
                        <h3 className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight mb-3 transition-colors duration-300">
                          {e.title}
                        </h3>
                        <div className="space-y-2 text-sm font-medium text-slate-600 dark:text-white/60 transition-colors duration-300">
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400 dark:text-white/40" /> 
                            {e.day}, {e.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400 dark:text-white/40" /> 
                            {e.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-8">
                      <Button 
                        className={cn(
                          "w-full h-12 rounded-xl text-base font-bold shadow-none group/btn transition-all duration-300",
                          activeTab === "Upcoming"
                            ? "bg-[#ff6a3d] hover:bg-[#e05b3e] text-white hover:shadow-lg hover:shadow-orange-500/20"
                            : "bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700"
                        )}
                      >
                        {activeTab === "Upcoming" ? "Register Now" : "View Recap"}
                        <ArrowUpRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State (Fallback just in case) */}
          {filteredEvents.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-center py-32"
            >
              <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-slate-400 dark:text-white/30" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No {activeTab.toLowerCase()} events right now.</h3>
              <p className="text-slate-500 dark:text-white/50">Check back later for more exciting gatherings.</p>
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Events;