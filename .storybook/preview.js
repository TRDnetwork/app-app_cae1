import '../src/styles/global.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'warm',
    values: [
      { name: 'warm', value: '#faf8f5' },
      { name: 'surface', value: '#e9e5dd' },
    ],
  },
};

// Apply CSS Variables for design token consistency
const root = document.documentElement;
root.style.setProperty('--color-bg', '#faf8f5');
root.style.setProperty('--color-surface', '#e9e5dd');
root.style.setProperty('--color-text', '#1a2e1a');
root.style.setProperty('--color-text-dim', '#4a4a4a');
root.style.setProperty('--color-accent', '#e66000');
root.style.setProperty('--color-accent-alt', '#ff8c42');
root.style.setProperty('--font-display', 'Fraunces, ui-serif');
root.style.setProperty('--font-body', 'Satoshi, ui-sans-serif');
root.style.setProperty('--letter-spacing-heading', '-0.05em');
root.style.setProperty('--line-height-normal', '1.6');