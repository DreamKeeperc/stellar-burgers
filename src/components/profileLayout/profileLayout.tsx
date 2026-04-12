import { Outlet } from 'react-router-dom';
import { ProfileMenu } from '@components';

export const ProfileLayout = () => (
  <div style={{ display: 'flex' }}>
    <Outlet />
  </div>
);
