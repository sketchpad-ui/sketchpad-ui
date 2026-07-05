/** Inline script string — sets data-sk-theme on <html> before first paint to avoid flash */
export function getThemeInitScript(storageKey = 'sketchpad-theme'): string {
  return `(function(){try{var k=${JSON.stringify(storageKey)};var s=localStorage.getItem(k);var d=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s==='light'||s==='dark'?s:d;if(s==='light'||s==='dark')document.documentElement.setAttribute('data-sk-theme',t);else document.documentElement.removeAttribute('data-sk-theme');document.documentElement.style.colorScheme=t;}catch(e){}})();`;
}
