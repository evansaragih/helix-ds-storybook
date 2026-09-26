# Primitive Color Resolution — Sign-off Only Audit Data

> **Source**: `https://claude.ai/code/artifact/b23fca44-2ab4-458d-8c6e-508c4d6194db`  
> **Mode**: `By app · sign-off only`  
> **Purpose**: Raw list of all primitive colors requiring designer/developer sign-off, token assignment, proposal validation, or custom retention.

---

## 📋 Executive Overview

* **Total Applications**: 6 Web Applications + Portals
* **View Filter**: `By app · sign-off only`
* **Status**: Open Decisions / Sign-Off Needed

---

## 🟢 1. `cekolam-internal-dashboard`
**Base URL**: `cekolam-internal-dashboard.nusanticsresearch.com`

### 📍 Route: `/cekolam`
**Component**: `src/components/badge/Badge.tsx`

1. **`yellow-200` (`#fef08a`)**
   * **Role**: `BACKGROUND`
   * **Context**: `Alert Notification`
   * **Auto Proposal**: `Semantics-Core/Colors/Surface/Warning-Bold`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`
   * **Comment Box**: `Comment — e.g. which token, or why it stays custom`

2. **`#fecaca` (`red-200`)**
   * **Role**: `BACKGROUND`
   * **Context**: `Sample`
   * **Auto Proposal**: `Semantics-Core/Colors/Borders/Stroke-Subtle`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

3. **`#e0e7ff` (`indigo-100`)**
   * **Role**: `BACKGROUND`
   * **Context**: `Sample`
   * **Auto Proposal**: `Semantics-Core/Colors/Surface/Brand-Primary`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

4. **`#1e1b4b` (`indigo-950`)**
   * **Role**: `BACKGROUND`
   * **Context**: `Sample`
   * **Auto Proposal**: `Semantics-Core/Colors/Surface/Brand-Primary`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

5. **`#c5ca3c`**
   * **Role**: `TEXT`
   * **Context**: `Form Recommendation`
   * **Auto Proposal**: `Semantics-Core/Colors/Text-Primary (Δ8.5)`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

6. **`#ec5004`**
   * **Role**: `TEXT`
   * **Context**: `Sample`
   * **Auto Proposal**: `Semantics-Core/Colors/Text-Error`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

7. **`#f5d4bf`**
   * **Role**: `TEXT`
   * **Context**: `Sample`
   * **Auto Proposal**: `Semantics-Core/Colors/Text-Error`
   * **Options**: `Use proposal` | `Different token` | `Keep custom`

8. **`#fef795`**
   * **Role**: `TEXT`
   * **Context**: `Sample Report Button Submit`
   * **Auto Proposal**: *(No auto-match proposal)*
   * **Options**: `Assign token` | `Different token` | `Keep custom`

9. **`#f7055d`**
   * **Role**: `TEXT`
   * **Context**: `Price Badge`
   * **Auto Proposal**: *(No auto-match proposal)*
   * **Options**: `Assign token` | `Different token` | `Keep custom`

10. **`#d1d1db`**
    * **Role**: `TEXT`
    * **Context**: `Pricing Badge`
    * **Auto Proposal**: *(No auto-match proposal)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

11. **`#fafafa`**
    * **Role**: `BACKGROUND`
    * **Context**: `Cekolam Utama`
    * **Auto Proposal**: *(No auto-match proposal)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

12. **`#eded22`**
    * **Role**: `BACKGROUND`
    * **Context**: `Disease Badge`
    * **Auto Proposal**: *(No auto-match proposal)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

---

### 📍 Route: `/lab`
**Component**: `src/components/badge/Badge-item-not-assigned-badge.tsx`

13. **`#cb4b04` / `#c54b04`**
    * **Role**: `TEXT`
    * **Context**: `Sample Text Not Assigned Badge — text "Return assigned"`
    * **Auto Proposal**: `Semantics-Core/Colors/Text-Error`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

14. **`#e5dfb8`**
    * **Role**: `TEXT`
    * **Context**: `Sample Text Not Assigned Badge`
    * **Auto Proposal**: `Semantics-Core/Colors/Stroke-Subtle (Δ7.5)`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

### 📍 Route: `/business-analytics`
**Component**: `src/components/stats/metric-stats.tsx`

15. **`#d07122`**
    * **Role**: `TEXT`
    * **Context**: `Monthly Aquakult Metric`
    * **Auto Proposal**: `Semantics-Core/Colors/Text-Brand-Primary (Δ14.2)`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

## 🟢 2. `nusantics-corporate-website`
**Base URL**: `nusantics.com`

### 📍 Route: `/product-pipeline`
**Component**: `src/components/custom/section-card-featured.tsx`

16. **`#585a5b`**
    * **Role**: `TEXT`
    * **Context**: `Product Pipeline Description`
    * **Auto Proposal**: `nusantics/text-brand-secondary`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

17. **`#fd6064`**
    * **Role**: `COLOR`
    * **Context**: `Product Pipeline Banner`
    * **Auto Proposal**: *(No token proposed)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

18. **`#c3e0df`**
    * **Role**: `COLOR`
    * **Context**: `Product Pipeline Accent`
    * **Auto Proposal**: *(No token proposed)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

---

## 🟢 3. `cekolam-dashboard`
**Base URL**: `cekolam.id`

### 📍 Route: `/`
**Component**: `src/components/util/card-custom-v2.tsx`

19. **`#1a4c51`**
    * **Role**: `BACKGROUND`
    * **Context**: `Group Teams Header`
    * **Auto Proposal**: `nusantics/surface-brand-primary`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

20. **`#4e7a2e`**
    * **Role**: `BACKGROUND`
    * **Context**: `Group Teams Accent`
    * **Auto Proposal**: `causa/surface-primary-subtle-pressed`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

21. **`#80529c`**
    * **Role**: `COLOR`
    * **Context**: `Group Teams Tag`
    * **Auto Proposal**: *(No token proposed)*
    * **Options**: `Assign token` | `Different token` | `Keep custom`

---

## 🟢 4. `causa-admin-portal`
**Base URL**: `causa-admin-portal.nusanticsresearch.com`

### 📍 Route: `/order/[id]`
**Component**: `src/app/(default)/order/[id]/page.tsx`

22. **`red-50`**
    * **Role**: `BACKGROUND`
    * **Context**: `Order Background`
    * **Auto Proposal**: `Semantics-Core/Colors/Stroke-Strong`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

23. **`#fd6b64`**
    * **Role**: `BACKGROUND`
    * **Context**: `Lab Selection`
    * **Auto Proposal**: `causa/text-brand-secondary`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

24. **`#c1d5eb`**
    * **Role**: `BORDER`
    * **Context**: `Lab Selection`
    * **Auto Proposal**: `causa/stroke-subtle (Δ7.5)`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

## 🟢 5. `operations-portal`
**Base URL**: `operations-portal.nusanticsresearch.com`

### 📍 Route: `/biosecurity/reports`
**Component**: `src/components/biosecurity/reports.tsx`

25. **`#0e6093`**
    * **Role**: `TEXT`
    * **Context**: `Biosecurity Reports Text`
    * **Auto Proposal**: `Semantics-Core/Colors/Surface/Brand-Primary`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

### 📍 Route: `/cekolam`
**Component**: `src/components/cekolam/cekolam.tsx`

26. **`yellow-200` (`#fef08a`)**
    * **Role**: `BACKGROUND`
    * **Context**: `Reports Warning Status`
    * **Auto Proposal**: `Semantics-Core/Colors/Surface/Warning-Bold`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

## 🟢 6. `manufacturing/kit-code-credits`

### 📍 Route: `/`
**Component**: `src/components/manufacturing/kit-code-credits.tsx`

27. **`yellow-200` (`#fef08a`)**
    * **Role**: `BACKGROUND`
    * **Context**: `Kit Code Credits Warning`
    * **Auto Proposal**: `Semantics-Core/Colors/Surface/Warning-Bold`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

## 🟢 7. `nusantics-research-dashboard`
**Base URL**: `nusantics-research-dashboard.nusanticsresearch.com`

### 📍 Route: `/research-dashboard`

28. **`#dfe5eb`**
    * **Role**: `COLOR / BG`
    * **Context**: `Data Viz / Section`
    * **Auto Proposal**: `causa/data-viz-chart-4`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

29. **`#7184a4`**
    * **Role**: `BACKGROUND`
    * **Context**: `Divider / Graph Accent`
    * **Auto Proposal**: `nusantics/surface-warning-subtle`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

## 🟢 8. `iam-portal`
**Base URL**: `iam.nusanticsresearch.com`

### 📍 Route: `/application/[uuid]/permissions/[id]` & `/roles/[id]`

30. **`gray-600` (`#4b5563`)**
    * **Role**: `TEXT`
    * **Context**: `Tabs IAM Detail Text`
    * **Auto Proposal**: `causa/text-brand-primary (Δ12.2)`
    * **Options**: `Use proposal` | `Different token` | `Keep custom`

---

> Generated for token mapping analysis with Claude.
