import React, { useEffect, useState } from "react";
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
import EditListingDialog from "./EditListingDialog";
import { useFeedback } from "@/context/FeedbackContext";
import { useSessionUser } from "@/lib/useSessionUser";
import { logAction } from "@/lib/apis/logs.actions";
// import CarRentalFilters from "./CarRentalFilters";

const CarRentalList = ({
  listings,
}: // locations,
{
  listings: CAR_RENTAL[];
  locations: string[];
}) => {
  const { show } = useFeedback();
  const user = useSessionUser();

  const [carList, setCarList] = useState(listings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialogData, setCurrentDialogData] = useState<CAR_RENTAL | null>(
    null
  );

  useEffect(() => {
    setCarList(listings);
  }, [listings]);

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
    const currentListing = carList?.find((car) => car.id === id);
    if (user) {
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
        show("error", result.error);
        return;
      }

      show("success", result.message);

      await logAction({
        action: "updated status",
        target_id: id,
        target_type: "listing",
        user_id: user.id,
        user_name: user.email,
        from: currentListing?.status,
        to: status,
      });

      setCarList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: status } : item
        )
      );
    }
  };

  const handleListingUpdate = async (
    id: string,
    updatedData: Partial<CAR_RENTAL>
  ) => {
    if (!user) return;

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
      show("error", result.error);
      return;
    }

    // alert(result.message);
    show("success", result.message);

    await logAction({
      action: "updated listings",
      target_id: id,
      target_type: "listing",
      user_id: user.id,
      user_name: user.email,
      from: currentDialogData?.status,
      to: updatedData?.status,
    });

    setCarList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );

    handleDialogClose();
  };

  return (
    <Table>
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
      {currentDialogData && (
        <EditListingDialog
          handleDialogClose={handleDialogClose}
          isDialogOpen={isDialogOpen}
          currentDialogData={currentDialogData!}
          handleListingUpdate={handleListingUpdate}
        />
      )}
    </Table>
  );
};

export default CarRentalList;
