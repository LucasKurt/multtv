import { Routes, Route } from 'react-router-dom'

import Ams from './pages/Ams';
import Oms from './pages/Oms';
import Sms from './pages/Sms';
import Ums from './pages/Ums';

export default function MainRoutes() {
  return(
    <Routes>
      <Route path="/" element={<Ams />}/>
      <Route path="/ams" element={<Ams />}/>
      <Route path="/oms" element={<Oms />}/>
      <Route path="/sms" element={<Sms />}/>
      <Route path="/ums" element={<Ums />}/>
    </Routes>
  );
}