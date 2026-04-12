import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { getUserSelector } from '../../services/slices/userSlice/userSlice';
import { ProtectedRouteProps } from './types';

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const { data, isAuthChecked } = useSelector(getUserSelector);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !data) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && data) {
    const from = location.state?.from || { pathname: '/profile' };
    return <Navigate replace to={from} />;
  }

  return children;
};

export default ProtectedRoute;
