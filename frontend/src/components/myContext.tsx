"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

const MyContext = createContext<any | undefined>(undefined);

const MyDispatchContext = createContext<any | undefined>(undefined);

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const now = new Date();
  const [data, dispatch] = useReducer(MyReducer, initialData);

  const getLocalData = async () => {
    const ifData = localStorage.getItem("data");
    if (ifData) {
      // console.log("GET", JSON.parse(ifData));
      const data = JSON.parse(ifData);
      if (now.getTime() > data.expiry) {
        localStorage.clear();
        fetch("/api/logout");
      } else {
        dispatch({
          data: data.value,
          type: "firstRender",
        });
      }
    }
  };

  useEffect(() => {
    getLocalData();
  }, []);

  useEffect(() => {
    if (data !== initialData) {
      const ttl = 60 * 60 * 1000;
      const item = { value: data, expiry: now.getTime() + ttl };
      localStorage.setItem("data", JSON.stringify(item));
    }
  }, [data]);

  return (
    <MyContext.Provider value={data}>
      <MyDispatchContext.Provider value={dispatch}>
        {children}
      </MyDispatchContext.Provider>
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

export function useContextDispatch() {
  return useContext(MyDispatchContext);
}

function MyReducer(data: data, action: any) {
  switch (action.type) {
    case "firstRender": {
      return action.data;
    }

    case "login": {
      console.log("action", action);
      return {
        ...data,
        loggedIn: true,
        username: action.action.username,
        fullname: action.action.fullname,
        role: action.action.role,
        institutionname: action.action.institutionname,
      };
    }
    case "logout": {
      localStorage.removeItem("data");
      return {
        ...initialData,
      };
    }
    case "slateInput": {
      return {
        ...data,
        toSlate: action.data,
      };
    }
    case "dsoSign": {
      // console.log(action.data);
      return {
        ...data,
        dsoSign: action.data,
      };
    }

    case "userUpdate": {
      console.log(action.data);
      return {
        ...data,
        fullname: action.action.fullname,
        username: action.action.username,
      };
    }
    case "preProcessUpdate": {
      console.log("Pre-process Context", action.action);
      return {
        ...data,
        preProcessStatus: action.action,
      };
    }
    case "preProcessMaxCount": {
      console.log("Pre-processMaxCount Context", action.action);
      return {
        ...data,
        preProcessMaxCount: action.action,
      };
    }
    case "postProcessUpdate": {
      console.log("Post-process Context", action.action);
      return {
        ...data,
        postProcessStatus: action.action,
      };
    }
    case "preProcessorState": {
      console.log("Pre-process Context", action.action);
      return {
        ...data,
        preProcessorState: action.action,
      };
    }
    case "postProcessorState": {
      console.log("Post-process Context", action.action);
      return {
        ...data,
        postProcessorState: action.action,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialData = {
  username: "",
  fullname: "",
  role: "",
  loggedIn: false,
  toSlate: "n",
  dsoSign: false,
  preProcessStatus: 0,
  postProcessStatus: 0,
  preProcessMaxCount: 0,
  preProcessorState: {},
  postProcessorState: {},
};

interface data {
  username: string;
  fullname: string;
  role: string;
  loggedIn: boolean;
  toSlate: string;
  dsoSign: boolean;
  preProcessStatus: number;
  postProcessStatus: number;
  preProcessMaxCount: number;
  preProcessorState: Object;
  postProcessorState: Object;
}
