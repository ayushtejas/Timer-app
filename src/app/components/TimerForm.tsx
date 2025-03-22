export default function TimerForm({ newTimer, setNewTimer, addTimer }) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#0078D7]">
          Add New Timer
        </h2>
        <input
          type="text"
          placeholder="Timer Name"
          value={newTimer.name}
          onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
          className="p-3 rounded-lg bg-gray-100 text-gray-700 w-full mb-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0078D7]"
        />
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={newTimer.duration}
          onChange={(e) => setNewTimer({ ...newTimer, duration: Number(e.target.value) })}
          className="p-3 rounded-lg bg-gray-100 text-gray-700 w-full mb-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0078D7]"
        />
        <input
          type="text"
          placeholder="Category"
          value={newTimer.category}
          onChange={(e) => setNewTimer({ ...newTimer, category: e.target.value })}
          className="p-3 rounded-lg bg-gray-100 text-gray-700 w-full mb-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0078D7]"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="halfwayAlert"
            checked={newTimer.halfwayAlert}
            onChange={(e) => setNewTimer({ ...newTimer, halfwayAlert: e.target.checked })}
            className="mr-2 h-5 w-5 accent-[#0078D7]"
          />
          <label htmlFor="halfwayAlert" className="text-gray-700">
            Enable halfway alert
          </label>
        </div>
        <button
          onClick={addTimer}
          className="bg-[#0078D7] hover:bg-[#005BB5] p-3 rounded-lg w-full font-bold text-white transition-all"
        >
          Add Timer
        </button>
      </div>
    );
  }