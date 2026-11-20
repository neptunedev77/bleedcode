// Applies the saved theme before the page paints (loaded blocking in <head>).
// Kept as a tiny external file so the CSP can stay `script-src 'self'`.
try {
  if (localStorage.getItem('theme') === 'light') document.documentElement.dataset.theme = 'light';
} catch {
  /* storage blocked: stay on the default (dark) theme */
}
