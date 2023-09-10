"use client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { logModel } from "@/components/utils/models";

const Tag = ({ value }: { value: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`p-1 w-20 text-center rounded text-white text-sm tracking-wide ${
          value ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {value ? "Success" : "Failure"}
      </div>
    </div>
  );
};

const Logs = () => {
  const formatDate = (value: Date) => {
    return value.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };
  const dateBodyTemplate = (rowData: logModel) => {
    return formatDate(new Date(rowData.date));
  };
  const resultBodyTemplate = (rowData: logModel) => {
    return <Tag value={rowData.result} />;
  };
  const [logData, setLogData] = useState([]);
  useEffect(() => {
    getLogs();
  }, []);
  const getLogs = async () => {
    try {
      const res = await fetch("api/logs");
      if (!res.ok) throw res;
      const data = await res.json();
      console.log("logData", data);
      setLogData(data.data);
    } catch (err: any) {
      const data = await err.json();
      toast.error(data.message);
    }
  };
  return (
    <main className="w-[80%] mx-auto">
      <h2>Logs</h2>
      <section className="bg-white rounded-lg p-1">
        <DataTable
          value={logData}
          paginator
          rows={20}
          showGridlines
          className=""
        >
          <Column
            field="date"
            header="Date"
            sortable
            body={dateBodyTemplate}
            className="w-[25%] px-2"
          />
          {/* <Column field="date" header="Date" style={{ width: "25%" }} /> */}
          <Column
            field="processedBy"
            // filter
            // filterPlaceholder="Search by name"
            header="User"
            className="w-[25%] px-2"
          />
          <Column
            field="result"
            header="Result"
            className="w-[25%] px-2"
            body={resultBodyTemplate}
          />
          <Column field="system" header="Tool" className="w-[25%] px-2" />
        </DataTable>
      </section>
    </main>
  );
};

export default Logs;
