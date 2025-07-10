import CarRentalFilters from "@/components/dashboard/CarRentalFilters";
import CarRentalList from "@/components/dashboard/CarRentalList";
import ListingPagination from "@/components/dashboard/ListingPagination";
import SidebarLayout from "@/layouts/SidebarLayout";
import { getAllListings, getAllLocations } from "@/lib/apis/listings.apis";
import { CAR_RENTAL, STATUS } from "@/types";
import { GetServerSideProps } from "next";
import React from "react";

type DashboardProps = {
  listings: CAR_RENTAL[];
  totalCount: number;
  limit: number;
  page: number;
  locations: string[];
};

const Dashboard = ({
  listings,
  limit,
  page,
  totalCount,
  locations,
}: DashboardProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <SidebarLayout>
      <section className="flex flex-col flex-1 min-h-0 gap-4 w-full">
        <h1 className="text-xl font-medium">Car Rental Listings</h1>

        <div className="flex flex-col flex-1 min-h-0 gap-4">
          <CarRentalFilters locations={locations} />

          <div className="flex-1 overflow-auto w-full">
            <CarRentalList listings={listings} locations={locations} />
          </div>

          <ListingPagination currentPage={page} totalPages={totalPages} />
        </div>
      </section>
    </SidebarLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;

  const page = parseInt(context.query.page as string) || 1;
  const limit = parseInt(context.query.limit as string) || 20;
  const location = (query.location as string) || undefined;
  const status = (query.status as STATUS) || undefined;
  const carName = (query.carName as string) || undefined;

  const { listings, totalCount } = getAllListings({
    page,
    limit,
    location,
    status,
    carName,
  });

  const locations = getAllLocations();

  return {
    props: {
      listings,
      totalCount,
      page,
      limit,
      locations,
    },
  };
};
