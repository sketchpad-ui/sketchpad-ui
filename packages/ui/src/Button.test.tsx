import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { Button } from './components/core/Button.js';
import { SketchpadProvider } from './theme/ThemeProvider.js';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeTruthy();
  });

  it('handles click', async () => {
    let clicked = false;
    render(<Button onClick={() => { clicked = true; }}>Go</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('respects disabled state', () => {
    render(<Button disabled>Off</Button>);
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });

  it('applies a provider accent and mode contract', () => {
    const { container } = render(
      <SketchpadProvider mode="dark" color="purple">
        <Button>Play</Button>
      </SketchpadProvider>,
    );
    expect(container.firstElementChild).toHaveAttribute('data-sk-color', 'purple');
  });
});
