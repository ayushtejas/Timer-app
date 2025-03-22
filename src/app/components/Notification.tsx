import { motion } from "framer-motion";

export default function Notification({
  showHalfwayAlert,
  halfwayAlertTimer,
  setShowHalfwayAlert,
  showDoneAlert,
  doneAlertTimer,
  setShowDoneAlert,
}) {
  return (
    <>
      {/*Done and Halfway Alert Notification */}
      {showHalfwayAlert && (
        <motion.div
          className="fixed top-4 right-4 bg-[#00B294] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <span>⏰ {halfwayAlertTimer} is halfway done!</span>
          <button
            onClick={() => setShowHalfwayAlert(false)}
            className="hover:bg-[#008C7A] rounded-full p-1"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Done Alert Notification */}
      {showDoneAlert && (
        <motion.div
          className="fixed top-4 right-4 bg-[#0078D7] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <span>🎉 {doneAlertTimer} is done!</span>
          <button
            onClick={() => setShowDoneAlert(false)}
            className="hover:bg-[#005BB5] rounded-full p-1"
          >
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
}