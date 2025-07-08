export type STATUS = "approved" | "rejected" | "pending";

export type CAR_RENTAL = {
  id: string;
  name: string;
  location: string;
  pricePerDay: number;
  status: STATUS;
};
