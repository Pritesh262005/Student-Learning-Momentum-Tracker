# 🎨 Student Learning Momentum Tracker - Premium Design System

## Design Philosophy

**Minimal but Powerful** • **Data-First** • **Academic Excellence**

Inspired by: Stripe's clarity + Linear's speed + Notion's flexibility

---

## Color System

### Light Mode
```css
/* Primary */
--primary-50: #EFF6FF;
--primary-100: #DBEAFE;
--primary-500: #2563EB;
--primary-600: #1D4ED8;
--primary-700: #1E40AF;

/* Success */
--success-50: #ECFDF5;
--success-500: #10B981;
--success-600: #059669;

/* Warning */
--warning-50: #FFFBEB;
--warning-500: #F59E0B;
--warning-600: #D97706;

/* Danger */
--danger-50: #FEF2F2;
--danger-500: #EF4444;
--danger-600: #DC2626;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;
```

### Dark Mode
```css
--bg-primary: #0F172A;
--bg-secondary: #1E293B;
--bg-tertiary: #334155;
--border: #334155;
--text-primary: #F1F5F9;
--text-secondary: #94A3B8;
```

### Gradients
```css
--gradient-primary: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
--gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);
--gradient-momentum: linear-gradient(135deg, #2563EB 0%, #10B981 100%);
```

---

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-display: 'Poppins', 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## Spacing System

4px base unit:
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Border Radius

```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;
```

---

## Shadows

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

---

## Animation

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

---

## Component Specifications

### Cards
```css
.card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all var(--duration-base) var(--ease-out);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Buttons
```css
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  transition: all var(--duration-base);
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}
```

### Inputs
```css
.input {
  border: 1.5px solid var(--gray-300);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  transition: all var(--duration-base);
}

.input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-50);
  outline: none;
}
```

---

## Momentum Score Design

### Circular Progress Ring
```
Size: 180px diameter
Stroke Width: 12px
Colors:
  - 80-100: Success gradient
  - 60-79: Warning gradient
  - 0-59: Danger gradient
Animation: 1s ease-out on load
```

### Score Display
```
Center Number: 48px bold
Trend Icon: 24px
Label: 14px uppercase
```

---

## Chart Specifications

### Line Chart
- Smooth curves (tension: 0.4)
- Gradient fill below line
- Animated on load (1s)
- Hover tooltips
- Grid: subtle gray lines

### Donut Chart
- Inner radius: 60%
- Hover: scale segment 1.05
- Labels: outside with lines
- Colors: from color palette

---

## Micro-Interactions

### Hover States
```css
/* Cards */
transform: translateY(-2px);
box-shadow: enhanced;

/* Buttons */
transform: scale(1.02);

/* Icons */
transform: rotate(5deg);
```

### Loading States
```css
/* Skeleton */
background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
animation: shimmer 1.5s infinite;
```

### Success Feedback
```css
/* Checkmark animation */
stroke-dasharray: 100;
stroke-dashoffset: 100;
animation: draw 0.5s ease-out forwards;
```

---

## Accessibility

### Focus Rings
```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Contrast Ratios
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### ARIA Labels
All interactive elements must have:
- aria-label or aria-labelledby
- role attribute
- keyboard navigation support

---

## Responsive Breakpoints

```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

---

## Grid System

12-column grid with gaps:
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
}
```

---

## Status Badges

```css
.badge-success {
  background: var(--success-50);
  color: var(--success-600);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}
```

---

## Empty States

Include:
- Illustration (SVG)
- Heading (text-xl)
- Description (text-sm, gray-500)
- CTA button
- Subtle background pattern

---

## Toast Notifications

Position: Top-right
Animation: Slide in from right
Duration: 4s
Dismiss: Click or auto

```css
.toast {
  min-width: 320px;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  animation: slideIn 0.3s ease-out;
}
```

---

## Performance Guidelines

- Lazy load images
- Code split routes
- Debounce search (300ms)
- Virtualize long lists
- Optimize re-renders
- Use CSS transforms for animations

---

## Brand Voice

**Tone**: Professional yet encouraging
**Language**: Clear, concise, motivational
**Messaging**: Focus on growth and achievement

---

This design system ensures consistency, scalability, and premium quality across the entire application.
