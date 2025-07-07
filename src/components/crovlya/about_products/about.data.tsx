import { GradusIcon } from '@/shared/icons/GradusIcon';
import { HammerIcon } from '@/shared/icons/HammerIcon';
import { PaletteIcon } from '@/shared/icons/PaletteIcon';
import { ShieldIcon } from '@/shared/icons/ShieldIcon';
import { ReactNode } from 'react';

type AboutData = {
  icon: ReactNode,
  title: string
}

export const ABOUT_DATA: AboutData[] = [
  {
    icon: <HammerIcon />,
    title: 'Легкость монтажа',
  },
  {
    icon: <GradusIcon />,
    title: 'Устойчивость к температуре',
  },
  {
    icon: <ShieldIcon />,
    title: 'Долговечность',
  },
  {
    icon: <PaletteIcon />,
    title: 'Широкий выбор цветов',
  },
];
