# Advertisement rule system

The following is a hack at solving a rules based checkout test.

## Requirements

Ideally, Node version `>10` and above

## Installation

```bash
node main.js
```

## Testing

Comment/uncomment the following lines to test different scenarios

```javascript
/* Sample input 2 */
const co = new Checkout(pricingRules, "secondBite");
co.scan(PRODUCTS.classic);
co.scan(PRODUCTS.classic);
co.scan(PRODUCTS.classic);
co.scan(PRODUCTS.premium);
```

## Things I could improve

- Adding unit tests to cover more scenarios
- Using typescript to make code more readable
- Creating a UI demonstrating React.JS skills
- Maybe use class based approach? I've used a functional approach since I am more comfortable with this approach

## License

[MIT](https://choosealicense.com/licenses/mit/)
