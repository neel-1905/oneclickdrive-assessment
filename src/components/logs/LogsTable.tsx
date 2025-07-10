import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LOG } from "@/types";

type ActionPerformed = {
  from: string | undefined;
  to: string | undefined;
  action: string;
  user_name: string;
  target_id: string;
};

const LogsTable = ({ logs }: { logs: LOG[] }) => {
  const getActionPerformed = ({
    from,
    to,
    action,
    target_id,
  }: ActionPerformed) => {
    switch (action) {
      case "login":
        return `User logged in.`;

      case "updated listings":
        return `Updated listing ${target_id}`;

      case "updated status":
        return `Updated listing ${target_id} status from ${from} to ${to}`;

      case "logout":
        return `User logged out`;

      default:
        return `Action undefined`;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4">Timestamp</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs?.map(
          ({
            id,
            createdAt,
            user_name,
            from,
            to,
            action,
            // target_type,
            target_id,
          }) => (
            <TableRow key={id}>
              <TableCell className="py-4">{createdAt}</TableCell>
              <TableCell>{user_name}</TableCell>
              <TableCell className="wrap-normal">
                {getActionPerformed({ from, to, action, user_name, target_id })}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default LogsTable;
