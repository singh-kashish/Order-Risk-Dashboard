# 📊 Order Risk Dashboard

A modern, production-ready responsive dashboard to analyze customer order risk using **React, TanStack Table, TanStack Router, and React Query**.

---

## 🚀 Features

### 📦 Data Layer

* Fetch orders using **React Query**
* Data transformation via `transformOrders`
* Optimistic updates for instant UI feedback

---

### 📊 Risk Calculation

```
risk_score = (cod_orders / total_orders) * 100
```

### 🚦 Risk Levels

| Score | Status         |
| ----- | -------------- |
| > 70  | 🔴 High Risk   |
| 40–70 | 🟡 Medium Risk |
| < 40  | 🟢 Safe        |

---

### 🧩 UI Features

* Sortable & paginated table (TanStack Table)
* Global search + filters (city, risk)
* URL-based filters (shareable links)
* Reset filters (fully synced UI)
* Empty states & loading skeletons
* Order details drawer
* Status badges with visual indicators

---

### ⚡ Performance

* Memoized filtering (`useMemo`)
* Optimistic UI updates
* Server-state caching (React Query)

---

## 🏗️ Architecture Overview

The application follows a **feature-based modular architecture**:

* **Components Layer**

  * Reusable UI components (table, cards, drawer)
* **Hooks Layer**

  * Encapsulates data fetching & mutations (`useOrders`, `useUpdateOrder`)
* **Utils Layer**

  * Business logic (risk calculation, data transformation)
* **Routing Layer**

  * File-based routing using TanStack Router with typed search params
* **State Management**

  * Server state → React Query
  * UI state → React (useState, useMemo)

### Data Flow

```
API → React Query → transformOrders → UI Components
```

### Key Design Principles

* Separation of concerns
* Reusable components
* Type safety across layers
* Minimal prop drilling

---

## 🛠 Tech Stack

* React + TypeScript
* TanStack Table
* TanStack Router
* React Query
* Tailwind CSS
* ShadCN UI

---

## 📂 Project Structure

```
src/features/order-risk
 ├── components/
 │    ├── OrdersTable.tsx
 │    ├── OrderDetailsDrawer.tsx
 │    ├── SummaryCards.tsx
 │    ├── EmptyState.tsx
 │    ├── OrdersTableSkeleton.tsx
 │    ├── RiskDistributionChart.tsx
 │    ├── SummarySkeleton.tsx
 │
 ├── hooks/
 │    ├── useOrders.ts
 │    └── useUpdateOrder.ts
 │
 ├── utils/
 │    ├── transform.ts
 │    └── risk.ts
 │
 ├── routes/_authenticated/
 │    └── order-risk/
 │        └── index.tsx
 │
 └── types/
      └── order.ts
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Start development server

```
npm run dev
```

> App runs at: http://localhost:5173

---

## 🔗 URL Filters Example

```
/order-risk?city=Mumbai&risk=High%20Risk
```

✔ Filters auto-applied on load
✔ Shareable dashboard state

---

## 🧠 Assumptions Made

* Order data includes:

  * total orders
  * COD orders
* Risk is calculated **per customer**, not per individual order
* Dataset size is moderate → client-side filtering is sufficient
* Backend supports update operations (PUT/PATCH)
* No authentication/authorization required for this scope

---

## 🧪 Edge Case Handling

* Empty dataset → dedicated empty state
* No filter results → contextual empty state
* API latency → loading skeletons
* Failed updates → rollback via React Query
* Filter reset → UI + state synced correctly

---

## 🧠 Key Engineering Decisions

### Why React Query?

* Handles caching, retries, background refetching
* Separates server state from UI state

---

### Why TanStack Table?

* Headless architecture for full UI control
* Built-in sorting, filtering, pagination

---

### Why URL-based filters?

* Enables shareable and persistent UI state
* Improves UX for dashboards

---

### Why optimistic updates?

* Immediate UI feedback
* Improves perceived performance

---

## ✨ Future Improvements

* Server-side pagination & filtering
* Debounced search input
* Data visualization (charts)
* Export to CSV
* Role-based access control

---

## 📸 Screenshots

<img width="2936" height="1652" alt="image" src="https://github.com/user-attachments/assets/fe1f7d7c-0d25-4ff2-a709-0c0384425d28" /> <img width="2910" height="1650" alt="image" src="https://github.com/user-attachments/assets/b298a8d1-7f35-40e5-8082-c8f91c23b139" />

---

## 🧑‍💻 Author

Kashish Singh
