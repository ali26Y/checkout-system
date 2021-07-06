const { PRODUCTS, CUSTOMERS } = require("./products");
const { pricingRules, rules } = require("./rules");

const Checkout = function (pricingRules, customer = "default") {
  let ruleFns = [];
  const items = [];

  function init() {
    ruleFns = pricingRules.map((r) => {
      return rules[r.type]({ ...r.params, customer });
    });
  }

  function scan(item) {
    items.push(item);
  }

  function reduce() {
    let progressive;

    while (ruleFns.length > 0) {
      const ruleFn = ruleFns.shift();
      progressive = ruleFn(progressive || items);
    }

    return progressive;
  }

  function total() {
    const reducedSale = reduce();

    const amt = reducedSale.reduce((prev, next) => {
      prev += next.price;
      return prev;
    }, 0);

    const orderedItems = items.map((i) => i.id).join("', '");

    console.log(`Customer: ${CUSTOMERS[customer]}`);
    console.log(`Items: '${orderedItems}'`);
    console.log(`Total: ${format(amt)}`);
  }

  const format = (num) =>
    num.toLocaleString("en", { style: "currency", currency: "USD" });

  init();

  return {
    scan,
    total,
    customer,
  };
};

/* Sample input 1 */
const co = new Checkout(pricingRules, "default");
co.scan(PRODUCTS.classic);
co.scan(PRODUCTS.standout);
co.scan(PRODUCTS.premium);

/* Sample input 2 */
// const co = new Checkout(pricingRules, "secondBite");
// co.scan(PRODUCTS.classic);
// co.scan(PRODUCTS.classic);
// co.scan(PRODUCTS.classic);
// co.scan(PRODUCTS.premium);

/* Sample input 3 */
// const co = new Checkout(pricingRules, "axilCoffee");
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.premium);

/* Sample input 4 */
// const co = new Checkout(pricingRules, "myer");
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.standout);
// co.scan(PRODUCTS.premium);

co.total();
