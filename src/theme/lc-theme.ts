import type { Config } from 'tailwindcss'
import { basePreset } from '@spektra/themes'

/**
 * LuxCover Tailwind preset — dark obsidian + gold accent theme.
 *
 * Extends basePreset with client-specific color palettes:
 * - obsidian: very dark near-black scale (background)
 * - gold: warm amber-gold (CTAs, highlights, brand accent)
 */
export const lcPreset = {
  presets: [basePreset],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f4f4f6',
          100: '#e5e5ea',
          200: '#cdcdd6',
          300: '#ababba',
          400: '#83839a',
          500: '#67677f',
          600: '#555568',
          700: '#464655',
          800: '#3c3c49',
          900: '#1a1a22',
          950: '#0a0a10',
        },
        gold: {
          DEFAULT: '#C49A1A',
          light: '#DDB83A',
          dark: '#9A7A10',
          pale: '#F0D98A',
        },
      },
    },
  },
  plugins: [],
} satisfies Partial<Config>
