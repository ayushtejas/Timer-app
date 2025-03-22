# Next.js Timer App

## Overview

The **Next.js Timer App** is a modern, feature-rich web application built with **Next.js** and **Framer Motion** for animations. It allows users to create, manage, and interact with multiple customizable timers. The app provides a sleek and responsive user experience with dynamic progress visualization and interactive controls.

## Features

### 1. Timer Creation

- Users can create new timers by specifying:
  - **Name** (e.g., "Workout Timer").
  - **Duration** (in seconds).
  - **Category** (e.g., "Workout," "Study").
- The timers persist using `localStorage`.

### 2. Timer List with Grouping

- Timers are grouped by category in expandable/collapsible sections.
- Each timer displays:
  - **Name**
  - **Remaining Time**
  - **Status** (Running, Paused, or Completed)

### 3. Timer Management

- Users can control each timer with:
  - **Start**: Begins the countdown.
  - **Pause**: Pauses the countdown.
  - **Reset**: Resets to original duration.
  - **Complete**: Marks a timer as completed.

### 4. Progress Visualization

- A progress bar dynamically updates as time elapses.
- Visual representation of time remaining.

### 5. Bulk Actions

- Category-level buttons allow users to:
  - Start all timers in a category.
  - Pause all timers in a category.
  - Reset all timers in a category.

### 6. User Feedback

- When a timer completes:
  - A **modal** appears with a congratulatory message and timer name.

## Assumptions

- Users will manually enter categories when creating timers (no predefined categories).
- Timers will persist using `localStorage`, meaning data will be lost if the browser cache is cleared.
- The app will not support background execution when the tab is closed.
- There is no authentication or user management; all timers are available to a single user session.
- The progress bar updates dynamically but does not support real-time push notifications.
- Timer completion messages are displayed through a modal instead of system notifications.

## Installation & Setup

### Prerequisites

Ensure you have **Node.js** and **npm** installed.

### Steps to Install & Run

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ayushtejas/Timer-app.git
   cd nextjs-timer-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

4. **Open the app in your browser:** Visit `http://localhost:3000`

## Technologies Used

- **Next.js** – Server-side rendering and React-based frontend.
- **Framer Motion** – Smooth animations and transitions.
- **LocalStorage** – Persistence for timers.
- **Tailwind CSS** – Modern and responsive UI styling.

## Future Enhancements

- Export timer history as a JSON file.
- Dark mode support.
- Filtering timers by category.

## License

This project is open-source and available under the **MIT License**.

## Contributions

Feel free to fork the repository and submit pull requests to enhance the project!

