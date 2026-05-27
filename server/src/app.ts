import express from 'express';
import productRouter from './routes/productsRoute';
import cartItemsRouter from './routes/cartItemsRoute';

const app = express();
app.use(express.json());

app.use('', productRouter);
app.use('', cartItemsRouter);

export default app;
