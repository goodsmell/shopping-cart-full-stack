import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import PaymentConfirm from './pages/PaymentConfirm';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/order" element={<PaymentConfirm />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
