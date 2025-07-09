import CarRentalList from "@/components/dashboard/CarRentalList";
import ListingPagination from "@/components/dashboard/ListingPagination";
import SidebarLayout from "@/layouts/SidebarLayout";
import { getAllListings } from "@/lib/apis/listings.apis";
import { CAR_RENTAL } from "@/types";
import { GetServerSideProps } from "next";
import React from "react";

type DashboardProps = {
  listings: CAR_RENTAL[];
  totalCount: number;
  limit: number;
  page: number;
};

const Dashboard = ({ listings, limit, page, totalCount }: DashboardProps) => {
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <SidebarLayout>
      <section className="flex flex-col flex-1 min-h-0 gap-4">
        <h1 className="text-xl font-medium">Car Rental Listings</h1>

        {/* This wrapper enables both vertical + horizontal scrolling */}
        <div className="grow shrink-0  rounded-lg border min-h-0">
          {/* This ensures table is wide enough to scroll horizontally */}
          <div className="w-full min-w-max overflow-auto">
            <CarRentalList listings={listings} />
            <ListingPagination currentPage={page} totalPages={totalPages} />
          </div>
        </div>
      </section>
    </SidebarLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = parseInt(context.query.page as string) || 1;
  const limit = parseInt(context.query.limit as string) || 8;

  console.log(page, limit);

  const { listings, totalCount } = getAllListings(page, limit);

  return {
    props: {
      listings,
      totalCount,
      page,
      limit,
    },
  };
};
