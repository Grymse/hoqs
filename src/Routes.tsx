import { Route, Routes } from 'react-router-dom';
import NotFound from './routes/not-found';
import Cabinets from './routes/cabinets/cabinets';
import About from './routes/about';
import Login from './routes/login';
import Cabinet from './routes/cabinets/cabinet';
import License from './routes/license';
import { EditCabinet } from './routes/cabinets/edit';

export default () => (
  <Routes>
    <Route path="/" element={<Cabinets />} />
    <Route path="/cabinets" element={<Cabinets />} />
    <Route path="/cabinets/:id" element={<Cabinet />} />
    <Route path="/cabinets/:id/edit" element={<EditCabinet />} />
    {/* <Route path="/drivers" element={<Drivers />} /> */}
    <Route path="/login" element={<Login />} />
    <Route path="/about" element={<About />} />
    <Route path="/license" element={<License />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
