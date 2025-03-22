export default function History({ timerHistory, clearHistory }) {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    return (
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#0078D7]">Timer History</h2>
          {timerHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="bg-[#FF6B6B] hover:bg-[#FF4C4C] px-3 py-1 rounded text-sm font-bold text-white"
            >
              Clear History
            </button>
          )}
        </div>

        {timerHistory.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No timer history yet.</p>
        ) : (
          <div className="divide-y divide-gray-200">
            {timerHistory.map((historyItem, index) => (
              <div key={index} className="py-3">
                <div className="flex justify-between">
                  <h3 className="font-medium text-[#0078D7]">{historyItem.name}</h3>
                  <span className="text-gray-600 text-sm">{historyItem.category}</span>
                </div>
                <p className="text-gray-600 text-sm">Duration: {formatTime(historyItem.duration)}</p>
                <p className="text-gray-600 text-sm">Completed at: {formatDate(historyItem.completedAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
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