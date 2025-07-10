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

export type LOG = {
  id: string;
  user_id: string;
  user_name: string;
  action: string;
  target_type: string;
  target_id: string;
  from?: string;
  to?: string;
  createdAt?: string;
};
