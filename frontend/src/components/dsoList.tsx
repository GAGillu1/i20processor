import { useEffect, useState } from "react";
import * as React from "react";
import { toast } from "react-hot-toast";

const DsoList = () => {
  const [dsoList, setDsoList] = useState<string[]>(["Select DSO"]);

  useEffect(() => {
    getDsoList();
  }, []);

  const getDsoList = async () => {
    try {
      const res = await fetch("/api/dso");
      if (!res.ok) throw res;
      const { data } = await res.json();
      setDsoList(data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };

  return (
    <React.Fragment>
      {dsoList.length > 0
        ? dsoList.map((item: string) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))
        : ""}
    </React.Fragment>
  );
};

export default DsoList;
