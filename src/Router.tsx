import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './routes';
import NotFound from './routes/not-found';
import Cabinets from './routes/cabinets/cabinets';
import Drivers from './routes/drivers/drivers';
import Login from './routes/login';
import Navbar from './components/Navbar';

export default () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cabinets" element={<Cabinets />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
