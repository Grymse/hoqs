import {
  Cabinet,
  Cabinets,
  Drivers,
  EditDriver,
  Index,
  About,
  EditCabinet,
  Driver,
  Login,
  License,
  NotFound,
  WikiPage,
  Wiki,
  EditWikiPage,
} from '@hoqs/core';

import { Route, Routes } from 'react-router-dom';

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/cabinets" element={<Cabinets />} />
      <Route path="/cabinets/:id" element={<Cabinet />} />
      <Route path="/cabinets/:id/edit" element={<EditCabinet />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/drivers/:id" element={<Driver />} />
      <Route path="/drivers/:id/edit" element={<EditDriver />} />
      <Route path="/wiki" element={<Wiki />} />
      <Route path="/wiki/:id" element={<WikiPage />} />
      <Route path="/wiki/:id/edit" element={<EditWikiPage />} />
      <Route path="/wiki" element={<Wiki />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/license" element={<License />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
