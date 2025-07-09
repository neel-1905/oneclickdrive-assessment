import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CAR_RENTAL, STATUS } from "@/types";
import StatusBadge from "./StatusBadge";
import ActionMenu from "./ActionMenu";
import { updateListing } from "@/lib/apis/listings.apis";
import EditListingDialog from "./EditListingDialog";

const CarRentalList = ({ listings }: { listings: CAR_RENTAL[] }) => {
  const [carList, setCarList] = useState(listings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialogData, setCurrentDialogData] = useState<CAR_RENTAL | null>(
    null
  );

  const handleDialogOpen = (data: CAR_RENTAL) => {
    if (!data) return;
    setIsDialogOpen(true);
    setCurrentDialogData(data);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setCurrentDialogData(null);
  };

  const handleStatusChange = async (id: string, status: STATUS) => {
    console.log("updating", id, status);

    const res = await fetch(`/api/listings/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.log("Error", result?.error);
      return;
    }

    alert(result.message);

    setCarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: status } : item))
    );
  };

  const handleListingUpdate = async (
    id: string,
    updatedData: Partial<CAR_RENTAL>
  ) => {
    const res = await fetch(`/api/listings/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id, ...updatedData }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.log("Error", result?.error);
      return;
    }

    // alert(result.message);

    setCarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );

    handleDialogClose();
  };

  return (
    <>
      <Table className="w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="py-4">SN.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price Per Day</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {carList?.map((car, index) => {
            const { id, location, name, price_per_day, status } = car;
            return (
              <TableRow key={id}>
                <TableCell className="py-4">{index + 1}</TableCell>
                <TableCell className="font-medium">{name}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>{price_per_day}</TableCell>
                <TableCell className="text-center w-[120px]">
                  <StatusBadge status={status} />
                </TableCell>
                <TableCell className="text-center">
                  <ActionMenu
                    listing={car}
                    onStatusChange={handleStatusChange}
                    onEditClick={() => handleDialogOpen(car)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {currentDialogData && (
        <EditListingDialog
          handleDialogClose={handleDialogClose}
          isDialogOpen={isDialogOpen}
          currentDialogData={currentDialogData!}
          handleListingUpdate={handleListingUpdate}
        />
      )}
    </>
  );
};

export default CarRentalList;
