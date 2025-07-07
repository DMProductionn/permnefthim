export const sendToFormspree = async (data: {
  name: string;
  phone: string;
  email?: string;
  productTitle?: string;
  quantity?: string;
  company?: string;
  message?: string;
  type: 'order' | 'callback' | 'simple';
  page: string;
}) => {
  try {
    // ID формы Formspree (нужно будет заменить на ваш)
    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xrbkvyqr';

    // Создаем объект данных для JSON API
    const formData: any = {
      name: data.name,
      phone: data.phone,
      page: data.page,
      timestamp: new Date().toLocaleString('ru-RU'),
    };

    // Добавляем заголовок в зависимости от типа
    if (data.type === 'order') {
      formData._subject = `Заказ товара с ${data.page}`;
    } else if (data.type === 'callback') {
      formData._subject = `Заявка на обратный звонок с ${data.page}`;
    } else {
      formData._subject = `Заявка с ${data.page}`;
    }

    // Добавляем только заполненные поля
    if (data.email && data.email.trim()) {
      formData.email = data.email;
    }
    if (data.productTitle && data.productTitle.trim()) {
      formData.productTitle = data.productTitle;
    }
    if (data.quantity && data.quantity.trim()) {
      formData.quantity = data.quantity;
    }
    if (data.company && data.company.trim()) {
      formData.company = data.company;
    }
    if (data.message && data.message.trim()) {
      formData.message = data.message;
    }

    console.log('Отправка в Formspree:', formData);

    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Formspree ответ:', response.status, response.statusText);

    if (response.ok) {
      const result = await response.json();
      console.log('Formspree результат:', result);
      return true;
    }

    const errorText = await response.text();
    console.error('Formspree ошибка:', errorText);
    throw new Error(`Ошибка отправки через Formspree: ${response.status}`);
  } catch (error) {
    console.error('Ошибка отправки через Formspree:', error);
    return false;
  }
};
