'use client';

import { Telegram } from '@/shared/icons/Telegram';
import { WhatsApp } from '@/shared/icons/WhatsApp';
import { Button } from '@/shared/ui/Button';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';
import { useNotification } from '@/shared/ui/NotificationProvider';
import { sendToFormspree } from '../../../shared/utils/formspreeService';
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  privacyConsent: boolean;
}

export const Contacts: React.FC = () => {
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

  const sendToTelegram = async (data: FormData) => {
    const botToken = '8180694062:AAE4HYfx0uhtNEvnJq2Txs2lXKi-YFwIk6M';
    const chatId = '-4841505337'; // ID вашего канала

    const message = `
📞 *Перезвоните*

👤 *Имя:* ${data.name}
📱 *Телефон:* ${data.phone}
🌐 *Страница:* Химия

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
      const [telegramSuccess, formspreeSuccess] = await Promise.allSettled([
        sendToTelegram(data),
        sendToFormspree({
          name: data.name,
          phone: data.phone,
          type: 'simple',
          page: 'Химия',
        }),
      ]);

      const telegramOk = telegramSuccess.status === 'fulfilled' && telegramSuccess.value;
      const formspreeOk = formspreeSuccess.status === 'fulfilled' && formspreeSuccess.value;

      if (telegramOk || formspreeOk) {
        showSuccess('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
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

  return (
    <section id="contacts">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}>
        <p className="text-[24px] sm:text-[36px] font-[400] text-center leading-[128%]">
          общество с ограниченной ответственностью
        </p>
        <p className="text-[32px] sm:text-[50px] text-center font-[700] leading-[128%]">
          ПЕРМНЕФТЕХИМ
        </p>
        <p className="text-[18px] sm:text-[24px] text-center font-[400]">
          Г. Пермь ИНН: 5906166188
        </p>
      </motion.div>
      <div className="flex flex-wrap justify-center gap-y-[40px] gap-x-[60px] sm:justify-between mt-[40px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}>
          <p className="text-[24px] sm:text-[36px] font-[600] text-center leading-[128%]">
            E - mail
          </p>
          <p className="text-[18px] sm:text-[28px] font-[400] text-center leading-[128%]">
            pnh.perm@yandex.ru
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center items-center">
          <p className="text-[24px] sm:text-[36px] font-[600] text-center leading-[128%]">
            телефон для связи
          </p>
          <p className="text-[18px] sm:text-[28px] font-[400] text-center leading-[128%]">
            +7 902 475 5774
          </p>
          <div className="flex gap-[20px] items-center mt-[10px]">
            <a href="https://t.me/ALEKS20230" target="_blank" rel="noopener noreferrer">
              <Telegram />
            </a>
            <a href="https://wa.me/79024755774" target="_blank" rel="noopener noreferrer">
              <WhatsApp />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-[40px]">
        <p className="text-[32px] sm:text-[50px] text-center font-[700] leading-[128%]">
          Мы Вам перезвоним
        </p>
        <p className="text-[16px] sm:text-[20px] font-[400] text-center mt-[5px]">
          Если у вас возникли какие - то вопросы или проблемы, заполните <br /> форму и мы Вам
          перезвоним.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center mt-[20px]">
          <div className="w-full max-w-[400px]">
            <input
              placeholder="Ваше имя"
              className={`border ${
                errors.name && 'border-red'
              } rounded-[12px] pl-[15px] w-full h-[48px]`}
              type="text"
              {...register('name', { required: 'Введите имя' })}
            />
            {errors.name && <p className="text-red text-[14px] mt-1">{errors.name.message}</p>}
          </div>
          <div className="w-full max-w-[400px]">
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
                  className={`border ${
                    errors.phone && 'border-red'
                  } rounded-[12px] pl-[15px] w-full h-[48px]`}
                />
              )}
            />
            {errors.phone && <p className="text-red text-[14px] mt-1">{errors.phone.message}</p>}
          </div>

          <div className="w-full max-w-[400px]">
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
                в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных»
              </label>
            </div>
            {errors.privacyConsent && (
              <p className="text-red text-[14px] mt-1">{errors.privacyConsent.message}</p>
            )}
          </div>

          <Button color="blue" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};
