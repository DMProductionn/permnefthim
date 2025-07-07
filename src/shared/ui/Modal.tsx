'use client';

import { useState, useEffect } from 'react';
import { Button } from './Button';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useNotification } from './NotificationProvider';
import { sendToFormspree } from '../utils/formspreeService';
import Link from 'next/link';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

interface FormData {
  lastName: string;
  firstName: string;
  middleName: string;
  quantity: string;
  phone: string;
  email: string;
  company?: string;
  privacyConsent: boolean;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, productTitle }) => {
  const pathname = usePathname();
  const isHimPage = pathname.includes('/him');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess } = useNotification();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      privacyConsent: false,
    },
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sendToTelegram = async (data: FormData) => {
    const botToken = '8180694062:AAE4HYfx0uhtNEvnJq2Txs2lXKi-YFwIk6M';
    const chatId = '-4841505337'; // ID вашего канала

    const message = `
🛒 *Новый заказ товара*

📦 *Товар:* ${isHimPage ? '' : 'Кровля - '}${productTitle}
👤 *ФИО:* ${data.lastName} ${data.firstName} ${data.middleName || ''}
📱 *Телефон:* ${data.phone}
📧 *Email:* ${data.email}
🏢 *Компания:* ${data.company || 'Не указана'}
${!isHimPage ? `📊 *Количество листов:* ${data.quantity}` : ''}
🌐 *Страница:* ${isHimPage ? 'Химия' : 'Кровля'}

⏰ *Время заказа:* ${new Date().toLocaleString('ru-RU')}
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      console.log('Telegram ответ:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Telegram ошибка:', errorText);
        throw new Error(`Ошибка отправки в Telegram: ${response.status}`);
      }

      const result = await response.json();
      console.log('Telegram результат:', result);
      return true;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    console.log('Отправка заказа:', {
      productTitle,
      isHimPage,
      data,
    });

    try {
      const [telegramSuccess, formspreeSuccess] = await Promise.allSettled([
        sendToTelegram(data),
        sendToFormspree({
          name: `${data.lastName} ${data.firstName} ${data.middleName || ''}`.trim(),
          phone: data.phone,
          email: data.email,
          productTitle,
          quantity: data.quantity,
          company: data.company,
          type: 'order',
          page: isHimPage ? 'Химия' : 'Кровля',
        }),
      ]);

      const telegramOk = telegramSuccess.status === 'fulfilled' && telegramSuccess.value;
      const formspreeOk = formspreeSuccess.status === 'fulfilled' && formspreeSuccess.value;

      console.log('Результаты отправки:', { telegramOk, formspreeOk });

      if (telegramOk || formspreeOk) {
        showSuccess('Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
        onClose();
        reset();
      } else {
        alert('Ошибка при отправке заказа. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при отправке заказа:', error);
      alert('Ошибка при отправке заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 modal-overlay flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bg-white rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Заказать товар</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  ×
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{!isHimPage ? 'Цвет:' : 'Товар:'}</p>
                <p className="font-medium text-gray-900">{productTitle}</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className={`w-full px-3 py-2 border rounded-md outline-none border-gray-300`}
                    placeholder="Введите фамилию"
                    {...register('lastName')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className={`w-full px-3 py-2 border rounded-md outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введите имя"
                    {...register('firstName', { required: 'Введите имя' })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="middleName"
                    className="block text-sm font-medium text-gray-700 mb-1">
                    Отчество
                  </label>
                  <input
                    type="text"
                    id="middleName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    placeholder="Введите отчество"
                    {...register('middleName')}
                  />
                </div>
                {!isHimPage && (
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-1">
                      Количество листов *
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      className={`w-full px-3 py-2 border rounded-md outline-none ${
                        errors.quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Введите количество"
                      min="1"
                      {...register('quantity', {
                        required: 'Введите количество листов',
                        min: { value: 1, message: 'Количество должно быть больше 0' },
                      })}
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                    )}
                  </div>
                )}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Компания
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                    placeholder="Введите название компании"
                    {...register('company')}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Номер телефона *
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      required: 'Введите телефон',
                      pattern: {
                        value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                        message: 'Введите корректный номер',
                      },
                    }}
                    render={({ field }) => (
                      <IMaskInput
                        {...field}
                        mask="+{7} (000) 000-00-00"
                        unmask={false}
                        placeholder="+7 (___) ___-__-__"
                        className={`w-full px-3 py-2 border rounded-md outline-none ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-3 py-2 border rounded-md outline-none ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                    {...register('email', {
                      required: 'Введите email',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    {...register('privacyConsent', {
                      required: 'Необходимо согласие на обработку персональных данных',
                    })}
                  />
                  <label htmlFor="privacyConsent" className="text-sm text-gray-700 leading-relaxed">
                    Я согласен на{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-blue-600 hover:text-blue-800 underline">
                      обработку персональных данных
                    </Link>{' '}
                    в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных
                    данных»
                  </label>
                </div>
                {errors.privacyConsent && (
                  <p className="text-red-500 text-sm mt-1">{errors.privacyConsent.message}</p>
                )}

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Заказать'}
                  </Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={isSubmitting}>
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
