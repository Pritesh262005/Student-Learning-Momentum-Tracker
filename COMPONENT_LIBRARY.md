# 🎨 Premium Component Library

## Component Hierarchy

```
src/components/
├── ui/                    # Base UI Components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Input.jsx
│   ├── Badge.jsx
│   ├── Avatar.jsx
│   ├── Modal.jsx
│   ├── Toast.jsx
│   ├── Dropdown.jsx
│   ├── Tooltip.jsx
│   └── Progress.jsx
├── layout/                # Layout Components
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── Container.jsx
│   └── PageHeader.jsx
├── charts/                # Data Visualization
│   ├── CircularProgress.jsx
│   ├── LineChart.jsx
│   ├── AreaChart.jsx
│   └── DonutChart.jsx
├── dashboard/             # Dashboard Specific
│   ├── StatsCard.jsx
│   ├── MomentumScore.jsx
│   ├── ActivityFeed.jsx
│   └── QuickActions.jsx
└── common/                # Shared Components
    ├── EmptyState.jsx
    ├── LoadingState.jsx
    └── ErrorBoundary.jsx
```

---

## 1. Button Component

### Variants
```jsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
```

### Sizes
```jsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### States
```jsx
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>
<Button icon={<Plus />}>With Icon</Button>
```

### Implementation
```jsx
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading, 
  disabled, 
  icon, 
  children,
  ...props 
}) => {
  const baseClasses = 'btn focus-ring';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    ghost: 'btn-ghost',
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner className="mr-2" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
```

---

## 2. Card Component

### Variants
```jsx
<Card>Basic Card</Card>
<Card hover>Hover Effect</Card>
<Card glow>Glow on Hover</Card>
<Card glass>Glassmorphism</Card>
```

### Implementation
```jsx
const Card = ({ hover, glow, glass, children, className, ...props }) => {
  const classes = `
    card
    ${hover ? 'card-hover' : ''}
    ${glow ? 'card-glow' : ''}
    ${glass ? 'glass' : ''}
    ${className}
  `;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
```

---

## 3. Stats Card Component

### Usage
```jsx
<StatsCard
  title="Total Study Hours"
  value="127.5"
  change="+12%"
  trend="up"
  icon={<Clock />}
  color="blue"
/>
```

### Implementation
```jsx
const StatsCard = ({ title, value, change, trend, icon, color }) => {
  const colorClasses = {
    blue: 'bg-primary-50 text-primary-600',
    green: 'bg-success-50 text-success-600',
    amber: 'bg-warning-50 text-warning-600',
  };

  return (
    <Card className="stats-card">
      <div>
        <p className="stats-label">{title}</p>
        <p className="stats-value">{value}</p>
        {change && (
          <div className="flex items-center mt-2 text-sm">
            {trend === 'up' ? <TrendingUp className="w-4 h-4 text-success-500" /> : <TrendingDown className="w-4 h-4 text-danger-500" />}
            <span className={trend === 'up' ? 'text-success-600' : 'text-danger-600'}>
              {change}
            </span>
          </div>
        )}
      </div>
      <div className={`stats-icon ${colorClasses[color]}`}>
        {icon}
      </div>
    </Card>
  );
};
```

---

## 4. Circular Progress (Momentum Score)

### Usage
```jsx
<CircularProgress
  value={78}
  size={180}
  strokeWidth={12}
  label="Momentum Score"
  showTrend
/>
```

### Implementation
```jsx
const CircularProgress = ({ value, size = 180, strokeWidth = 12, label, showTrend }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val) => {
    if (val >= 80) return 'url(#gradient-success)';
    if (val >= 60) return 'url(#gradient-warning)';
    return 'url(#gradient-danger)';
  };

  return (
    <div className="circular-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient-warning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="gradient-danger" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          className="circular-progress-ring transition-all duration-1000 ease-out"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold">{value}</span>
        {label && <span className="text-sm text-gray-500 uppercase mt-1">{label}</span>}
        {showTrend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-5 h-5 text-success-500" />
            <span className="text-sm text-success-600 ml-1">Improving</span>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 5. Input Component

### Variants
```jsx
<Input placeholder="Enter text" />
<Input type="email" label="Email" />
<Input error="This field is required" />
<Input icon={<Search />} placeholder="Search..." />
<Input floating label="Floating Label" />
```

### Implementation
```jsx
const Input = ({ label, error, icon, floating, ...props }) => {
  if (floating) {
    return (
      <div className="input-group">
        <input className="input-floating peer" placeholder=" " {...props} />
        <label className="label-floating">{label}</label>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`input ${icon ? 'pl-10' : ''} ${error ? 'input-error' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-danger-600">{error}</p>}
    </div>
  );
};
```

---

## 6. Modal Component

### Usage
```jsx
<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add Study Session">
  <form>
    {/* Form content */}
  </form>
</Modal>
```

### Implementation
```jsx
const Modal = ({ open, onClose, title, children, size = 'md' }) => {
  if (!open) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className={`modal-content ${sizeClasses[size]}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
};
```

---

## 7. Toast Notification

### Usage
```jsx
toast.success('Study session added!');
toast.error('Failed to save');
toast.info('Reminder: Study today');
```

### Implementation
```jsx
const Toast = ({ type, message, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success-500" />,
    error: <XCircle className="w-5 h-5 text-danger-500" />,
    info: <Info className="w-5 h-5 text-primary-500" />,
  };

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
```

---

## 8. Empty State Component

### Usage
```jsx
<EmptyState
  icon={<BookOpen />}
  title="No study sessions yet"
  description="Start tracking your learning journey by adding your first study session."
  action={<Button onClick={handleAdd}>Add Session</Button>}
/>
```

### Implementation
```jsx
const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
```

---

## 9. Loading Skeleton

### Usage
```jsx
<Skeleton className="h-8 w-48" />
<Skeleton className="h-32 w-full" />
<Skeleton circle className="h-12 w-12" />
```

### Implementation
```jsx
const Skeleton = ({ className, circle }) => {
  return (
    <div className={`skeleton ${circle ? 'rounded-full' : ''} ${className}`} />
  );
};
```

---

## 10. Badge Component

### Usage
```jsx
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Blocked</Badge>
<Badge variant="primary">New</Badge>
```

---

## Component Best Practices

1. **Composition over Configuration**: Build complex UIs from simple components
2. **Consistent Props**: Use standard prop names (variant, size, disabled, etc.)
3. **Accessibility**: Include ARIA labels, keyboard navigation, focus management
4. **Performance**: Memoize expensive components, lazy load when possible
5. **TypeScript**: Add prop types for better DX
6. **Storybook**: Document all component variants
7. **Testing**: Unit tests for logic, visual regression tests for UI

---

## Animation Guidelines

- **Entrance**: 200-300ms ease-out
- **Exit**: 150-200ms ease-in
- **Hover**: 150ms ease-out
- **Loading**: Infinite smooth animation
- **Success**: Bounce effect (300ms)

---

This component library ensures consistency, reusability, and premium quality across the entire application.
