import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationPage from './RegistrationPage';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


const renderRegister = () =>
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>
  );

describe('RegistrationPage', () => {
  it('renders input fields', () => {
    renderRegister();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  it('registers user successfully', async () => {
    axios.post.mockResolvedValue({
      data: { message: 'Registered successfully' }
    });
  
    renderRegister();
  
    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'Jayanga' }
    });
  
    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: 'jay' }
    });
  
    fireEvent.click(screen.getByText(/sign up/i));
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });  

  it('shows error on registration failure', async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: 'Username already exists' } }
    });

    renderRegister();

    fireEvent.change(screen.getByPlaceholderText(/enter your name/i), {
      target: { value: 'Test' }
    });

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: 'existing' }
    });

    fireEvent.click(screen.getByText(/sign up/i));

    await waitFor(() =>
      expect(screen.getByText(/username already exists/i)).toBeInTheDocument()
    );
  });
});
