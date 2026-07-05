'use client';

import { useState } from 'react';
import { tokens } from '@sketchpad/tokens';
import { SketchBorder } from '../../primitives/SketchBorder.js';
import { DropdownMenu, type MenuItem } from './Menus.js';
import { cn } from '../../utils.js';
import styles from './Menubar.module.css';

export interface MenubarMenu {
  id: string;
  label: string;
  items: MenuItem[];
}

export function Menubar({ menus, seed = 'menubar' }: { menus: MenubarMenu[]; seed?: string | number }) {
  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" roughness={tokens.roughness.subtle} className={styles.menubar}>
      {menus.map((menu) => (
        <DropdownMenu
          key={menu.id}
          seed={`${seed}-${menu.id}`}
          trigger={<span className={styles.menubarTrigger}>{menu.label}</span>}
          items={menu.items}
        />
      ))}
    </SketchBorder>
  );
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  href?: string;
  items?: { id: string; label: string; href?: string }[];
}

export function NavigationMenu({
  items,
  activeId,
  seed = 'nav-menu',
}: {
  items: NavigationMenuItem[];
  activeId?: string;
  seed?: string | number;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <SketchBorder variant="rounded" seed={seed} fill="paper" className={styles.navMenu}>
      {items.map((item) => (
        <div key={item.id} className={styles.navMenuItem}>
          <button
            type="button"
            className={cn(styles.menubarTrigger, (activeId === item.id || openId === item.id) && styles.menubarTriggerOpen)}
            aria-expanded={openId === item.id}
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
          >
            {item.label}
          </button>
          {item.items && openId === item.id && (
            <SketchBorder variant="rounded" seed={`${seed}-${item.id}`} fill="paper" className={styles.navSubmenu}>
              <ul role="menu">
                {item.items.map((sub) => (
                  <li key={sub.id} role="none">
                    <a href={sub.href ?? '#'} className={styles.navSubmenuLink} role="menuitem">
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SketchBorder>
          )}
        </div>
      ))}
    </SketchBorder>
  );
}
