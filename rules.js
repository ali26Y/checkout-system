const pricingRules = [
  {
    type: "PAY_TWO_OF_THREE_ADS",
    params: {
      id: "classic",
      selectedCustomers: ["secondBite"],
    },
  },
  {
    type: "FLAT_DISCOUNT",
    params: {
      id: "standout",
      discountedPrice: 299.99,
      selectedCustomers: ["axilCoffee"],
    },
  },
  {
    type: "PAY_FOUR_OF_FIVE_ADS",
    params: {
      id: "standout",
      selectedCustomers: ["myer"],
    },
  },
  {
    type: "FLAT_DISCOUNT",
    params: {
      id: "premium",
      discountedPrice: 389.99,
      selectedCustomers: ["myer"],
    },
  },
];

const rules = {
  PAY_TWO_OF_THREE_ADS:
    ({ id, customer, selectedCustomers }) =>
    (transaction) => {
      let count = 0;

      return transaction.reduce((prev, next) => {
        if (next.id === id && selectedCustomers.includes(customer)) {
          count++;
        }

        if (count !== 0 && count % 3 === 0) {
          count = 0;
          return prev;
        }

        prev.push(next);
        return prev;
      }, []);
    },

  FLAT_DISCOUNT:
    ({ id, discountedPrice, customer, selectedCustomers }) =>
    (transaction) => {
      let useDiscountedPrice =
        selectedCustomers.includes(customer) &&
        transaction.filter((t) => t.id === id);

      if (!useDiscountedPrice) {
        return transaction;
      }

      return transaction.map((x) => {
        if (x.id === id) {
          x.price = discountedPrice;
        }
        return x;
      });
    },

  PAY_FOUR_OF_FIVE_ADS:
    ({ id, customer, selectedCustomers }) =>
    (transaction) => {
      let count = 0;

      return transaction.reduce((prev, next) => {
        if (next.id === id && selectedCustomers.includes(customer)) {
          count++;
        }

        if (count !== 0 && count % 4 === 0) {
          count = 0;
          return prev;
        }

        prev.push(next);
        return prev;
      }, []);
    },
};

module.exports = {
  pricingRules,
  rules,
};
