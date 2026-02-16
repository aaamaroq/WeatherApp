import { iconUrlFromCode } from "../service/WeatherService";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ForecastProps {
  itemsToday: any;
  itemsWeed: any;
}

function Forecast({ itemsToday, itemsWeed }: ForecastProps) {
  const [activeTab, setActiveTab] = useState("today");

  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const items = activeTab === "today" ? itemsToday : itemsWeed;

  return (
    <div className="glass-card p-6 flex flex-col h-full text-white">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex gap-4">
          <button
            onClick={() => toggleTab("today")}
            className={`text-sm uppercase tracking-widest transition-all ${activeTab === "today" ? "font-bold text-white scale-105" : "text-white/40 hover:text-white/70"
              }`}
          >
            Hourly
          </button>
          <button
            onClick={() => toggleTab("weed")}
            className={`text-sm uppercase tracking-widest transition-all ${activeTab === "weed" ? "font-bold text-white scale-105" : "text-white/40 hover:text-white/70"
              }`}
          >
            Daily
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center justify-between min-w-max gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between w-full gap-6"
            >
              {items.map((item: any, index: number) => (
                <motion.div
                  key={item.title + index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center justify-center min-w-[70px]"
                >
                  <p className="text-xs font-light text-white/60 mb-1">{item.title}</p>
                  <img
                    src={iconUrlFromCode(item.icon)}
                    className="w-12 h-12 drop-shadow-sm"
                    alt=""
                  />
                  <p className="text-lg font-semibold mt-1">{`${item.temp.toFixed()}º`}</p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
