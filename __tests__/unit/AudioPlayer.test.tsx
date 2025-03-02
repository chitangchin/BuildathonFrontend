// __tests__/unit/AudioPlayer.test.tsx
import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AudioPlayer } from "../../app/page"; // Adjust path as needed

// Mock HTMLAudioElement play and pause methods
beforeEach(() => {
  jest.spyOn(HTMLAudioElement.prototype, "play").mockImplementation(() => Promise.resolve());
  jest.spyOn(HTMLAudioElement.prototype, "pause").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("AudioPlayer", () => {
  it("renders with play button and initial time", () => {
    const { getByText, getByRole } = render(<AudioPlayer url="http://example.com/audio.mp3" />);
    expect(getByText("Play")).toBeInTheDocument();
    expect(getByRole("slider")).toHaveValue("0");
    expect(getByText("0:00/0:00")).toBeInTheDocument();
  });

  it("toggles play and pause when button is clicked", async () => {
    const playSpy = jest.spyOn(HTMLAudioElement.prototype, "play");
    const pauseSpy = jest.spyOn(HTMLAudioElement.prototype, "pause");

    const { getByText } = render(<AudioPlayer url="http://example.com/audio.mp3" />);
    const button = getByText("Play");

    // Click play
    fireEvent.click(button);
    expect(playSpy).toHaveBeenCalled();

    // Wait for state update
    await act(() => Promise.resolve());
    expect(getByText("Pause")).toBeInTheDocument();

    // Click pause
    fireEvent.click(getByText("Pause"));
    expect(pauseSpy).toHaveBeenCalled();
  });

  it("updates slider value on change", async () => {
    const { getByRole, container } = render(<AudioPlayer url="http://example.com/audio.mp3" />);
    const audio = container.querySelector("audio") as HTMLAudioElement;
    
    // Simulate loaded metadata so that duration is set to a nonzero value.
    Object.defineProperty(audio, "duration", { value: 100, writable: true });
    fireEvent.loadedMetadata(audio);
    
    // Now get the slider and change its value.
    const slider = getByRole("slider") as HTMLInputElement;
    await act(async () => {
      fireEvent.change(slider, { target: { value: "30" } });
    });
    expect(slider.value).toBe("30");
  });

  it("displays formatted time correctly", () => {
    const { getByText, container } = render(<AudioPlayer url="http://example.com/audio.mp3" />);
    const audio = container.querySelector("audio") as HTMLAudioElement;

    // Simulate metadata load by setting duration
    Object.defineProperty(audio, "duration", { value: 90, configurable: true });
    fireEvent.loadedMetadata(audio);

    // Simulate time update by setting currentTime
    Object.defineProperty(audio, "currentTime", { value: 75, configurable: true });
    fireEvent.timeUpdate(audio);

    // 75 sec -> 1:15, 90 sec -> 1:30
    expect(getByText("1:15/1:30")).toBeInTheDocument();
  });
});
