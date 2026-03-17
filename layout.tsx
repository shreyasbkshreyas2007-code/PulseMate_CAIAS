@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.98 0.005 260);
  --foreground: oklch(0.18 0.02 260);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.18 0.02 260);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.18 0.02 260);
  --primary: oklch(0.55 0.18 255);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.94 0.02 260);
  --secondary-foreground: oklch(0.25 0.02 260);
  --muted: oklch(0.96 0.01 260);
  --muted-foreground: oklch(0.5 0.02 260);
  --accent: oklch(0.75 0.15 180);
  --accent-foreground: oklch(0.18 0.02 260);
  --destructive: oklch(0.6 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.92 0.01 260);
  --input: oklch(0.92 0.01 260);
  --ring: oklch(0.55 0.18 255);
  --chart-1: oklch(0.55 0.18 255);
  --chart-2: oklch(0.75 0.15 180);
  --chart-3: oklch(0.65 0.15 290);
  --chart-4: oklch(0.7 0.18 140);
  --chart-5: oklch(0.6 0.2 30);
  --radius: 1rem;
  --sidebar: oklch(0.98 0.005 260);
  --sidebar-foreground: oklch(0.18 0.02 260);
  --sidebar-primary: oklch(0.55 0.18 255);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.94 0.02 260);
  --sidebar-accent-foreground: oklch(0.25 0.02 260);
  --sidebar-border: oklch(0.92 0.01 260);
  --sidebar-ring: oklch(0.55 0.18 255);
  
  /* Custom Healthcare tokens */
  --pulse-teal: oklch(0.75 0.15 180);
  --pulse-blue: oklch(0.55 0.18 255);
  --pulse-violet: oklch(0.65 0.15 290);
  --pulse-success: oklch(0.7 0.18 140);
  --pulse-warning: oklch(0.8 0.15 85);
  --pulse-danger: oklch(0.6 0.22 25);
  --pulse-glass: oklch(1 0 0 / 0.7);
  --pulse-glass-border: oklch(1 0 0 / 0.3);
}

.dark {
  --background: oklch(0.14 0.015 260);
  --foreground: oklch(0.96 0.005 260);
  --card: oklch(0.18 0.015 260);
  --card-foreground: oklch(0.96 0.005 260);
  --popover: oklch(0.18 0.015 260);
  --popover-foreground: oklch(0.96 0.005 260);
  --primary: oklch(0.65 0.18 255);
  --primary-foreground: oklch(0.14 0.015 260);
  --secondary: oklch(0.24 0.015 260);
  --secondary-foreground: oklch(0.96 0.005 260);
  --muted: oklch(0.24 0.015 260);
  --muted-foreground: oklch(0.65 0.01 260);
  --accent: oklch(0.7 0.12 180);
  --accent-foreground: oklch(0.96 0.005 260);
  --destructive: oklch(0.5 0.2 25);
  --destructive-foreground: oklch(0.96 0.005 260);
  --border: oklch(0.28 0.015 260);
  --input: oklch(0.28 0.015 260);
  --ring: oklch(0.65 0.18 255);
  --chart-1: oklch(0.65 0.18 255);
  --chart-2: oklch(0.7 0.12 180);
  --chart-3: oklch(0.6 0.12 290);
  --chart-4: oklch(0.65 0.15 140);
  --chart-5: oklch(0.55 0.18 30);
  --sidebar: oklch(0.16 0.015 260);
  --sidebar-foreground: oklch(0.96 0.005 260);
  --sidebar-primary: oklch(0.65 0.18 255);
  --sidebar-primary-foreground: oklch(0.14 0.015 260);
  --sidebar-accent: oklch(0.24 0.015 260);
  --sidebar-accent-foreground: oklch(0.96 0.005 260);
  --sidebar-border: oklch(0.28 0.015 260);
  --sidebar-ring: oklch(0.65 0.18 255);
  
  /* Custom Healthcare tokens */
  --pulse-teal: oklch(0.7 0.12 180);
  --pulse-blue: oklch(0.65 0.18 255);
  --pulse-violet: oklch(0.6 0.12 290);
  --pulse-success: oklch(0.65 0.15 140);
  --pulse-warning: oklch(0.75 0.12 85);
  --pulse-danger: oklch(0.55 0.2 25);
  --pulse-glass: oklch(0.2 0.015 260 / 0.7);
  --pulse-glass-border: oklch(0.3 0.015 260 / 0.3);
}

@theme inline {
  --font-sans: 'Inter', 'Inter Fallback', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  
  /* Healthcare specific */
  --color-pulse-teal: var(--pulse-teal);
  --color-pulse-blue: var(--pulse-blue);
  --color-pulse-violet: var(--pulse-violet);
  --color-pulse-success: var(--pulse-success);
  --color-pulse-warning: var(--pulse-warning);
  --color-pulse-danger: var(--pulse-danger);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px oklch(0.55 0.18 255 / 0.3);
  }
  50% {
    box-shadow: 0 0 40px oklch(0.55 0.18 255 / 0.5);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.1);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}

/* Glassmorphism utilities */
.glass {
  background: var(--pulse-glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--pulse-glass-border);
}

.glass-card {
  background: oklch(1 0 0 / 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid oklch(1 0 0 / 0.2);
  box-shadow: 0 8px 32px oklch(0 0 0 / 0.08);
}

.dark .glass-card {
  background: oklch(0.2 0.015 260 / 0.8);
  border: 1px solid oklch(0.3 0.015 260 / 0.2);
}

/* Gradient backgrounds */
.gradient-primary {
  background: linear-gradient(135deg, oklch(0.55 0.18 255), oklch(0.65 0.15 290));
}

.gradient-teal {
  background: linear-gradient(135deg, oklch(0.75 0.15 180), oklch(0.55 0.18 255));
}

.gradient-warm {
  background: linear-gradient(135deg, oklch(0.8 0.15 85), oklch(0.6 0.22 25));
}

/* Mobile frame styling */
.mobile-frame {
  max-width: 430px;
  margin: 0 auto;
  min-height: 100dvh;
  position: relative;
  overflow-x: hidden;
}

/* Safe area padding for mobile */
.safe-area-top {
  padding-top: env(safe-area-inset-top, 20px);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
