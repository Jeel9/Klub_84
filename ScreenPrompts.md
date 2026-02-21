# 🎨 Screen-Wise AI Prompts

---

src/
 ├── app/
 │    ├── layout/
 │    │    ├── Sidebar.tsx
 │    │    └── Topbar.tsx
 │    ├── routes.tsx
 │    └── AppLayout.tsx
 │
 ├── modules/
 │    └── members/
 │         ├── pages/
 │         │    └── MembersPage.tsx
 │         ├── components/
 │         │    ├── MemberTable.tsx
 │         │    ├── MemberFormDrawer.tsx
 │         │    └── MemberFilters.tsx
 │         ├── hooks/
 │         │    └── useMembers.ts
 │         └── types.ts
 │
 ├── shared/
 │    ├── components/
 │    │    ├── Button.tsx
 │    │    ├── Input.tsx
 │    │    ├── Select.tsx
 │    │    ├── Badge.tsx
 │    │    ├── Drawer.tsx
 │    │    └── Table.tsx
 │    └── utils/
 │
 ├── store/
 │    └── companyStore.ts
 │
 ├── main.tsx
 └── index.css



## 1️⃣ Login Screen Prompt

```
Design a clean, minimal Windows desktop login screen for an admin system called “Club84”.

Style:
- Light theme
- Soft neutral background
- Centered login card
- Rounded corners (12px)
- Subtle shadow
- Modern typography (Inter)
- Accent color: Deep blue

Elements:
- Club84 logo at top
- Title: Admin Login
- Email field
- Password field
- Primary button (Login)
- Forgot password link (subtle)
- Responsive layout
- Desktop-first layout (1280px width)

Minimal, professional, finance software aesthetic.
```

---

## 2️⃣ Dashboard Screen Prompt

```
Design a clean admin dashboard for a finance/share management desktop app.

Layout:
- Left vertical sidebar navigation
- Top header bar with title and user avatar
- Main content grid layout

Sidebar items:
Dashboard
Members
Shares
Payments
Penalties
Reports
Settings

Main dashboard widgets:
- Total Members (card)
- Total Shares Sold (card)
- Total Collection (card)
- Pending Dues (card in warning color)
- Recent Payments table

Style:
- Minimal
- White cards on light gray background
- Soft shadows
- Rounded corners
- Financial SaaS look
- Desktop optimized
- Responsive grid

Use consistent spacing and clean typography.
```

---

## 3️⃣ Members List Screen Prompt

```
Design a minimal member management screen for a desktop finance app.

Layout:
- Sidebar on left
- Top header with search and Add Member button
- Main content: Data table

Table columns:
Member Code
Full Name
Phone
Join Date
Status
Actions (Edit / View)

Features:
- Search bar
- Filter dropdown (Active / Inactive)
- Clean table rows
- Hover state
- Pagination at bottom

Style:
Modern SaaS admin UI
Light theme
Subtle borders
Professional finance system look
Responsive desktop layout
```

---

## 4️⃣ Add / Edit Member Screen Prompt

```
Design a clean form screen for adding a new club member.

Layout:
- Centered form card
- Two-column layout on desktop
- Single column on smaller screens

Fields:
Full Name
Phone
Email
Address (textarea)
Join Date
Status dropdown
Notes

Buttons:
Primary: Save
Secondary: Cancel

Style:
Minimal
Clean spacing
Label above input
Subtle input borders
Rounded corners
Modern typography
Professional administrative system aesthetic
```

---

## 5️⃣ Share Issuance Screen Prompt

```
Design a share issuance screen for a club management system.

Layout:
- Member selection dropdown at top
- Share details card

Fields:
Certificate Number (auto-generated field style)
Number of Shares
Price Per Share
Total Amount (auto calculated display)
Issue Date

Right side:
Member summary card
- Total Shares Owned
- Previous Certificates

Style:
Finance admin UI
Clean card-based layout
Minimal, structured, professional
Responsive desktop layout
```

---

## 6️⃣ Payments Screen Prompt

```
Design a payment recording screen for a finance desktop app.

Layout:
- Member selector
- Payment form
- Payment history table below

Form fields:
Amount
Payment Mode (Cash, UPI, Cheque, Bank)
Reference Number
Payment Date
Remarks

Below:
Payment History table with status badges:
Received (green)
Pending (gray)
Bounced (red)

Style:
Minimal
Professional finance dashboard
Soft shadows
Rounded UI
Status badges with subtle color
Desktop-first responsive layout
```

---

## 7️⃣ Member Profile / Statement Screen Prompt

```
Design a member profile page for a finance admin desktop app.

Layout:
Top section:
Member info card

Below:
Tabbed layout:
- Shares
- Payments
- Penalties
- Statement

Each tab contains clean data tables.

Right side:
Financial summary card:
- Total Shares
- Total Paid
- Total Due
- Penalties

Style:
Clean
Structured
White cards
Light background
Professional financial system aesthetic
Responsive desktop layout
```

---

## 8️⃣ Reports Screen Prompt

```
Design a reports dashboard screen for a finance desktop app.

Layout:
Grid of report cards:
- Member Statement
- Collection Report
- Due Report
- Share Report

Each card:
Title
Short description
Generate button

Below:
Filters section:
Date range
Member filter
Status filter

Style:
Modern SaaS dashboard
Minimal
Soft shadows
Clear hierarchy
Desktop optimized layout
```

---

## 9️⃣ Settings Screen Prompt

```
Design a settings screen for a desktop admin system.

Sections:
- Club Details
- Backup & Restore
- Receipt Template
- Change Password

Use collapsible sections.

Include:
Backup button
Restore button
File path display
Theme toggle (light/dark)

Style:
Minimal
Structured sections
Clean spacing
Professional system UI
Desktop layout
```

---

# 💎 Pro Tip for Better Figma Results

After generating each screen, tell Figma AI:

> “Make it consistent with a finance SaaS admin system. Keep spacing uniform. Use 8px grid. Keep typography consistent.”

---

If you want next:

* I can generate a **complete design system (colors, spacing, typography scale)**
* Or a **ready Tailwind theme config**
* Or a **UX flow diagram for entire system**
* Or a **premium SaaS-style visual direction guide**

Tell me what you want next 🚀
