"use client";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableValueArray,
} from "primereact/datatable";
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
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

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
    return formatDate(new Date(rowData.processedDate));
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

  const rowExpansionTemplate = (rowData: logModel) => {
    return (
      <div className="p-2">
        <h3>Processed I-20s</h3>
        {rowData.processor === "ISSM to Slate" ? (
          <div className=""> {rowData.processedMsg}</div>
        ) : (
          <div className="w-full">
            <DataTable>
              <Column
                field="admissionId"
                header="Admission Id"
                className="px-2"
              />
              <Column
                sortable
                field="result"
                header="Status"
                className="px-2"
              />
              <Column
                field="message"
                header="Message"
                className="w-[50%] px-2"
              />
            </DataTable>
          </div>
        )}
        {/* <div className="flex gap-3">
          {rowData.processedMsg.map((item, i) => {
            return <span key={i}>{item}</span>;
          })}
        </div> */}
      </div>
    );
  };
  return (
    <main className="w-[80%] mx-auto">
      <h2>Logs</h2>
      <section className="bg-white rounded-lg p-1">
        <DataTable
          value={logData}
          paginator
          rows={18}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowExpansionTemplate={rowExpansionTemplate}
        >
          <Column expander style={{ width: "5rem" }} />
          <Column
            field="processedDate"
            header="Date"
            sortable
            body={dateBodyTemplate}
            className="w-[25%] px-2"
          />
          <Column
            field="processedBy"
            sortable
            header="User"
            className="w-[25%] px-2"
          />
          <Column
            field="result"
            header="Result"
            sortable
            className="w-[25%] px-2"
            body={resultBodyTemplate}
          />
          <Column
            field="processor"
            header="Tool"
            sortable
            className="w-[25%] px-2"
          />
        </DataTable>
      </section>
    </main>
  );
};

export default Logs;
