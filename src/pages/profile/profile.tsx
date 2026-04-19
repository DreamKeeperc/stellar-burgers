import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import {
  getUserSelector,
  updateUser
} from '../../services/slices/userSlice/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(getUserSelector);
  /** TODO: взять переменную из стора */
  const user = {
    name: data?.name || '',
    email: data?.email || ''
  };

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [data]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const updatedData: Partial<TRegisterData> = {};

    if (formValue.name !== user?.name) {
      updatedData.name = formValue.name;
    }
    if (formValue.email !== user?.email) {
      updatedData.email = formValue.email;
    }
    if (formValue.password) {
      updatedData.password = formValue.password;
    }

    try {
      dispatch(updateUser(updatedData));
    } catch (err) {
      console.error('Ошибка', err);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
