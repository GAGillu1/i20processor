"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useContextDispatch } from "./myContext";

export default function Socket() {
  const [host, setHost] = useState("");
  const socket = io(host, { autoConnect: false });

  const dispatch = useContextDispatch();
  const getHostname = async () => {
    const res = await fetch("/api/websocket");
    const data = await res.json();
    setHost(data.data);
  };

  useEffect(() => {
    getHostname();
  }, []);

  useEffect(() => {
    // console.log("WShost", host);
    function onConnect() {
      socket.connect();
    }

    function onDisconnect() {
      socket.disconnect();
    }

    function onPostProcessUpdate(value: number) {
      console.log("PostProcess Update", value);
      dispatch({ type: "postProcessUpdate", action: value });
    }

    function onPreProcessUpdate(value: number) {
      console.log("PreProcess Update", value);
      dispatch({ type: "preProcessUpdate", action: value });
    }

    function onPreProcessMaxCount(value: number) {
      console.log("PreProcess Max Count", value);
      dispatch({ type: "preProcessMaxCount", action: value });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("rom", onPostProcessUpdate);
    socket.on("preProcessor", onPreProcessUpdate);
    socket.on("preProcessorMaxCount", onPreProcessMaxCount);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("rom", onPostProcessUpdate);
      socket.off("preProcessor", onPreProcessUpdate);
      socket.off("preProcessorMaxCount", onPreProcessMaxCount);
    };
  }, [socket, dispatch, host]);
  return null;
}
