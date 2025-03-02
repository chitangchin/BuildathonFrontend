// __tests__/integration/MapRoute.integration.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapRoute from '../../app/page';

// Mock the Loader so that it immediately resolves.
jest.mock('@googlemaps/js-api-loader', () => ({
  Loader: jest.fn().mockImplementation(() => ({
    load: jest.fn().mockResolvedValue({}),
  })),
}));

beforeAll(() => {
  global.google = {
    maps: {
      Map: jest.fn().mockImplementation(() => ({})),
      DirectionsService: jest.fn().mockImplementation(() => ({ dummy: true })),
      DirectionsRenderer: jest.fn().mockImplementation(() => ({ dummy: true })),
      places: {
        PlacesService: jest.fn().mockImplementation(() => ({ dummy: true })),
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

describe('MapRoute Integration Tests', () => {
  beforeEach(() => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('alerts when inputs are empty', async () => {
    render(<MapRoute />);
    
    // Wait for initialization (e.g., for the button to be rendered).
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Calculate Route/i })).toBeInTheDocument();
    });
    
    // At this point, the component should have set up the services and refs.
    // Ensure inputs remain empty and then click the button.
    fireEvent.click(screen.getByRole('button', { name: /Calculate Route/i }));
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Please enter both start and destination locations');
    });
  });
});
