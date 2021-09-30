/* eslint-disable max-len */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should be able to go through the history, both redoing and undoing, of color picking', () => {
    const { container } = render(<App />);
    expect(container).not.toBeEmptyDOMElement();

    const circle = screen.getByRole('display', { name: 'color-wheel' });
    expect(circle).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });

    const colorPicker = screen.getByRole('colorbox', { name: 'color-picker' });
    fireEvent.change(colorPicker, 'rgb(0, 0, 255)');
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });

    fireEvent.change(colorPicker, 'rbg(0, 255, 0)');
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 255, 0)' });
    });

    const undo = screen.getByText('undo');
    fireEvent.click(undo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });

    fireEvent.click(undo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
    });

    const redo = screen.getByText('redo');
    fireEvent.click(redo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });

    fireEvent.change(colorPicker, 'rbg(255, 255, 0)');
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(255, 255, 0)' });
    });

    fireEvent.click(undo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });

    fireEvent.click(undo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
    });

    fireEvent.click(redo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });

    fireEvent.click(redo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(255, 255, 0)' });
    });

    fireEvent.click(redo);
    waitFor(() => {
      expect(circle).toHaveStyle({ 'background-color': 'rgb(0, 0, 255)' });
    });
  });
});
