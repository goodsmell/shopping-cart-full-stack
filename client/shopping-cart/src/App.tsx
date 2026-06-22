import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import PaymentConfirm from './pages/PaymentConfirm';
import ShoppingCart from './pages/ShoppingCart';
import OrderCheck from './pages/OrderCheck';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/order-check" element={<OrderCheck />} />
        <Route path="/payment-confirm" element={<PaymentConfirm />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
