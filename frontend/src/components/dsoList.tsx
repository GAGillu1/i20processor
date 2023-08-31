import { useEffect, useState } from "react";
import * as React from "react";
import { toast } from "react-hot-toast";

const DsoList = () => {
  const [dsoList, setDsoList] = useState<string[]>(["Select DSO"]);

  useEffect(() => {
    getDsoList();
  }, []);

  const getDsoList = async () =>
    await fetch("/api/dso")
      .then((res) => res.json())
      .then(({ data }) => setDsoList(data.names))
      .catch((err) => console.log(err));

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
