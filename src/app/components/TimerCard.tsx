import { motion } from "framer-motion";

export default function TimerCard({
    timer,
    actualIndex,
    startTimer,
    pauseTimer,
    resetTimer,
    markCompleted,
    deleteTimer,
  }) {
    return (
      <motion.div
        className="p-4 border-t border-gray-200"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-[#0078D7]">{timer.name}</h3>
            <p className="text-gray-600">Remaining: {formatTime(timer.remaining)}</p>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={
                  timer.status === "Running"
                    ? "text-green-500"
                    : timer.status === "Completed"
                    ? "text-purple-500"
                    : "text-yellow-500"
                }
              >
                {timer.status}
              </span>
            </p>
            {timer.halfwayAlert && (
              <p className="text-blue-400 text-sm">Halfway alert enabled</p>
            )}
          </div>
          <button
            onClick={() => deleteTimer(actualIndex)}
            className="text-red-500 hover:text-red-400"
          >
            ✕
          </button>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2 mb-3 overflow-hidden">
          <div
            className={`${
              timer.status === "Running"
                ? "bg-green-500"
                : timer.status === "Completed"
                ? "bg-purple-500"
                : "bg-blue-500"
            } h-full transition-all`}
            style={{ width: `${(timer.remaining / timer.duration) * 100}%` }}
          ></div>
        </div>

        <div className="flex flex-wrap gap-2">
          {timer.status !== "Completed" && (
            <>
              {timer.status !== "Running" && (
                <button
                  onClick={() => startTimer(actualIndex)}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold text-sm text-white"
                >
                  Start
                </button>
              )}
              {timer.status === "Running" && (
                <button
                  onClick={() => pauseTimer(actualIndex)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg font-bold text-sm text-white"
                >
                  Pause
                </button>
              )}
              <button
                onClick={() => resetTimer(actualIndex)}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold text-sm text-white"
              >
                Reset
              </button>
              <button
                onClick={() => markCompleted(actualIndex)}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-bold text-sm text-white"
              >
                Complete
              </button>
            </>
          )}
        </div>
      </motion.div>
    );
  }

  // Helper function to format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };