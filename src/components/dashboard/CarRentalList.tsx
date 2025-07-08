import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { dummyCarRentalList } from "@/constants";
import { Button } from "../ui/button";

const CarRentalList = () => {
  return (
    <Table className="w-full">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead>SN.</TableHead>
          <TableHead>ID</TableHead>
          <TableHead className="min-w-[200px]">Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price Per Day</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyCarRentalList?.map(
          ({ id, location, name, pricePerDay, status }, index) => {
            return (
              <TableRow key={`car-${id}`}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{id}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{pricePerDay}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <Button>Action</Button>
                </TableCell>
              </TableRow>
            );
          }
        )}
      </TableBody>
    </Table>
  );
};

export default CarRentalList;
