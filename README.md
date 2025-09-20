## Shipping Box App

A small single-page application (SPA) that calculates shipping costs for boxes sent from India to different destinations.  
It was built as a weekend exercise to practice **React + TypeScript + Tailwind CSS + Zustand** and to demonstrate local state management, validation, and component design.

---

## Features

- **Add Box Form**
  - Receiver name
  - Weight (kg) with validation (no negatives)
  - Box colour picker (stored as RGB `(r, g, b)`)
  - Destination country with per-country multiplier
  - Instant estimated cost preview

- **List View**
  - Shows all saved boxes in a table
  - Displays color as an actual swatch (circle) + RGB string
  - Calculated shipping cost per box

- **Navigation**
  - Simple navbar to switch between "Add Box" and "List Boxes"

- **Persistence**
  - Data stored in **localStorage** (so it survives refreshes)

---

## Tech Stack & Why

- **React (with Vite + TypeScript)**  
  Chosen for speed of setup (Vite) and type safety (TS). TypeScript helps avoid runtime errors in form validation and makes component props/contracts clearer.

- **Tailwind CSS**  
  Instead of plain CSS, Tailwind was used for utility-first styling. It speeds up development, keeps styles consistent, and avoids writing lots of custom CSS.  
  _Tradeoff:_ utility classes can look messy in JSX, but for a small project it keeps everything in one place.

- **Zustand (state management)**  
  Chosen over Redux for its minimal API and zero boilerplate. Perfect for a tiny app where global state is just the list of boxes.  
  _Tradeoff:_ Redux has a larger ecosystem and devtools, but felt heavy-handed here.

- **localStorage** 
  Used as a mock backend to persist data between sessions without adding a server.  
  _Tradeoff:_ this means data only lives in the user’s browser — no multi-device sync, no authentication, and no server-side validation.

- **React Router**  
  For simple navigation between form and list views. A single `<Navbar>` component handles routing.

---

## ⚖️ Tradeoffs & Design Decisions

- **Persistence Layer:**  
  Instead of wiring up Node.js/Express or Firebase, I used `localStorage`. Quick to set up, but not scalable. In real-world use, this would be replaced by an API and database.

- **RGB-only Color Format:**  
  The spec asked for colors in `(r, g, b)` format. To meet this, the app converts hex → RGB before storing. This adds a tiny bit of utility code but keeps data consistent.

- **Validation:**  
  Client-side validation prevents negative weights and enforces required fields. There’s no server-side validation, so trust is limited to the browser.

- **Styling Approach:**  
  Tailwind is fast, but long className strings can reduce readability. For a production system I’d likely extract reusable `Button`, `Input`, and `FormField` components.

- **Testing:**  
  Only minimal tests (e.g. cost calculation) were added. In a production scenario, I’d add React Testing Library for component tests and Playwright for e2e flows.

## How to Run

```bash
# clone the repo
git clone <your-repo-url>
cd shipping-box-app

# install dependencies
npm install

# run in dev mode
npm run dev

# build for production
npm run build
```
