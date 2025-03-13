import { render, screen, fireEvent } from '@testing-library/react';
import Dialog from '../components/Dialog';
import { describe, test, expect, vi } from 'vitest'; // Vitest imports


describe('Dialog Component', () => {
  const message = 'Are you sure you want to delete this item?';
  const onClose = vi.fn();
  const onConfirm = vi.fn();

  test('renders the dialog when isOpen is true', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} onConfirm={onConfirm} message={message} />
    );

    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  test('does not render the dialog when isOpen is false', () => {
    render(
      <Dialog isOpen={false} onClose={onClose} onConfirm={onConfirm} message={message} />
    );

    const dialogElement = screen.queryByRole('dialog');
    expect(dialogElement).not.toBeInTheDocument();
  });

  test('displays the correct message', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} onConfirm={onConfirm} message={message} />
    );

    const messageElement = screen.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });

  test('calls onClose when the "Cancel" button is clicked', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} onConfirm={onConfirm} message={message} />
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('calls onConfirm when the "Confirm" button is clicked', () => {
    render(
      <Dialog isOpen={true} onClose={onClose} onConfirm={onConfirm} message={message} />
    );

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});