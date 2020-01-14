export const promoPrice = (price, discount) => {
  if (price == null ||
    discount == null ||
    isNaN(price) ||
    isNaN(discount) ||
    price < 0 ||
    discount < 0) {
    return null;
  }
  return (price * (100 - discount) / 100).toFixed(2);
};
