# SolarSense AI Application

[![React](https://img.shields.io/badge/react-19.2-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-7.3-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-4.1-38B2AC.svg)](https://tailwindcss.com/)

**SolarSense AI** is a modern web application designed to help businesses evaluate whether switching to solar energy is viable. The platform collects business energy data, profiles equipment usage, and connects with AI-powered backends to generate precise feasibility reports and calculate potential ROI. This empowers businesses, particularly in areas with an unreliable power supply, to make informed and cost-effective energy transitions.

---

## 🚀 Key Features

- **Intuitive Business Profiling Flow**: A seamless UI journey gathering context via specific components (e.g. `BusinessContextScreen`, `BusinessLocationScreen`, `EquipmentProfilingScreen`).
- **Granular Equipment Analysis**: Captures specific hourly energy consumption variables localized by equipment type (Freezers, Cold Rooms, Ice Machines, Lighting).
- **AI-Powered Viability Assessment**: Uses robust AI backend models to calculate energy requirements, savings thresholds, and system sizing.
- **Dynamic Visualizations Data**: Employs scalable, mobile-friendly Recharts canvas graphs out-of-the-box displaying cost vs. consumption metrics on the final Results Dashboard.
- **Global Currency Mappings**: Auto-formats metrics effectively across borders dynamically utilizing state-aware currency utility logic.

---

## 🛠 Tech Stack

The frontend is a lightweight Single Page Application (SPA), utilizing an optimized React toolchain:
- **Core Framework**: React 19 (Hooks, Functional Components)
- **Scaffolding/Build Tool**: Vite (Lightning fast HMR & optimized production bundles)
- **Styling**: Tailwind CSS v4 (Rapid UI development via utility-first CSS integration)
- **Routing**: React Router DOM (Dynamic screen navigation mapping)
- **Network Requests**: Axios (Secure HTTP handling inside `src/services/api.js`)
- **Visuals**: Recharts (Rich interactive charting algorithms)

---

## 📂 Project Structure Overview

```text
src/
├── components/   # Highly reusable building blocks (Buttons, Cards, Inputs, Tooltips)
├── pages/        # High-order components orchestrating assessment routing flow 
├── services/     # API handler logic managing external server handshakes
├── utils/        # Extracted pure functions (e.g. formatters, payload builders)
├── hooks/        # Extracted global lifecycle hooks
├── App.jsx       # The main orchestration container and global state registry
```

---


## 🧪 Testing Strategy
The application logic emphasizes component integrity validation prioritizing robust unit, integration APIs mocking, and cross-browser End-To-End (E2E) UI testing targeting responsive boundary alignments across varying viewport scales.
