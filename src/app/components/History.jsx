import {formatTime, formatDate} from '../utils/utils'
export default function History({ timerHistory, clearHistory }) {


const exportHistory = () => {
  const historyJson = JSON.stringify(timerHistory, null, 2);
  const blob = new Blob([historyJson], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "timer-history.json";
  a.click();
  URL.revokeObjectURL(url);
};

  return (
    <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-[#0078D7] dark:text-[#00B294]">
          Timer History
        </h2>
        <div className="flex gap-2">
          <button
            onClick={clearHistory}
            className="bg-[#FF6B6B] hover:bg-[#FF4C4C] px-3 py-1 rounded text-sm font-bold text-white"
          >
            Clear History
          </button>
          <button
            onClick={exportHistory}
            className="bg-[#0078D7] hover:bg-[#005BB5] px-3 py-1 rounded text-sm font-bold text-white"
          >
            Export JSON
          </button>
        </div>
      </div>

      {timerHistory.length === 0 ? (
        <p className="text-gray-400 dark:text-gray-300 text-center py-8">
          No timer history yet.
        </p>
      ) : (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {timerHistory?.map((historyItem, index) => (
            <div key={index} className="py-3">
              <div className="flex justify-between">
                <h3 className="font-medium text-[#0078D7] dark:text-[#00B294]">
                  {historyItem.name}
                </h3>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {historyItem.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Duration: {formatTime(historyItem.duration)}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Completed at: {formatDate(historyItem.completedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}