import type { Config } from 'tailwindcss'
import { lcPreset } from './src/theme/lc-theme'

export default {
  presets: [lcPreset],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    '../../sp-platform/packages/components/src/**/*.{ts,tsx}',
    '../../sp-platform/packages/layouts/src/**/*.{ts,tsx}',
  ],
} satisfies Config
