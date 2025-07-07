'use client';

import { Logo } from '@/shared/ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Footer: React.FC = () => {
  const pathname = usePathname();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const specialPages = ['/personal-data', '/privacy-policy', '/user-agreement'];
  const isSpecial = specialPages.includes(pathname);

  if (isSpecial) {
    return (
      <footer className="text-white px-[40px] pt-[30px] pb-[40px] bg-[#232323] flex justify-center">
        <Logo size="118" />
      </footer>
    );
  }

  return (
    <footer className=" text-white px-[40px] pt-[30px] pb-[40px] bg-[#232323] flex justify-between">
      <div className="flex flex-col sm:flex-row gap-[40px] w-full items-center">
        <div className="flex flex-col items-center sm:items-start">
          <Logo size="118" />
          <p>
            © {new Date().getFullYear()} ПЕРМНЕФТЕХИМ <br />{' '}
            <span className="text-[14px]">Все права защищены</span>
          </p>
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="text-center sm:text-start flex flex-col sm:flex-row w-full gap-[40px] sm:flex-ro md:items-start justify-between">
            <ul>
              <li className="mb-[20px] font-[600]">Навигация</li>
              <li className="text-[14px] mb-[5px]">
                <a
                  href="#main"
                  onClick={(e) => handleSmoothScroll(e, 'main')}
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Главная
                </a>
              </li>
              <li className="text-[14px] mb-[5px]">
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  О продукции
                </a>
              </li>
              <li className="text-[14px] mb-[5px]">
                <a
                  href="#catalog"
                  onClick={(e) => handleSmoothScroll(e, 'catalog')}
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Каталог
                </a>
              </li>
              {pathname === '/crovlya' && (
                <li className="text-[14px] mb-[5px]">
                  <a
                    href="#usage"
                    onClick={(e) => handleSmoothScroll(e, 'usage')}
                    className="hover:text-gray-300 transition-colors cursor-pointer">
                    Где применяют композитпласт
                  </a>
                </li>
              )}
              {pathname === '/crovlya' && (
                <li className="text-[14px] mb-[5px]">
                  <a
                    href="#scheme"
                    onClick={(e) => handleSmoothScroll(e, 'scheme')}
                    className="hover:text-gray-300 transition-colors cursor-pointer">
                    Схема монтажа
                  </a>
                </li>
              )}
              <li className="text-[14px]">
                <a
                  href="#contacts"
                  onClick={(e) => handleSmoothScroll(e, 'contacts')}
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Контакты
                </a>
              </li>
            </ul>
            <ul>
              <li className="mb-[20px] font-[600]">Наши контакты</li>
              <li className="text-[14px] mb-[5px]">Телефон</li>
              <li className="text-[14px] mb-[5px]">+7 (902) 475 57 74</li>
              <li className="text-[14px] mb-[5px]">Email</li>
              <li className="text-[14px] mb-[5px]">pnh.perm@yandex.ru</li>
            </ul>
            <ul>
              <li className="mb-[20px] font-[600]">Информация</li>
              <li className="text-[14px] mb-[5px]">
                <Link
                  href="/user-agreement"
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Пользовательское соглашение
                </Link>
              </li>
              <li className="text-[14px] mb-[5px]">
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Политика конфиденциальности
                </Link>
              </li>
              <li className="text-[14px] mb-[5px]">
                <Link
                  href="/personal-data"
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Согласие на обработку персональных данных
                </Link>
              </li>
              <li className="text-[14px] mb-[5px]">
                <a
                  href="https://t.me/slavdah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  Официальный ткг «Славная кровля»
                </a>
              </li>
              <li className="text-[14px] mb-[5px]">
                <Link href="/him" className="hover:text-gray-300 transition-colors cursor-pointer">
                  ПЕРМНЕФТЕХИМ-Химия
                </Link>
              </li>
              <li className="text-[14px] mb-[5px]">
                <Link
                  href="/crovlya"
                  className="hover:text-gray-300 transition-colors cursor-pointer">
                  ПЕРМНЕФТЕХИМ-Кровля
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
