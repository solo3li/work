import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Login from '../components/Login';
import TodoList from '../components/TodoList';
import { StatusBar } from 'expo-status-bar';

export default function Index() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      <StatusBar style="auto" />
      {isAuthenticated ? <TodoList /> : <Login />}
    </>
  );
}
