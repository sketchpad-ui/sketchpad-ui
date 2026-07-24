'use client';

import { accentPresets, type AccentColor } from '@sketchpad/tokens';
import { ThemeToggle, useTheme } from 'sketchpad-ui';

export function ThemeControls() {
  const { color, setColor } = useTheme();
  return (
    <div className="themeControls">
      <div className="colorPicker" aria-label="Theme color">
        {(Object.keys(accentPresets) as AccentColor[]).map((name) => (
          <button
            key={name}
            type="button"
            className={`colorPickerSwatch ${color === name ? 'colorPickerSwatchActive' : ''}`}
            style={{ background: accentPresets[name] }}
            aria-label={`Use ${name} theme`}
            aria-pressed={color === name}
            onClick={() => setColor(name)}
          />
        ))}
      </div>
      <ThemeToggle />
    </div>
  );
}
