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

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonColor?: 'red' | 'blue';
}

interface FormData {
  name: string;
  phone: string;
  privacyConsent: boolean;
}

export const SimpleModal: React.FC<SimpleModalProps> = ({
  isOpen,
  onClose,
  buttonColor = 'red',
}) => {
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

  // Закрытие модального окна по Escape
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
📞 *Заявка на обратный звонок*

👤 *Имя:* ${data.name}
📱 *Телефон:* ${data.phone}
🌐 *Страница:* ${isHimPage ? 'Химия' : 'Кровля'}

⏰ *Время заявки:* ${new Date().toLocaleString('ru-RU')}
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

      if (!response.ok) {
        throw new Error('Ошибка отправки в Telegram');
      }

      return true;
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      return false;
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Отправляем в Telegram и на Formspree одновременно
      const [telegramSuccess, formspreeSuccess] = await Promise.allSettled([
        sendToTelegram(data),
        sendToFormspree({
          name: data.name,
          phone: data.phone,
          type: 'callback',
          page: isHimPage ? 'Химия' : 'Кровля',
        }),
      ]);

      const telegramOk = telegramSuccess.status === 'fulfilled' && telegramSuccess.value;
      const formspreeOk = formspreeSuccess.status === 'fulfilled' && formspreeSuccess.value;

      if (telegramOk || formspreeOk) {
        showSuccess('Заявка успешно отправлена! Мы перезвоним вам в ближайшее время.');
        onClose();
        reset();
      } else {
        alert('Ошибка при отправке заявки. Попробуйте еще раз.');
      }
    } catch (error) {
      alert('Ошибка при отправке заявки. Попробуйте еще раз.');
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
            className="bg-white rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Мы вам перезвоним</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold">
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Имя *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`w-full px-3 py-2 border rounded-md outline-none ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Введите ваше имя"
                    {...register('name', { required: 'Введите имя' })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
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

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    className="mt-1 w-9 h-9 sm:w-4 sm:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
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
                  <Button
                    type="submit"
                    color={pathname === '/crovlya' ? 'red' : 'blue'}
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
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
