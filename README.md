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

Risk score is calculated using:

```
risk_score = (cod_orders / total_orders) * 100
```

### 🚦 Risk Levels

| Score   | Status         |
| ------- | -------------- |
| > 70    | 🔴 High Risk   |
| 40 - 70 | 🟡 Medium Risk |
| < 40    | 🟢 Safe        |

---

### 🧩 UI Features

* Sortable & paginated table (TanStack Table)
* Global search + filters (city, risk)
* URL-based filters (shareable links)
* Reset filters (fully synced UI)
* Empty states & loading skeletons
* Order details drawer
* Status badges with colors

---

### ⚡ Performance

* Memoized filtering
* Optimistic UI updates
* Server-state caching (React Query)

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
 │    └── EmptyState.tsx
 │    ├── OrdersTableSkeleton.tsx
 │    ├── RiskDistributionChart.tsx
 │    ├── SummaryCards.tsx
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
 │    └── order-risk
 │        └── index.tsx
 │
 └── types/
      └── order.ts
```

---

## ⚙️ Setup Instructions
```
npm install
npm run dev
```
---

## 🔗 URL Filters Example

```
/order-risk?city=Mumbai&risk=High%20Risk
```

✔ Filters auto-applied on load
✔ Fully shareable state

---

## 🧠 Key Engineering Decisions

### Why React Query?

* Handles caching, retries, and background updates
* Simplifies async state management

---

### Why TanStack Table?

* Headless + highly customizable
* Supports sorting, filtering, pagination

---

### Why URL-based filters?

* Shareable dashboard state
* Better UX for real-world apps

---

### Why optimistic updates?

* Instant UI response
* Better perceived performance

---

## ✨ Future Improvements

* Server-side pagination
* Debounced search
* Role-based access
* Charts (Recharts)
* Export to CSV

---

## 📸 Screenshots
<img width="2936" height="1652" alt="image" src="https://github.com/user-attachments/assets/fe1f7d7c-0d25-4ff2-a709-0c0384425d28" />

<img width="2910" height="1650" alt="image" src="https://github.com/user-attachments/assets/b298a8d1-7f35-40e5-8082-c8f91c23b139" />



---

## 🧑‍💻 Author

Kashish Singh
