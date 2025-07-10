import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useDebounce } from "@/lib/useDebounce";

const CarRentalFilters = ({ locations }: { locations: string[] }) => {
  const router = useRouter();
  const currentQuery = router.query;

  const [selectedLocation, setSelectedLocation] = useState(
    currentQuery?.location as string
  );
  const [selectedStatus, setSelectedStatus] = useState(
    currentQuery?.status as string
  );
  const [search, setSearch] = useState((currentQuery?.carName as string) || "");

  const debouncedSearch = useDebounce(search, 500);

  const handleLocationChange = (val: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, location: val, page: 1 },
    });
    setSelectedLocation(val);
  };

  const handleStatusChange = (val: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...currentQuery, status: val, page: 1 },
    });
    setSelectedStatus(val);
  };

  useEffect(() => {
    if (debouncedSearch) {
      router.push({
        pathname: router.pathname,
        query: { ...currentQuery, carName: debouncedSearch, page: 1 },
      });
    }
  }, [debouncedSearch, currentQuery, router]);

  const clearFilters = () => {
    setSelectedLocation("");
    setSelectedStatus("");
    router.push({
      pathname: router.pathname,
      query: {}, // reset everything except page
    });
    setSearch("");
  };

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between">
      <Input
        type="text"
        placeholder="Search by name"
        className="w-full sm:max-w-xs"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      <div className="flex gap-3 items-center">
        <Select
          value={selectedLocation || ""}
          onValueChange={(val) => handleLocationChange(val)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent align="end" side="bottom">
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              {locations?.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={selectedStatus || ""}
          onValueChange={(val) => handleStatusChange(val)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="end" side="bottom">
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value={"pending"}>Pending</SelectItem>
              <SelectItem value={"approved"}>Approved</SelectItem>
              <SelectItem value={"Rejected"}>Rejected</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button size={`icon`} onClick={clearFilters}>
          <XIcon />
          {/* Clear */}
        </Button>
      </div>
    </div>
  );
};

export default CarRentalFilters;
