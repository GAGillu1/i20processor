"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useContextDispatch } from "../myContext";
import { usePathname } from "next/navigation";

export default function Socket() {
  // const path = window.location.hostname;
  const path = "54.80.2.26";
  const ws = "ws://" + path + ":8081/";
  console.log(ws);
  const socket = io(ws);
  const dispatch = useContextDispatch();
  useEffect(() => {
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
      socket.off("preProcessor", onPreProcessMaxCount);
    };
  }, [socket, dispatch]);
  return null;
}
