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
import { logModel, preProcessorLogModel } from "@/components/utils/models";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useMyContext } from "@/components/utils/myContext";

const Tag = ({ value }: { value: string }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`p-1 w-32 text-center font-semibold rounded text-white  text-sm tracking-wide ${
          value === "Success" ? "bg-green-600" : ""
        } ${value === "Failure" ? "bg-red-600/80" : ""} ${
          value === "Partial Success" ? "bg-yellow-500" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
};

const Logs = () => {
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const userData = useMyContext();
  const isSuperUser = userData.role === "SuperUser";
  // const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const formatDate = (value: Date) => {
    // console.log(value);
    // const offset = value.getTimezoneOffset();
    // const hoursOffset = offset / 60;
    // const estOffset = -5;
    // const estHours = hoursOffset + estOffset;
    // const estTime = new Date(value.getTime() + estHours * 60 * 60 * 1000);
    return value.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
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
  const statusBodyTemplate = (rowData: preProcessorLogModel) => {
    return <Tag value={rowData.status} />;
  };

  const [logData, setLogData] = useState([]);
  useEffect(() => {
    getLogs();
  }, []);

  const getLogs = async () => {
    try {
      const res = await fetch("/api/logs", { cache: "no-cache" });
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
                body={statusBodyTemplate}
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
          sortField="processedDate"
          sortOrder={-1}
        >
          <Column expander className="w-[5%]" />
          <Column
            field="processedDate"
            header="Date"
            sortable
            body={dateBodyTemplate}
            className={`px-2 ${isSuperUser ? "w-[20%]" : "w-[25%]"}`}
          />
          <Column
            field="processedBy"
            sortable
            header="User"
            className={`px-2 ${isSuperUser ? "w-[20%]" : "w-[25%]"}`}
          />
          <Column
            field="result"
            header="Result"
            sortable
            className={`px-2 ${isSuperUser ? "w-[15%]" : "w-[25%]"}`}
            body={resultBodyTemplate}
          />
          <Column
            field="processor"
            header="Tool"
            sortable
            className={`px-2 ${isSuperUser ? "w-[15%]" : "w-[25%]"}`}
          />
          {isSuperUser && (
            <Column
              field="institutionName"
              header="Institution"
              sortable
              className="px-2"
            />
          )}
        </DataTable>
      </section>
    </main>
  );
};

export default Logs;
