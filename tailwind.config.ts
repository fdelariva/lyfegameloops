
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom design system colors
				'purple-light': 'hsl(var(--purple-light))',
				'purple-medium': 'hsl(var(--purple-medium))',
				'purple-dark': 'hsl(var(--purple-dark))',
				'orange-light': 'hsl(var(--orange-light))',
				'orange-medium': 'hsl(var(--orange-medium))',
				'orange-dark': 'hsl(var(--orange-dark))',
				'teal-light': 'hsl(var(--teal-light))',
				'teal-medium': 'hsl(var(--teal-medium))',
				'teal-dark': 'hsl(var(--teal-dark))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				'dm-sans': ['DM Sans', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
			},
			fontSize: {
				// Display sizes
				'display-lg': ['3.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }], // 56px
				'display-md': ['2.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 40px
				'display-sm': ['2rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 32px
				
				// Headline sizes
				'headline-lg': ['2rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 32px
				'headline-md': ['1.75rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 28px
				'headline-sm': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 24px
				
				// Title sizes
				'title-lg': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 24px
				'title-md': ['1.125rem', { lineHeight: '1.5' }], // 18px
				'title-sm': ['0.875rem', { lineHeight: '1.5' }], // 14px
				
				// Body sizes
				'body-lg': ['1.125rem', { lineHeight: '1.5' }], // 18px
				'body-md': ['0.9375rem', { lineHeight: '1.5' }], // 15px
				'body-sm': ['0.8125rem', { lineHeight: '1.5' }], // 13px
				
				// Label sizes
				'label-lg': ['0.9375rem', { lineHeight: '1.5' }], // 15px
				'label-md': ['0.8125rem', { lineHeight: '1.5' }], // 13px
				'label-sm': ['0.6875rem', { lineHeight: '1.5' }], // 11px
				
				// CTA sizes
				'cta-button': ['0.9375rem', { lineHeight: '1.5' }], // 15px
				'cta-button-sm': ['0.8125rem', { lineHeight: '1.5' }], // 13px
			},
			fontWeight: {
				'dm-regular': '400',
				'dm-medium': '500',
				'dm-semibold': '600',
				'dm-bold': '700',
				'inter-regular': '400',
				'inter-medium': '500',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
