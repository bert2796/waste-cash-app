import numeral from 'numeral';

export const capitalize = (word: string) =>
  `${word.charAt(0).toUpperCase()}${word.substring(1).toLowerCase()}`;

export const isValidEmail = (email: string) => {
  const regexp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return regexp.test(email);
};

export const formatPrice = (price: string | number) =>
  `\u20B1 ${numeral(price).format('0,0.00')}`;

export const summarizeText = (description: string) =>
  `${description.substring(0, 50)}${description.length >= 50 ? '...' : ''}`;

export const formatNotificationTitle = (event: string) => {
  let title = '';

  switch (event) {
    case 'create-product-offer':
      title = 'Offer';
      break;
  }

  return title;
};