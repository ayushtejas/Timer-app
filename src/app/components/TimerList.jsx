import { motion } from "framer-motion";
import TimerCard from "./TimerCard";

export default function TimerList({
  timers,
  categories,
  collapsedCategories,
  toggleCategoryCollapse,
  startAllInCategory,
  pauseAllInCategory,
  resetAllInCategory,
  startTimer,
  pauseTimer,
  resetTimer,
  markCompleted,
  deleteTimer,
}) {
  return (
    <div className="w-full max-w-lg">
      {Object.keys(categories).length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No timers yet. Add your first timer above.
        </div>
      )}

      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleCategoryCollapse(category)}
          >
            <h2 className="text-xl font-bold flex items-center text-[#0078D7]">
              <span className="mr-2">{collapsedCategories[category] ? '▶' : '▼'}</span>
              {category}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); startAllInCategory(category); }}
                className="bg-[#00B294] hover:bg-[#008C7A] px-3 py-1 rounded text-sm font-bold text-white"
              >
                Start All
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); pauseAllInCategory(category); }}
                className="bg-[#FF6B6B] hover:bg-[#FF4C4C] px-3 py-1 rounded text-sm font-bold text-white"
              >
                Pause All
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); resetAllInCategory(category); }}
                className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm font-bold text-white"
              >
                Reset All
              </button>
            </div>
          </div>

          {!collapsedCategories[category] && categories[category].map((timer, index) => {
            const actualIndex = timers.findIndex(
              (t) =>
                t.name === timer.name &&
                t.category === timer.category &&
                t.duration === timer.duration
            );

            return (
              <TimerCard
                key={index}
                timer={timer}
                actualIndex={actualIndex}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
                markCompleted={markCompleted}
                deleteTimer={deleteTimer}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}