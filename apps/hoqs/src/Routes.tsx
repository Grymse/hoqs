import { Route, Routes } from 'react-router-dom';
import Index from './routes/index';
import NotFound from './routes/not-found';
import Cabinets from './routes/cabinets/cabinets';
import Drivers from './routes/drivers/drivers';
import Login from './routes/login';
import Cabinet from './routes/cabinets/cabinet';

export default () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/cabinets" element={<Cabinets />} />
    <Route path="/cabinet/:id" element={<Cabinet />} />
    <Route path="/drivers" element={<Drivers />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
