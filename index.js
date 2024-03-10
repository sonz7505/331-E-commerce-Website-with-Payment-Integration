const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟商品数据存储
let products = [
  { id: 1, name: 'Product 1', price: 50 },
  { id: 2, name: 'Product 2', price: 30 },
  // 添加更多商品...
];

// 购物车数据
let shoppingCart = [];

// 处理获取所有商品的请求
app.get('/products', (req, res) => {
  res.json({ products });
});

// 处理添加商品到购物车的请求
app.post('/cart/add', (req, res) => {
  const productId = req.body.productId;
  const product = products.find((p) => p.id === productId);

  if (product) {
    shoppingCart.push(product);
    res.json({ message: 'Product added to cart successfully', cart: shoppingCart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// 处理查看购物车的请求
app.get('/cart', (req, res) => {
  res.json({ cart: shoppingCart });
});

// 处理支付请求
app.post('/checkout', (req, res) => {
  // 在实际应用中，这里需要集成真实的支付处理服务，如Stripe、PayPal等
  // 这里仅作为示例，简单返回成功消息
  shoppingCart = []; // 清空购物车
  res.json({ message: 'Payment successful. Thank you for your purchase!' });
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
