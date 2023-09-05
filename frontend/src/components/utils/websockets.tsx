"use client";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useContextDispatch, useMyContext } from "../myContext";

export default function Socket() {
  const socket = io("http://127.0.0.1:8081/socket", { autoConnect: false });
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
      dispatch({ type: "statusUpdate", action: value });
      setStatus(value);
    }

    data.role && onConnect();

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("statusUpdate", onStatusUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("statusUpdate", onStatusUpdate);
    };
  }, [socket, data.role, dispatch]);

  return status;
}
