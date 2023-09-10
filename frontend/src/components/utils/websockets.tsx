"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useContextDispatch, useMyContext } from "../myContext";

export default function Socket() {
  const socket = io("ws://127.0.0.1:8081/");
  const [status, setStatus] = useState("");
  const data = useMyContext();
  const dispatch = useContextDispatch();
  useEffect(() => {
    function onConnect() {
      socket.connect();
    }

    function onDisconnect() {
      socket.disconnect();
    }

    function onStatusUpdate(value: string) {
      // console.log("status", value);
      dispatch({ type: "statusUpdate", action: value });
      setStatus(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("rom", onStatusUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("rom", onStatusUpdate);
    };
  }, [socket, dispatch]);
  console.log("status", status);
  return null;
}
