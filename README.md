# POINT

[![CI Build and Test Validation](https://github.com/chitangchin/BuildathonFrontend/actions/workflows/buildandtestval.yml/badge.svg)](https://github.com/chitangchin/BuildathonFrontend/actions/workflows/buildandtestval.yml)

## Overview

When people travel, they often miss out on fascinating landmarks or local points of interest, or they simply wish they’d known more about them beforehand. Our app fixes that by tracking every noteworthy spot along your route and providing you with a deep dive into its history. Whether it’s a well-known sight or a hidden gem, we’ll make sure you’re fully immersed in the story behind it—so you can get the most out of your journey, every step of the way.

## Features

- **Route Calculation:** Input a starting location and destination to compute the optimal route.
- **Points of Interest Display:** View notable locations along the route with relevant details.
- **Audio Playback:** Listen to descriptions of select POIs.
- **Interactive Map:** Visual representation of routes and POIs using a mapping service.
- **Responsive Design:** Optimized for various devices and screen sizes.

## Technologies Used

- **Frontend Framework:** Next.js (React-based framework)
- **TypeScript:** For type-safe JavaScript development
- **Styling:** Tailwind CSS
- **Mapping Library:** (Specify the mapping service used, e.g., Google Maps API or Mapbox)
- **State Management:** (Specify if using Context API, Redux, or other state management libraries)
- **API Integration:** Communication with the backend Flask API

## Demo for desktop/laptop

1. Add the start and end destination, view some point of interests on the map:
   
![2025-03-0209-31-54-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/f023f964-4ff8-4870-8404-3e2356e6eee5)

2. Choose which landmarks/point of interests you want to learn more about

![2025-03-0209-31-54-ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/09000eca-dd6d-498e-849f-5548e5cb56bb)

3. Have full control in listening to the description

![2025-03-0209-31-54-ezgif com-video-to-gif-converter (2)](https://github.com/user-attachments/assets/485b478b-d2bf-419b-9d56-013b1d295895)

## Demo for mobile: **Pixel 7 Dimensions**

1. Add the start and end destination, view some point of interests on the map:

![2025-03-0209-34-12-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e14646d0-27df-4b64-bdcb-1e80cd55fc2c)

2. Choose the landmark/point of interest you are interested in

![2025-03-0209-34-12-ezgif com-video-to-gif-converter (1)](https://github.com/user-attachments/assets/63eab5cd-f2cc-4ca7-bd56-a0c2857b2047)

3. Have full control in mobile

![2025-03-0209-34-12-ezgif com-video-to-gif-converter (2)](https://github.com/user-attachments/assets/0c2a40dc-333b-4ad8-bc12-c4d2bdbc0fb7)

## Installation & Setup

### Prerequisites

- Node.js (23.x)
- npm
- API key for google map
### Steps
1. [**Fork the repository:**](https://github.com/chitangchin/BuildathonFrontend/fork)

2. **Clone the repository:**

   ```bash
   git clone https://github.com/craftingweb/Buildathon.git
   cd Buildathon
   ```

3. **Install dependencies & build:**

   ```bash
   npm install
   npm run build
   ```

4. **Set up environment variables:**

   Create a `.env.local` file in the project root with the following variables:

   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxxx
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000/`.

5. **Run the backend server locally:**

The repo is available at: [BuildathonBackend](https://github.com/chitangchin/BuildathonBackend)

## API Integration

The frontend interacts with the backend Flask API to fetch route details and audio descriptions.

### Checking the health of the backend server

- **Endpoint:** `/health`
- **Method:** `GET`
- **Response:**

  ```json
  {
    "status": "healthy"
  }
  ```

### Fetching Location Information (Text Only)

- **Endpoint:** `/get-location-info`
- **Method:** `GET`
- **Query Parameters:**
  - `place`: Name of the location (e.g., `?place=Flatiron`)
- **Response:**

  ```json
  {
    "place": "Flatiron",
    "description": "Now approaching the Flatiron Building, an iconic triangular skyscraper..."
  }
  ```

### Fetching Points of Interest & Audio

- **Endpoint:** `/get-location-audio`
- **Method:** `GET`
- **Query Parameters:**
  - `place`: Name of the location (e.g., `?place=Flatiron`)
- **Response:** Returns an MP3 file for audio playback.

## Deployment

### Running in Production

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Start the production server:**

   ```bash
   npm start
   ```

   Ensure that the environment variables are set appropriately for production.
   
## Contributing

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request
