# Service Desk — Front-end Prototype

A front-end-only admin panel for a service business: a staff member logs
in, sees a dashboard overview, and manages a customer list. Built over
three days as a progressively improved prototype. There is no backend,
database, or API — every piece of data is mock data held in the browser.

This README covers the finished app **and** the full build journal: what
was built each day, what tools were used and why, and the problems hit
along the way.

---

## 1. Project overview

**What it is:** a service-business dashboard with three screens — Login,
Dashboard, Customers — wired together with routing, shared state, and a
set of reusable UI components.

**What it isn't:** a production app. There's no server, no real
authentication, and no database. That was intentional at every stage —
the brief for all three days was explicitly "front-end only, mock data,
no backend."

**Why it was built this way:** the requirements arrived in three stages
(Day 1: basic structure, Day 2: interactions and states, Day 3:
finalization and polish), so the app was built the same way — get a
working skeleton first, then layer in behavior, then harden it. That order
matters: skipping straight to polished UI before the data flow works
tends to produce a good-looking screen that doesn't actually do anything,
which is a common trap in front-end-only prototypes.

---

## 2. Technologies used, and why

| Tool                                         | Why this one                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 18**                                 | The brief asked for React by name. It's also the natural fit for a UI with several interdependent pieces of state (logged-in user, customer list, search/filter text, which modal is open) — React's component model keeps each piece owned by whoever actually needs it.                                                                                       |
| **Vite**                                     | A React project needs a dev server and a bundler. Vite was chosen over Create React App because CRA is effectively unmaintained and slow to start; Vite gives instant dev-server startup and fast rebuilds, which matters when iterating quickly over three days.                                                                                               |
| **Tailwind CSS**                             | The brief asked for Tailwind by name. Beyond that: utility classes meant styling could be written directly next to the markup, with no separate CSS files to keep in sync — useful for a small team building fast, and it kept spacing/color/typography consistent by construction (same scale everywhere) rather than by discipline.                           |
| **React Router**                             | Once the app grew past one screen (Day 2 added real Dashboard/Customers navigation), something had to own "what page am I on" and "redirect to login if not authenticated." React Router is the standard tool for that in a React app, and it's what makes the browser's back/forward buttons and refresh behave correctly.                                     |
| **React Context (no Redux/Zustand)**         | The app only has two pieces of shared state: who's logged in, and the customer list. That's a deliberately small amount of state — small enough that a state-management library would be pure overhead. `AuthContext` and `CustomerContext` do the job with a fraction of the code and no extra dependency.                                                     |
| **No component library (MUI, Chakra, etc.)** | The brief wanted specific, simple components (a badge, a modal, a card) reused across the app. A component library brings a lot of styling weight and its own design opinions; for a small, exact spec it was faster and clearer to hand-build `Button`, `Input`, `Select`, `Modal`, `Badge` as thin, obvious wrappers than to learn and fight a library's API. |

---

## 3. Day-by-day build journal

### Day 1 — Basic structure

**Goal:** get the four required screens/pieces on the page and wired
together, even if rough. Login screen, dashboard shell (sidebar + header +
4 summary cards + a table), a customer page (list + search + filter + add
button + details), and mock data instead of a backend.

**How it was approached:**

1. Started with a single `App.jsx` file containing everything — Login,
   Dashboard, Customers, all in one component tree with no routing yet.
   This was deliberate: Day 1's own instructions said "does not need to
   look perfect yet," so the fastest path to "all four pieces visibly
   working" was one file, not a fully separated architecture.
2. Mock data (a handful of customers, a handful of service requests) was
   written as plain JS arrays/objects at the top of that file.
3. Login was a form with basic regex validation on email and a minimum
   password length; "success" just flipped a `loggedIn` boolean in state
   — there was no router yet, so "navigating to the dashboard" meant
   conditionally rendering the dashboard JSX instead of the login JSX.
4. The dashboard's 4 cards and the customer table were built as inline
   JSX blocks reading directly from the mock arrays.

**Problem faced:** none structural yet — Day 1 was intentionally rough.
The main risk at this stage was over-building (adding routing, contexts,
and a component library before anything was proven to work), which was
avoided on purpose.

**What Day 1 delivered:** one `App.jsx` file, functional but not yet
componentized — a working proof that all four required pieces existed and
responded to input.

### Day 2 — Interactions, reusable components, and UI states

**Goal:** turn the rough Day 1 skeleton into something with real
interaction: working search/filter/sort, dynamic (not hardcoded) summary
numbers, a working Add Customer flow, and a proper set of reusable
components — plus loading/empty/error states.

**How it was approached:**

1. **Split the single file into a real project.** This is where the
   `src/pages/`, `src/components/`, `src/context/`, `src/data/` structure
   was introduced, along with Vite, Tailwind, and React Router
   configuration files (`vite.config.js`, `tailwind.config.js`,
   `postcss.config.js`). This was the point where "does not need to look
   perfect" gave way to "needs to hold up to real interaction," which a
   500-line single file makes hard to reason about.
2. **Added React Router.** Three real routes (`/login`, `/dashboard`,
   `/customers`) with a `ProtectedRoute` wrapper that redirects to
   `/login` if nobody's logged in. This replaced the Day 1
   conditional-render approach, and is what made "log out and return to
   login" and "refresh the page and stay logged in" actual, testable
   behaviors instead of side effects of component state.
3. **Introduced `AuthContext` and `CustomerContext`.** Once there were
   multiple pages, the logged-in user and the customer list needed to be
   readable from more than one component (the header needs to know who's
   logged in; both the Dashboard card and the Customers page need the
   same customer list). Context was the natural fit — see the technology
   table above for why not a full state library.
4. **Built the reusable UI layer:** `Badge`, `Modal` first (used by both
   pages), and useful patterns extracted as needed — `SummaryCard`,
   `EmptyState`, `Skeleton` — so the same visual language could be reused
   rather than rewritten per screen.
5. **Made the dashboard numbers dynamic.** Day 1's cards read fixed
   numbers straight from the mock data object. Day 2 replaced that with a
   `utils/dateRange.js` helper that computes Active Services, Pending
   Requests, and Revenue by filtering the mock service requests by date,
   and added the Today/This Week/This Month toggle that feeds into it.
6. **Added search, filter, and sort** to both the customer table and the
   service-requests table, and empty-state messaging for when they match
   nothing.
7. **Added loading states** with a small `useMockLoading` hook that adds
   an artificial short delay, so the loading skeleton actually has
   something to show — there's no real network call to be slow, so the
   delay is simulated on purpose.

**Problems faced:**

- **Where do the "dynamic" dashboard numbers actually come from?** The
  brief said cards must use mock data "dynamically," not be hardcoded.
  The fix was to give every mock service request a `date` and an
  `amount`, and compute all three request-based cards by filtering that
  array by the selected date range — so changing the mock data
  automatically changes the dashboard, and there's nothing to keep in
  sync by hand.
- **Total Customers doesn't fit the "filter by date range" pattern** —
  it's a headcount, not an event count. Decision: keep it as the full
  customer count regardless of the date filter, and only filter the
  other three cards. This is a design choice worth being able to explain,
  not an oversight.
- **State living in two places at once.** Early on, it would have been
  easy to let the Dashboard and the Customers page each keep their own
  copy of the customer list. That would have meant "add a customer" on
  one page not showing up on the other. Fixing this is exactly why
  `CustomerContext` exists — one array, read by both pages, so they can't
  disagree.

**What Day 2 delivered:** a fully split multi-file project, real routing,
working search/filter/sort everywhere, dynamic dashboard numbers, and the
first set of shared UI components — packaged and handed over as
`service-desk.zip`.

### Day 3 — Finalization, edge cases, accessibility, and documentation

**Goal:** treat Day 2's app as a working draft and harden it — check every
user journey end to end, handle the edge cases a real reviewer would try,
clean up the code, make sure it's usable on desktop and tablet, and write
this documentation.

**How it was approached, and what was found:**

1. **Walked every user journey listed in the brief** (login with good and
   bad input, navigate, filter the dashboard, search/filter/sort
   requests, search/filter customers, add a customer, view details, log
   out) and used that walk-through to drive fixes rather than guessing
   what might be broken.
2. **Duplicate email on Add Customer.** Day 2's form validated format but
   not uniqueness. Fixed by passing the existing customer list's emails
   into the form and checking against them (case-insensitively) before
   allowing a save.
3. **Double-submit.** Clicking "Save customer" twice quickly, or pressing
   Enter twice, could in principle queue two saves. Fixed by disabling
   the Save button and showing "Saving…" for the duration of the
   confirmation delay.
4. **A real bug: `undefined` in the customer table.** The Add Customer
   form (correctly, per the Day 2/3 spec) only collects Name, Email,
   Phone, and Status — no "Plan" field. But the customer table has a Plan
   column, inherited from the original mock data, which does have a
   `plan` field. A customer added through the form had no `plan`, so the
   table was literally printing the word "undefined" in that cell. This
   is the kind of bug that only shows up once you actually add a customer
   and look at the resulting row, not by reading the code — fixed with a
   `c.plan || "—"` fallback, and the same pattern was applied everywhere
   else an optional field could be missing (phone, joined date).
5. **Long text breaking layout.** A sufficiently long name or email could
   stretch a table column and either break the layout or force ugly
   wrapping. Fixed by truncating with an ellipsis and a hover tooltip
   (the `title` attribute) so the full value is still available, just not
   at the cost of the table's shape.
6. **Modal edge cases.** Closing without submitting worked already, but
   there was no keyboard way to close (no Escape handling) and no defined
   focus behavior, and a long customer name as the modal title could push
   the close button off the edge. All three fixed in `Modal.jsx`.
7. **Accessibility pass.** Labels were visually next to their inputs but
   not programmatically linked (no `htmlFor`/`id`), so a screen reader
   couldn't associate them; sortable table headers were `onClick` on a
   `<th>`, which isn't reachable by keyboard at all. Both fixed — real
   `<label htmlFor>` pairing with `aria-describedby` error messages, and
   sortable headers rebuilt as real `<button>` elements with `aria-sort`.
8. **Code cleanup.** Checked every file for unused imports (none found by
   the time of the Day 3 pass — Day 2's code was already fairly clean),
   confirmed there were no stray `console.log`s, and removed a leftover
   single-file `App.jsx` from an early Day 1 draft that was still sitting
   in the delivered files.
9. **Verified the build, not just "it looks right in the preview."** Ran
   `npm install && npm run build` after every batch of changes (not just
   once at the end) — this caught issues immediately rather than after a
   large pile of changes, which would have made the responsible change
   harder to isolate.
10. **Wrote this documentation** — README with setup steps, a feature
    list per page, the folder structure and why it's shaped that way, how
    mock data flows through the app, known limitations, and a testing
    checklist covering every journey and edge case above.

**Problems faced:**

- **Distinguishing a real bug from a known limitation.** Not everything
  that "doesn't work" on Day 3 is a bug to fix — no backend, no
  edit/delete, and no real authentication are all explicitly out of scope
  per the brief. Time was spent making sure the fixes targeted actual
  defects (the `undefined` plan cell, the unreachable-by-keyboard sort
  headers) rather than trying to backfill features the brief didn't ask
  for, per its own instruction to prioritize a stable, fully functional
  app over new scope on the final day.
- **Testing "no backend" edge cases without a backend.** Things like
  "duplicate email" normally get caught by a server. Here, the check has
  to be client-side against whatever's currently in `CustomerContext` —
  which is correct for this app's scope, but worth calling out
  explicitly, because it means the "duplicate" check only knows about
  customers currently in memory, not some external source of truth.

**What Day 3 delivered:** the version described in the rest of this
document — hardened, documented, and verified to build cleanly.

---

## 4. Install and run

```bash
npm install
npm run dev       # starts the dev server, prints a local URL (e.g. http://localhost:5173)
```

Other scripts:

```bash
npm run build      # production build into dist/
npm run preview    # preview the production build locally
```

**Logging in:** the login is a mock — enter any syntactically valid email
(e.g. `demo@example.com`) and any non-empty password, then click **Log in**.
There is no real authentication and no server call.

---

## 5. Main pages and features

### Login (`/login`)

- Validates email format and requires a non-empty password.
- Shows inline error messages per field; errors clear once you fix that field and resubmit.
- On success, navigates to `/dashboard` and remembers the session in `localStorage` (survives a refresh).
- Header's **Log out** button clears the session and returns to `/login`.

### Dashboard (`/dashboard`)

- 4 summary cards (**Total Customers**, **Active Services**, **Pending Requests**, **Revenue**), computed from mock data — not hardcoded numbers.
- **Today / This Week / This Month** filter recalculates the 3 request-based cards; Total Customers is always the full headcount.
- **Recent Service Requests** table: search by ID/customer/service, filter by status, and click any column header to sort (ascending/descending).
- Loading skeleton on first render; empty-state message when a search or filter matches nothing.

### Customers (`/customers`)

- Search by name/email and filter by status; both combine correctly, including newly added customers.
- **Add customer** opens a modal form (Name, Email, Phone, Status) with validation:
  - Name and phone required; phone must look like a phone number (7–15 digits, spaces, `+`/`-` allowed).
  - Email required, must be a valid format, and must not already belong to an existing customer (duplicate check, case-insensitive).
  - The Save button disables and shows "Saving…" while submitting, and a checkmark confirms success before the modal closes — this also prevents accidental double-submission.
- Clicking anywhere on a customer row (or the View link) opens their full details in a modal.
- Loading skeleton on first render; empty-state message when a search/filter matches nothing.

### Shared behavior

- Modals close on the × button, clicking the backdrop, or pressing **Escape**, and focus lands on the modal when it opens.
- Long names, emails, or service/customer text truncate with an ellipsis (full text is in a native tooltip on hover) instead of breaking the table layout.
- Missing optional fields (phone, plan) render as `—` instead of `undefined`.
- Sidebar becomes a slide-in panel with a backdrop on small/tablet screens; all tables scroll horizontally on narrow viewports instead of squeezing or overflowing the page.

---

## 6. Folder structure

```
src/
  main.jsx                    entry point — wraps the app in Router + Context providers
  App.jsx                     route definitions
  index.css                   Tailwind directives

  data/
    mockData.js                dummy customers + service requests (single source of truth)

  utils/
    dateRange.js                date-range filtering and summary-stat calculations

  hooks/
    useMockLoading.js           simulated loading delay, used by both pages

  context/
    AuthContext.jsx             login/logout state, persisted in localStorage
    CustomerContext.jsx         shared customer list + addCustomer (with duplicate-safe add)

  pages/
    Login.jsx
    Dashboard.jsx
    Customers.jsx

  components/
    auth/        LoginForm, ProtectedRoute
    layout/      DashboardLayout, Sidebar, Header
    dashboard/   SummaryCard, DateRangeFilter, RecentRequestsTable
    customers/   CustomerFilters, CustomerTable, CustomerDetails, AddCustomerForm
    ui/          Button, Input, Select, Badge, Modal, EmptyState, Skeleton, SortableHeader
```

**Why it's shaped this way:** `data/` holds the only mock data in the
app; `utils/` and `hooks/` hold logic with no UI; `components/ui/` holds
generic pieces with no business logic (they don't know what a "customer"
is — `Badge` just renders a status string, `Modal` just renders whatever
children it's given); `components/dashboard` and `components/customers`
hold pieces specific to those features; `pages/` wire feature components
together and own page-level state (search text, filters, which modal is
open). This separation is what let Day 3's fixes stay small and
localized — fixing the `plan` fallback only touched `CustomerTable.jsx`
and `CustomerDetails.jsx`, not the page or the context.

---

## 7. How mock data is managed

- All seed data lives in **`src/data/mockData.js`** — 7 customers and 11
  service requests, nothing else in the app hardcodes a customer or request.
- Dates in the mock data are generated relative to "today" (`daysAgo(n)` in
  `utils/dateRange.js`), so the Today/This Week/This Month filters always
  have something to show, no matter what day you run the app.
- **`CustomerContext`** loads that seed list into React state once, and is
  the only place customers are added (`addCustomer`). Both the Dashboard's
  "Total Customers" card and the Customers page read from this same
  context, so they can never disagree.
- Adding a customer assigns it a new `id` (`Date.now()`) and a `joined`
  date (today), and prepends it to the in-memory list. Nothing is written
  to disk or a server — a hard refresh resets the list back to the seed
  data (the logged-in session is the only thing persisted, via
  `localStorage`).
- Service requests are read-only in this build (no add/edit UI was in
  scope), so they are rendered directly from `mockData.js` through the same
  filtering/sorting logic in `RecentRequestsTable`.

---

## 8. Known limitations

- **No persistence for data changes.** Added customers live only in memory
  for the current tab; refreshing the page resets them to the seed list.
  Only the logged-in session survives a refresh.
- **No edit or delete** for customers or service requests — only add and
  view.
- **No real authentication.** Any syntactically valid email + non-empty
  password logs in; there's no password check, no user database, no
  session expiry.
- **Service requests can't be created** from the UI in this build; they're
  fixed mock rows.
- **Single simulated user.** There's no multi-user or role-based access —
  "logging in" just means storing the typed email.
- **No server-side or URL-shareable filters.** Search/filter/sort state
  resets if you navigate away and back, or reload.
- **Duplicate-email check is only as good as what's in memory.** It
  checks against the customers currently loaded in `CustomerContext`,
  which is correct for a front-end-only app but wouldn't catch a
  duplicate against some other, external system.

---

## 9. Testing checklist

Use this to walk through the app before sign-off. All items below were
verified against this build.

**Login**

- [ ] Submitting with an empty email shows "Email is required."
- [ ] Submitting with a malformed email (e.g. `abc`, `abc@`) shows "Enter a valid email address."
- [ ] Submitting with an empty password shows "Password is required."
- [ ] Submitting a valid email + any non-empty password navigates to `/dashboard`.
- [ ] Refreshing the page while logged in keeps you on the dashboard (session persists).
- [ ] Visiting `/customers` or `/dashboard` directly while logged out redirects to `/login`.

**Navigation**

- [ ] Sidebar links move between Dashboard and Customers without a full page reload.
- [ ] The active page is highlighted in the sidebar.
- [ ] On a narrow/tablet viewport, the ☰ button opens the sidebar as an overlay with a backdrop; tapping the backdrop or a link closes it.

**Dashboard**

- [ ] All 4 summary cards show numbers on load (after the brief loading skeleton).
- [ ] Switching Today / This Week / This Month changes Active Services, Pending Requests, and Revenue; Total Customers stays constant.
- [ ] Typing in the requests search box filters rows by ID, customer, or service.
- [ ] Changing the status dropdown filters rows correctly, and combines correctly with an active search term.
- [ ] Clicking a column header sorts ascending, clicking again reverses to descending (arrow indicator updates).
- [ ] A search/filter combination with no matches shows an empty-state message, not a blank table or a crash.

**Customers**

- [ ] Typing in the search box filters by name or email (case-insensitive).
- [ ] The status filter works alone and combined with search.
- [ ] "Add customer" opens a modal; clicking the backdrop, the × button, or pressing Escape closes it without saving.
- [ ] Submitting the Add Customer form with all fields empty shows all four validation messages.
- [ ] An invalid email format is rejected with a message.
- [ ] An email matching an existing customer (any case) is rejected with "A customer with this email already exists."
- [ ] An invalid phone (letters, too short) is rejected with a message.
- [ ] A valid submission shows "Saving…" then a success checkmark, then the modal closes.
- [ ] Clicking Save multiple times quickly does not add duplicate customers (button disables while saving).
- [ ] The new customer appears at the top of the list immediately, and is included in search/filter results.
- [ ] The Dashboard's Total Customers count increases after adding a customer.
- [ ] Clicking anywhere on a customer row (not just "View") opens their details modal with correct info.
- [ ] A customer with no phone shows "—" instead of a blank or "undefined".
- [ ] A very long name or email in the table truncates with "…" and doesn't widen or break the table; hovering shows the full value as a tooltip.

**Logout**

- [ ] Log out returns to `/login` and clears the session (refreshing `/dashboard` afterward redirects to login).

**Responsive**

- [ ] At tablet width (~768–1024px) the dashboard cards reflow to 2 columns and the sidebar still adapts.
- [ ] At narrow widths, tables scroll horizontally inside their own container rather than pushing the page layout sideways.

**General**

- [ ] No errors or warnings appear in the browser console during normal use.
- [ ] `npm run build` completes without errors.

---

## 10. Known issues list

None currently blocking. Items in section 8 ("Known limitations") are
scoped-out by design for this prototype (no backend, no edit/delete, no
real auth) rather than defects — flagged here for visibility ahead of
review, per the brief's own instruction to prioritize a stable, fully
functional app over adding new scope on the final day.
