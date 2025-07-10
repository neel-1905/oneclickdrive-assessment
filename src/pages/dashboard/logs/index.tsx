import LogsTable from "@/components/logs/LogsTable";
import SidebarLayout from "@/layouts/SidebarLayout";
import { getAllLogs } from "@/lib/apis/logs.apis";
import { LOG } from "@/types";
import { GetServerSideProps } from "next";
import React from "react";

type LogProps = {
  logs: LOG[];
};

const Logs = (props: LogProps) => {
  const { logs } = props;

  return (
    <SidebarLayout>
      <div className="border rounded-lg">
        <LogsTable logs={logs} />
      </div>
    </SidebarLayout>
  );
};

export default Logs;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const logs = getAllLogs();
  return {
    props: {
      logs,
    },
  };
};
