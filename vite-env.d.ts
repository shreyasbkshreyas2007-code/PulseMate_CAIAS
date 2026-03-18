@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-inter: 'Inter', sans-serif;

    --background: 240 20% 97%;
    --foreground: 240 10% 10%;

    --card: 0 0% 100%;
    --card-foreground: 240 10% 10%;

    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 10%;

    --primary: 230 70% 55%;
    --primary-foreground: 0 0% 100%;

    --secondary: 210 40% 96%;
    --secondary-foreground: 240 10% 10%;

    --muted: 240 10% 94%;
    --muted-foreground: 240 5% 46%;

    --accent: 260 60% 55%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 72% 55%;
    --destructive-foreground: 0 0% 100%;

    --border: 240 10% 90%;
    --input: 240 10% 90%;
    --ring: 230 70% 55%;

    --radius: 1rem;

    /* PulseMate custom tokens */
    --pulse-violet: 260 60% 55%;
    --pulse-success: 145 60% 42%;
    --pulse-warning: 38 92% 55%;
    --pulse-danger: 0 72% 55%;
    --pulse-teal: 175 60% 45%;
    --pulse-gradient: linear-gradient(135deg, hsl(230 70% 55%), hsl(260 60% 55%));
    --pulse-gradient-warm: linear-gradient(135deg, hsl(260 60% 55%), hsl(330 60% 55%));
    --pulse-glass: rgba(255, 255, 255, 0.7);
    --pulse-glass-border: rgba(255, 255, 255, 0.3);

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 240 15% 8%;
    --foreground: 0 0% 95%;
    --card: 240 15% 12%;
    --card-foreground: 0 0% 95%;
    --popover: 240 15% 12%;
    --popover-foreground: 0 0% 95%;
    --primary: 230 70% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 10% 18%;
    --secondary-foreground: 0 0% 95%;
    --muted: 240 10% 18%;
    --muted-foreground: 240 5% 65%;
    --accent: 260 60% 60%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 100%;
    --border: 240 10% 20%;
    --input: 240 10% 20%;
    --ring: 230 70% 60%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans;
    font-family: var(--font-inter);
  }
}

@layer utilities {
  .glass-card {
    @apply bg-card/80 backdrop-blur-xl border border-border/50 shadow-lg;
  }

  .gradient-primary {
    background: var(--pulse-gradient);
  }

  .gradient-warm {
    background: var(--pulse-gradient-warm);
  }

  .pulse-animate {
    animation: pulse-ring 2s ease-out infinite;
  }

  .screen-container {
    @apply min-h-screen pb-24 px-4 pt-4 space-y-4 max-w-md mx-auto;
  }
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
  75% { transform: scale(1.05); }
}

.animate-heartbeat {
  animation: heartbeat 1.5s ease-in-out infinite;
}
