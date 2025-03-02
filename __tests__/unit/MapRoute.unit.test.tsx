import React from 'react';
import { render, screen } from '@testing-library/react';
import MapRoute from '../../app/page';

beforeAll(() => {
  // Minimal global mock for Google Maps API.
  global.google = {
    maps: {
      Map: jest.fn(),
      DirectionsService: jest.fn(),
      DirectionsRenderer: jest.fn(),
      places: {
        PlacesService: jest.fn(),
        Autocomplete: jest.fn(),
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

describe('MapRoute Unit Tests', () => {
  test('renders starting point input, destination input, and calculate button', () => {
    render(<MapRoute />);
    expect(screen.getByLabelText(/Starting Point/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Destination/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate Route/i })).toBeInTheDocument();
  });
});
