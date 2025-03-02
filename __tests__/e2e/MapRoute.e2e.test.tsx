import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapRoute from '../../app/page';

beforeAll(() => {
  global.google = {
    maps: {
      Map: jest.fn().mockImplementation(() => ({ setMap: jest.fn() })),
      DirectionsService: jest.fn().mockImplementation(() => ({
        route: jest.fn((req, callback) => {
          // Simulate a successful route response.
          callback({ routes: [{ legs: [] }] }, 'OK');
        }),
      })),
      DirectionsRenderer: jest.fn().mockImplementation(() => ({ setDirections: jest.fn() })),
      places: {
        PlacesService: jest.fn().mockImplementation(() => ({
          nearbySearch: jest.fn((req, callback) => callback([], 'OK')),
        })),
        Autocomplete: jest.fn().mockImplementation(() => ({})),
      },
      geometry: {
        poly: {
          isLocationOnEdge: jest.fn().mockReturnValue(true),
          containsLocation: jest.fn().mockReturnValue(true),
        },
      },
      TravelMode: { WALKING: 'WALKING' },
      DirectionsStatus: { OK: 'OK' },
    },
  } as any;
});

describe('MapRoute E2E Tests', () => {
  test('full user flow: renders component, inputs values, calculates route, and shows map container', async () => {
    render(<MapRoute />);
    expect(screen.getByLabelText(/Starting Point/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate Route/i })).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Enter starting location/i), { target: { value: 'New York' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter destination/i), { target: { value: 'Los Angeles' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Route/i }));

    await waitFor(() => {
      expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });
  });
});
