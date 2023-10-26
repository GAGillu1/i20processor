"use client";
import {
  DataTable,
  DataTableExpandedRows,
  DataTableFilterMeta,
  DataTableValueArray,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { logModel } from "@/components/utils/models";
import { FilterMatchMode, FilterOperator } from "primereact/api";

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
  // const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const formatDate = (value: Date) => {
    // console.log(value);
    // const offset = value.getTimezoneOffset();
    // const hoursOffset = offset / 60;
    // const estOffset = -5;
    // const estHours = hoursOffset + estOffset;
    // const estTime = new Date(value.getTime() + estHours * 60 * 60 * 1000);
    return value.toLocaleString(
      "en-US",
      { timeZone: "UTC" }
      // {
      //   day: "2-digit",
      //   month: "2-digit",
      //   year: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit",
      //   second: "2-digit",
      // }
    );
  };
  // const [filters, setFilters] = useState<DataTableFilterMeta>({
  //   global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //   name: {
  //     operator: FilterOperator.AND,
  //     constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //   },
  //   "country.name": {
  //     operator: FilterOperator.AND,
  //     constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //   },
  //   representative: { value: null, matchMode: FilterMatchMode.IN },
  //   date: {
  //     operator: FilterOperator.AND,
  //     constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
  //   },
  //   balance: {
  //     operator: FilterOperator.AND,
  //     constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  //   },
  //   status: {
  //     operator: FilterOperator.OR,
  //     constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
  //   },
  //   activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  // });

  // const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   let _filters = { ...filters };

  //   _filters["global"].value = value;

  //   setFilters(_filters);
  //   setGlobalFilterValue(value);
  // };

  // const renderHeader = () => {
  //   return (
  //     <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
  //       <h4 className="m-0">Customers</h4>
  //       <span className="p-input-icon-left">
  //         <i className="pi pi-search" />
  //         <InputText
  //           value={globalFilterValue}
  //           onChange={onGlobalFilterChange}
  //           placeholder="Keyword Search"
  //         />
  //       </span>
  //     </div>
  //   );
  // };

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
      const res = await fetch("/api/logs", { cache: "no-store" });
      // const res = await fetch(
      //   "https://63fbe49b1ff79e133295a2c7.mockapi.io/v1/logModel"
      // );
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
    let preProcessor = rowData.processedMsg;
    const isPreprocessor = rowData.processor !== "ISSM to Slate";
    const isError = rowData.errorMessage === null || rowData.errorMessage;

    // console.log(preProcessor);
    return (
      <div className="p-2">
        <h3>Processed I-20s</h3>
        {rowData.processor === "ISSM to Slate" ? (
          <div className=""> {rowData.processedMsg}</div>
        ) : isError ? (
          rowData.errorMessage
        ) : (
          <div className="w-full">
            <DataTable value={preProcessor.processedRecords}>
              <Column
                field="studentId"
                header="Admission Id"
                className="px-2 text-center"
              />
              <Column
                sortable
                field="status"
                header="Status"
                className="px-2 text-center"
              />
              <Column
                field="message"
                header="Message"
                className="w-[50%] px-2"
              />
            </DataTable>
          </div>
        )}
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
          {/* <Column
            field="processedDate"
            header="Date"
            sortable
            className="w-[25%] px-2"
          /> */}
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
