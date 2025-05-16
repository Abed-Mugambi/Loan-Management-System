
import React from 'react'; // Add this import

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../client/src/components/auths/Login';
import * as toastify from 'react-toastify'; // Add this

describe('Login Component', () => {
  const setAuth = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            token: 'mock-token',
          }),
        ok: true,
      })
    );
    // Mock ToastContainer (simplify by mocking react-toastify)
    // Mock react-toastify
  jest.spyOn(toastify, 'toast').mockImplementation(() => {});
  toastify.toast.promise = jest.fn(() => Promise.resolve()); // Mock toast.promise
  });

  test('should render login form correctly', () => {
    render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('******************')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  test('should update input values on change', () => {
    render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('******************');

    fireEvent.change(usernameInput, { target: { value: 'abed' } });
    fireEvent.change(passwordInput, { target: { value: 'abed123' } });

    expect(usernameInput.value).toBe('abed');
    expect(passwordInput.value).toBe('abed123');
  });

  test('should submit form and set auth on success', async () => {
    render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('******************');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'abed' } });
    fireEvent.change(passwordInput, { target: { value: 'abed123' } });
    fireEvent.click(submitButton);

    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ username: 'abed', password: 'abed123' }),
    });

    await waitFor(() => {
      expect(setAuth).toHaveBeenCalledWith(true);
    }, { timeout: 4000 });
  });

  test('should not call setAuth if no token is returned', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({}),
      ok: true,
    });

    render(
      <MemoryRouter>
        <Login setAuth={setAuth} />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('******************');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'abed' } });
    fireEvent.change(passwordInput, { target: { value: 'abed123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(setAuth).not.toHaveBeenCalled();
    });
  });
});