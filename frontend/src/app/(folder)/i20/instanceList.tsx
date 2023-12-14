import { instanceModel } from "@/components/utils/models";
import { useEffect, useState } from "react";
import * as React from "react";
import { toast } from "react-hot-toast";

const InstanceList = ({ type }: { type: string }) => {
  const [instanceList, setInstanceList] = useState<instanceModel[]>([]);

  useEffect(() => {
    getInstanceList();
  }, []);

  const getInstanceList = async () => {
    try {
      const res = await fetch("/api/instance", {
        next: { tags: ["instanceList"] },
      });
      if (!res.ok) throw res;
      const { data } = await res.json();
      setInstanceList(data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };

  return (
    <React.Fragment>
      {instanceList.length > 0
        ? instanceList.map(
            (item: instanceModel) =>
              item.instanceprocessor === type && (
                <option value={item.type} key={item.type}>
                  {item.type}
                </option>
              )
          )
        : ""}
    </React.Fragment>
  );
};

export default InstanceList;
