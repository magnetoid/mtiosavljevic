import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0B',
          2: '#111113',
          3: '#18181B',
          4: '#232327',
        },
        smoke: {
          DEFAULT: '#E8E6E1',
          dim: '#9A978F',
          faint: '#9A978F', // was #6B6A65 — 3.7:1 on ink, failed WCAG AA
        },
        emerald: {
          DEFAULT: '#10b981',
          300: '#6ee7b7',
          400: '#34d399',
        },
        ember: {
          DEFAULT: '#E8452A',
          dim: '#7A2518',
          bright: '#FF5A3D',
        },
        // Single site accent. Named `signal` because shadcn already owns `accent`
        // (hsl(var(--accent)) = near-black) and colliding would render invisible text.
        signal: {
          DEFAULT: '#C6A15B',
          dim: '#8A6F3C',
        },
        gold: {
          DEFAULT: '#C9A96E',
          dim: '#6B5330',
        },
        cyber: {
          DEFAULT: '#00D4FF',
          dim: '#003D4D',
          glow: 'rgba(0,212,255,0.15)',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        display: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Georgia', 'ui-serif', 'serif'],
        serif: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Book Antiqua', 'Georgia', 'ui-serif', 'serif'],
        sans: ['Iowan Old Style', 'Palatino Linotype', 'Palatino', 'Georgia', 'ui-serif', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [],
} satisfies Config
