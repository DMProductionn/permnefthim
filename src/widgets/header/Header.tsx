'use client';

import { Logo } from '@/shared/ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    // Определяем, к какому разделу относится якорь
    let sectionPath = '/crovlya';
    if (pathname.startsWith('/him')) sectionPath = '/him';
    if (pathname !== sectionPath) {
      e.preventDefault();
      window.location.href = `${sectionPath}#${id}`;
      setOpen(false);
      return;
    }
    handleSmoothScroll(e, id);
  };

  const specialPages = ['/personal-data', '/privacy-policy', '/user-agreement'];
  const isSpecial = specialPages.includes(pathname);

  if (isSpecial) {
    return (
      <header
        className={`w-full mb-[30px] h-[70px] xl:h-[80px] ${
          pathname.startsWith('/crovlya') ? 'bg-red' : 'bg-blue'
        } flex justify-center items-center px-[16px] xl:px-[40px] rounded-[12px] xl:rounded-[20px] relative`}>
        <Link href="/">
          <Logo />
        </Link>
      </header>
    );
  }

  return (
    <header
      className={`w-full mb-[30px] h-[70px] xl:h-[80px] ${
        pathname.startsWith('/crovlya') ? 'bg-red' : 'bg-blue'
      } flex justify-between items-center px-[16px] xl:px-[40px] rounded-[12px] xl:rounded-[20px] relative`}>
      <div className="mt-[2px] xl:mt-[5px]">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      {/* Бургер для мобилки */}
      <button
        className="xl:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        onClick={() => setOpen(!open)}>
        <span
          className={`
            block w-6 h-0.5 bg-white rounded transition-all duration-300
            ${
              open
                ? 'rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'mb-1 relative'
            }
          `}></span>
        <span
          className={`
            block w-6 h-0.5 bg-white rounded transition-all duration-300
            ${open ? 'opacity-0' : 'mb-1 relative'}
          `}></span>
        <span
          className={`
            block w-6 h-0.5 bg-white rounded transition-all duration-300
            ${
              open
                ? '-rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                : 'relative'
            }
          `}></span>
      </button>
      {/* Меню справа */}
      <nav
        aria-label="Главная навигация"
        className={`
          fixed top-0 sm:top-[15px] right-0 h-full w-full sm:max-w-[320px] ${
            pathname.startsWith('/crovlya') ? 'bg-red' : 'bg-blue'
          } z-40 flex flex-col items-center pt-[90px] px-[15px] gap-6
          transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}
          xl:static xl:translate-x-0 xl:flex-row xl:bg-transparent items-center xl:pt-0 xl:pr-0 xl:gap-[60px] xl:w-auto xl:max-w-none
        `}>
        <ul className="flex flex-col w-full xl:flex-row gap-6 xl:gap-[60px] text-white text-[20px] font-medium sm:items-end items-center">
          <li>
            <a
              href="#main"
              onClick={(e) => handleNavClick(e, 'main')}
              className="relative hover:text-gray-200 transition-colors cursor-pointer group">
              Главная
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="relative hover:text-gray-200 transition-colors cursor-pointer group">
              О продукции
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#catalog"
              onClick={(e) => handleNavClick(e, 'catalog')}
              className="relative hover:text-gray-200 transition-colors cursor-pointer group">
              Каталог
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          {pathname === '/crovlya' && (
            <li>
              <a
                href="#usage"
                onClick={(e) => handleNavClick(e, 'usage')}
                className="relative hover:text-gray-200 transition-colors cursor-pointer group">
                Применение
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          )}
          {pathname === '/crovlya' && (
            <li>
              <a
                href="#scheme"
                onClick={(e) => handleNavClick(e, 'scheme')}
                className="relative hover:text-gray-200 transition-colors cursor-pointer group">
                Схема монтажа
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          )}
          <li>
            <a
              href="#contacts"
              onClick={(e) => handleNavClick(e, 'contacts')}
              className="relative hover:text-gray-200 transition-colors cursor-pointer group">
              Контакты
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>
      </nav>
      {/* Затемнение фона при открытом меню */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-[50%] z-30 xl:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export { Header };
