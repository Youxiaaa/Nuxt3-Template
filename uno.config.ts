import { defineConfig } from 'unocss';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';

export default defineConfig({
  exclude: ['node_modules', 'dist', '.git', 'public', 'build'],
  presets: [
    presetAttributify(),
    presetUno(),
  ],
  // Custom Rules Static Rules
  rules: [],
  /* variants 變體修飾  ex: hover */
  variants: [],
  /* shortcuts to multiple utilities */
  shortcuts: {
    'flex-center': 'flex items-center',
  },
  theme: {
    // 因為與 presets 的規則衝突，所以 'custom_dark' 不可取名為 'custom-dark'
    colors: {
      primaryDarkBlue: '#3474A9',
      primaryLightBlue: '#97BAE2',
      skyBlue: '#69EAF2',
      lightSkyBlue: 'rgba(105,234,242,0.4)',
      primaryDarkYellow: '#FE990D',
      primaryLightYellow: 'rgba(254, 153, 13, 0.2)',
      secondaryRed: '#F63C3C',
      secondaryGreen: '#51C927',
    },
    borderRadius: {
      h1: '30px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      h5: '16px',
    },
    fontSize: {
      h1: '30px',
      h2: '24px',
      h3: '20px',
      h4: '18px',
      h5: '16px',
    },
    breakpoints: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1500px',
    },
  },
});
