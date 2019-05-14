const getDiscountUser = (order) => {
  let user = order.user;
  let billType = order.bill.type;
  let discount = 0;

  if (billType != 'groceries') {
    switch(user.type) {
      case 'employee':
        discount = 30;
        break;
      case 'affiliate':
        discount = 10;
        break;
      case 'customer':
        if (user.createAt > 2) {
          discount = 5;
        }
        break;
    }
  }

  const resultDiscount = (100 - discount) * order.bill.total / 100;
  order.bill.total = resultDiscount;

  return order;
};

const getDiscountBill = (order) => {
  let totalDiscount = 0;

  if (order.bill.total > 100) {
    let sumOf100 = (order.bill.total - (order.bill.total % 100)) /100;
    totalDiscount = sumOf100 * 5;
  } else {
    if (order.bill.total == 100) {
      totalDiscount = 5;
    }
  }

  order.bill.total = order.bill.total - totalDiscount;

  return order;
};

const generateFinalBill = (order) => {
  order = getDiscountUser(order);
  order = getDiscountBill(order);

  return order;
};

module.exports = {
  generateFinalBill
}