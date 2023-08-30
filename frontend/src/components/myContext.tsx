"use client";
import { createContext, useContext, useEffect, useReducer } from "react";

const MyContext = createContext<any | undefined>(undefined);

const MyDispatchContext = createContext<any | undefined>(undefined);

export function MyContextProvider({ children }: { children: React.ReactNode }) {
  const [data, dispatch] = useReducer(MyReducer, initialData);

  useEffect(() => {
    const ifData = sessionStorage.getItem("data");
    if (ifData) {
      // console.log("GET", JSON.parse(ifData));
      dispatch({
        data: JSON.parse(ifData),
        type: "firstRender",
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (data !== initialData) {
      // console.log("SET", data);
      sessionStorage.setItem("data", JSON.stringify(data));
      // for (const k in data) sessionStorage.setItem(k, data[k]);
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
      const ifData = sessionStorage.getItem("data");
      return ifData ? JSON.parse(ifData) : data;
    }

    case "login": {
      console.log("action", action);
      return {
        ...data,
        loggedIn: true,
        username: action.action.username,
        fullname: action.action.fullname,
        role: action.action.role,
      };
    }
    case "logout": {
      // console.log("in logout", data);

      return {
        ...data,
        loggedIn: false,
        username: "",
        fullname: "",
        role: "",
        sessionToken: "",
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
};

interface data {
  username: string;
  fullname: string;
  role: string;
  loggedIn: boolean;
  toSlate: string;
  dsoSign: boolean;
}
