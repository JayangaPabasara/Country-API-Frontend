import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders login and favorite buttons when not logged in', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByTitle(/login/i)).toBeInTheDocument();
    expect(screen.getByTitle(/favorites/i)).toBeInTheDocument();
  });

  it('shows user icon and logout when logged in', () => {
    localStorage.setItem('token', 'testtoken');
    localStorage.setItem('username', 'Jayanga');

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/usericon/i)).toBeInTheDocument();
  });
});
