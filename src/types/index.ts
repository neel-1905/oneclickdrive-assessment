export type USER = {
  id: string;
  email: string;
  password: string;
} | null;

export type STATUS = "approved" | "rejected" | "pending";

export type CAR_RENTAL = {
  id: string;
  name: string;
  location: string;
  price_per_day: number;
  status: STATUS;
  createdAt: string;
  updatedAt: string;
};

export type CAR_RENTAL_UPDATE = {
  name?: string;
  location?: string;
  price_per_day?: number;
  status?: STATUS;
};
