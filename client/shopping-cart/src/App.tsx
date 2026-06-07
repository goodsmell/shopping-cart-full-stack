import { Route, Routes } from 'react-router';
import AppLayout from './components/layout/AppLayout';
import OrderConfirm from './pages/OrderConfirm';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ShoppingCart />} />
        <Route path="/order" element={<OrderConfirm />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
