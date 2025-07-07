import SidebarLayout from "@/layouts/SidebarLayout";
import React, { ReactNode } from "react";

const Dashboard = () => {
  return (
    <SidebarLayout>
      <section className="grow flex flex-col gap-4">
        <h1 className="text-xl font-medium">Car Rental Listings</h1>
        <div className="overflow-auto grow border">
          {/* <div className="h-screen"></div> */}
        </div>
      </section>
    </SidebarLayout>
  );
};

export default Dashboard;
