/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 브라운 컬러 기반 단일 테마
        primary: {
          50: '#FDF8F6',
          100: '#F2E8E5',
          200: '#EADDD7',
          300: '#E0CDC4',
          400: '#D6B8A7',
          500: '#A0715D', // 메인 브라운
          600: '#8B5A42',
          700: '#744C34',
          800: '#5D3E2A',
          900: '#4A3221',
        },
        brown: {
          50: '#FDF8F6',
          100: '#F2E8E5',
          200: '#EADDD7',
          300: '#E0CDC4',
          400: '#D6B8A7',
          500: '#A0715D',
          600: '#8B5A42',
          700: '#744C34',
          800: '#5D3E2A',
          900: '#4A3221',
        },
        caffeine: {
          light: '#8B4513',
          DEFAULT: '#A0715D',
          dark: '#D2691E',
          accent: '#CD853F',
        },
        // 상태 컬러
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // 중성 컬러 (브라운 톤으로 조정)
        gray: {
          50: '#FAF9F8',
          100: '#F5F4F2',
          200: '#E8E6E2',
          300: '#D3D0C8',
          400: '#A8A299',
          500: '#7C766B',
          600: '#5D564A',
          700: '#4A4238',
          800: '#3A342B',
          900: '#2D271F',
        }
      },
      fontFamily: {
        sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-light': 'bounce 2s infinite',
        'progress': 'progress 1s ease-in-out',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        }
      }
    },
  },
  plugins: [],
}
