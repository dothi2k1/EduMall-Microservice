"use client";
import React from "react";
import { useEffect } from "react";
import io from "socket.io-client";

export default function page() {
  useEffect(() => {
    const socket = io("http://localhost:2000/meeting");

    // Handle WebRTC signaling from the server

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>{/* Your video call UI components go here */}</div>;
}
