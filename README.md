# 🔐 Vulnerability Insights Dashboard

A fast, modern frontend application built with **Vite**, **React**, and **Chakra UI**, designed to visualize and interact with vulnerability data in real time.

---

## 🚀 Overview

This application empowers security teams and developers to explore, filter, compare, and export software vulnerability data. Through a performant and modular architecture, it delivers a responsive and customizable experience.

Whether you’re scanning Docker images or auditing dependencies, this dashboard is built to provide clear, actionable insights.

---

## 🧱 Project Structure

Here's a quick look at the `src/` layout:
```

src
 ┣ app
 ┃ ┣ AppLayout.tsx
 ┃ ┣ errorBoundary.tsx
 ┃ ┣ hooks.ts
 ┃ ┣ providers.tsx
 ┃ ┣ router.tsx
 ┃ ┣ store.ts
 ┃ ┗ theme.ts
 ┣ assets
 ┃ ┗ react.svg
 ┣ components
 ┃ ┣ charts
 ┃ ┃ ┣ CorrelationHeatmap.tsx
 ┃ ┃ ┣ KaiStatusPieChart.tsx
 ┃ ┃ ┣ RiskFactorChart.tsx
 ┃ ┃ ┣ SeverityBarChart.tsx
 ┃ ┃ ┗ VulnerabilityTrend.tsx
 ┃ ┗ ui
 ┃ ┃ ┣ color-mode.tsx
 ┃ ┃ ┣ provider.tsx
 ┃ ┃ ┣ sidebar.tsx
 ┃ ┃ ┣ toaster.tsx
 ┃ ┃ ┣ tooltip.tsx
 ┃ ┃ ┗ topbar.tsx
 ┣ features
 ┃ ┣ dashboard
 ┃ ┃ ┣ dashboardSlice.ts
 ┃ ┃ ┣ hooks.ts
 ┃ ┃ ┗ types.ts
 ┃ ┗ vulnerabilities
 ┃ ┃ ┣ __mocks__
 ┃ ┃ ┃ ┣ mock_flattened_table_data.json
 ┃ ┃ ┃ ┗ mock_vulnerability_data.json
 ┃ ┃ ┣ __tests__
 ┃ ┃ ┃ ┣ vulnerabilitiesTable.test.ts
 ┃ ┃ ┃ ┗ vulnerabilitiesUtils.test.ts
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ CompareWindow.tsx
 ┃ ┃ ┃ ┣ VulnerabilityExport.tsx
 ┃ ┃ ┃ ┣ VulnerabilityTable.tsx
 ┃ ┃ ┃ ┗ VulnerabilityTableModal.tsx
 ┃ ┃ ┣ hooks.ts
 ┃ ┃ ┣ types.ts
 ┃ ┃ ┣ utils.ts
 ┃ ┃ ┗ vulnerabilitySlice.ts
 ┣ pages
 ┃ ┣ Dashboard.tsx
 ┃ ┣ Vulnerabilities.tsx
 ┃ ┗ VulnerabilityDetail.tsx
 ┣ services
 ┃ ┗ vulnerabilities.ts
 ┣ App.css
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts
```

---

## 🧪 Tech Stack

- ⚡ **[Vite](https://vitejs.dev/)** – Next-gen frontend tooling
- ⚛️ **[React](https://reactjs.org/)** – UI library
- 💅 **[Chakra UI](https://chakra-ui.com/)** – Accessible component library with built-in dark mode support
- 📊 **TanStack Table + Virtualizer** – Efficient table rendering with filtering, sorting, and virtualization
- 📦 **Redux Toolkit** – State management
- 🧪 **Vitest + React Testing Library** – Testing framework
- 📈 **D3.js** (via custom charts) – Data visualizations

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-org/vulnerability-dashboard.git
cd vulnerability-dashboard
