'use client';
import { useState, useEffect } from "react";
import TimerForm from "./components/TimerForm";
import TimerList from "./components/TimerList";
import History from "./components/History";
import Notification from "./components/Notification";

export default function Home() {
  const [timers, setTimers] = useState([]);
  const [newTimer, setNewTimer] = useState({
    name: "",
    duration: '',
    category: "",
    halfwayAlert: false,
  });
  const [categories, setCategories] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [completedTimer, setCompletedTimer] = useState(null);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [timerHistory, setTimerHistory] = useState([]);
  const [showHalfwayAlert, setShowHalfwayAlert] = useState(false);
  const [halfwayAlertTimer, setHalfwayAlertTimer] = useState(null);
  const [activeTab, setActiveTab] = useState("timers");
  const [showDoneAlert, setShowDoneAlert] = useState(false);
const [doneAlertTimer, setDoneAlertTimer] = useState(null);
const [darkMode, setDarkMode] = useState(true);


  // Load data from localStorage on initial render
  useEffect(() => {
    const storedTimers = JSON.parse(localStorage.getItem("timers")) || [];
    const storedHistory = JSON.parse(localStorage.getItem("timerHistory")) || [];
    const storedCollapsed = JSON.parse(localStorage.getItem("collapsedCategories")) || {};
    const savedDarkMode = localStorage.getItem("darkMode") === "true";

    setTimers(storedTimers);
    setTimerHistory(storedHistory);
    setCollapsedCategories(storedCollapsed);
    setDarkMode(savedDarkMode);

  }, []);

  // Auto-close halfway alert
useEffect(() => {
  if (showHalfwayAlert) {
    const timeout = setTimeout(() => {
      setShowHalfwayAlert(false);
    }, 3000); // Close after 3 seconds
    return () => clearTimeout(timeout);
  }
}, [showHalfwayAlert]);

// Auto-close done alert
useEffect(() => {
  if (showDoneAlert) {
    const timeout = setTimeout(() => {
      setShowDoneAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }
}, [showDoneAlert]);

useEffect(() => {
  const interval = setInterval(() => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.status === "Running") {
          const newRemaining = Math.max(0, timer.remaining - 1);

          if (
            timer.halfwayAlert &&
            Math.ceil(timer.duration / 2) === newRemaining &&
            newRemaining > 0
          ) {
            setHalfwayAlertTimer(timer.name);
            setShowHalfwayAlert(true);
          }

          if (newRemaining === 0 && timer.remaining !== 0) {
            setDoneAlertTimer(timer.name);
            setShowDoneAlert(true);

            const newHistoryItem = {
              name: timer.name,
              category: timer.category,
              completedAt: new Date().toISOString(),
              duration: timer.duration,
            };

            setTimerHistory((prev) => {
              const isAlreadyInHistory = prev.some(
                (item) =>
                  item.name === timer.name &&
                  item.category === timer.category &&
                  item.duration === timer.duration
              );

              if (!isAlreadyInHistory) {

                const updatedHistory = [...prev, newHistoryItem];
                localStorage.setItem("timerHistory", JSON.stringify(updatedHistory));
                return updatedHistory;
              }

              return prev;
            });

            return { ...timer, remaining: newRemaining, status: "Completed" };
          }

          return { ...timer, remaining: newRemaining };
        }
        return timer;
      })
    );
  }, 1000);

  return () => clearInterval(interval);
}, [timers]);

  // Saving timers to localStorage for history
  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
    groupTimersByCategory();
  }, [timers]);

  // Group timers by category
  const groupTimersByCategory = () => {
    const grouped = timers.reduce((acc, timer) => {
      acc[timer.category] = acc[timer.category] || [];
      acc[timer.category].push(timer);
      return acc;
    }, {});
    setCategories(grouped);
  };

  // function to add a new timer
  const addTimer = () => {
    if (!newTimer.name || newTimer.duration <= 0 || !newTimer.category) {
      alert("Please fill all required fields");
      return;
    }

    setTimers([...timers, {
      ...newTimer,
      remaining: newTimer.duration,
      status: "Paused",
    }]);
    setNewTimer({ name: "", duration: 0, category: "", halfwayAlert: false });
  };

  const startTimer = (index) => {
    setTimers((prev) =>
      prev.map((timer, i) =>
        i === index ? { ...timer, status: "Running" } : timer
      )
    );
  };

  const pauseTimer = (index) => {
    setTimers((prev) =>
      prev.map((timer, i) =>
        i === index ? { ...timer, status: "Paused" } : timer
      )
    );
  };

  const resetTimer = (index) => {
    setTimers((prev) =>
      prev.map((timer, i) =>
        i === index ? { ...timer, remaining: timer.duration, status: "Paused" } : timer
      )
    );
  };
// function to mark completed
const markCompleted = (index) => {
  const completedTimerName = timers[index].name;
  setCompletedTimer(completedTimerName);
  setShowModal(true);

  const newHistoryItem = {
    name: timers[index].name,
    category: timers[index].category,
    completedAt: new Date().toISOString(),
    duration: timers[index].duration,
  };

  setTimerHistory((prev) => {
    // Check if the timer is already in history
    const isAlreadyInHistory = prev.some(
      (item) =>
        item.name === timers[index].name &&
        item.category === timers[index].category &&
        item.duration === timers[index].duration
    );

    if (!isAlreadyInHistory) {
      console.log(`Adding ${timers[index].name} to history`); // Debug log
      const updatedHistory = [...prev, newHistoryItem];
      localStorage.setItem("timerHistory", JSON.stringify(updatedHistory));
      return updatedHistory;
    }

    return prev;
  });

  setTimers((prev) =>
    prev.map((timer, i) =>
      i === index ? { ...timer, status: "Completed" } : timer
    )
  );
};

  // Bulk actions
  const startAllInCategory = (category) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.category === category && timer.status !== "Completed"
          ? { ...timer, status: "Running" }
          : timer
      )
    );
  };

  const pauseAllInCategory = (category) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.category === category && timer.status === "Running"
          ? { ...timer, status: "Paused" }
          : timer
      )
    );
  };

  const resetAllInCategory = (category) => {
    setTimers((prev) =>
      prev.map((timer) =>
        timer.category === category
          ? { ...timer, remaining: timer.duration, status: "Paused" }
          : timer
      )
    );
  };

  const deleteTimer = (index) => {
    if (confirm("Are you sure you want to delete this timer?")) {
      setTimers((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      setTimerHistory([]);
      localStorage.setItem("timerHistory", JSON.stringify([]));
    }
  };

  const toggleCategoryCollapse = (category) => {
    setCollapsedCategories((prev) => {
      const updated = { ...prev, [category]: !prev[category] };
      localStorage.setItem("collapsedCategories", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };


  return (
    <div className={`bg-white ${darkMode ? "dark:bg-gray-800" : ""} min-h-screen p-4 md:p-10 bg-gray-50 flex flex-col items-center font-sans`}>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0078D7]">
        Healthflex Timer App
      </h1>
      <button
    onClick={toggleDarkMode}
    className="fixed top-4 right-4 p-2 rounded-full bg-[#0078D7] text-white hover:bg-[#005BB5] transition-all"
  >
    {darkMode ? "☀️" : "🌙"}
  </button>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg p-1 mb-6 flex shadow-sm">
        <button
          onClick={() => setActiveTab("timers")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "timers"
              ? "bg-[#0078D7] text-white"
              : "text-gray-600 hover:text-[#0078D7]"
          }`}
        >
          Timers
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "history"
              ? "bg-[#0078D7] text-white"
              : "text-gray-600 hover:text-[#0078D7]"
          }`}
        >
          History
        </button>
      </div>

      {activeTab === "timers" && (
        <>
          <TimerForm
            newTimer={newTimer}
            setNewTimer={setNewTimer}
            addTimer={addTimer}
          />
          <TimerList
            timers={timers}
            categories={categories}
            collapsedCategories={collapsedCategories}
            toggleCategoryCollapse={toggleCategoryCollapse}
            startAllInCategory={startAllInCategory}
            pauseAllInCategory={pauseAllInCategory}
            resetAllInCategory={resetAllInCategory}
            startTimer={startTimer}
            pauseTimer={pauseTimer}
            resetTimer={resetTimer}
            markCompleted={markCompleted}
            deleteTimer={deleteTimer}
          />
        </>
      )}

      {activeTab === "history" && (
        <History timerHistory={timerHistory} clearHistory={clearHistory} />
      )}

      {/* Notification for Done and Halfway Alert */}
      <Notification
  showHalfwayAlert={showHalfwayAlert}
  halfwayAlertTimer={halfwayAlertTimer}
  setShowHalfwayAlert={setShowHalfwayAlert}
  showDoneAlert={showDoneAlert}
  doneAlertTimer={doneAlertTimer}
  setShowDoneAlert={setShowDoneAlert}
/>
    </div>
  );
}