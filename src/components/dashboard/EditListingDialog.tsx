import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CAR_RENTAL } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editListingSchema } from "@/lib/validations/editListing.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";

type EditListingDialogProps = {
  handleDialogClose: () => void;
  isDialogOpen: boolean;
  currentDialogData: CAR_RENTAL;
  handleListingUpdate: (id: string, data: Partial<CAR_RENTAL>) => void;
};

const EditListingDialog = (props: EditListingDialogProps) => {
  const {
    handleDialogClose,
    isDialogOpen,
    currentDialogData,
    handleListingUpdate,
  } = props;
  const { name, location, id, price_per_day, status } = currentDialogData;

  const form = useForm<z.infer<typeof editListingSchema>>({
    resolver: zodResolver(editListingSchema),
    defaultValues: {
      name,
      location,
      price_per_day,
      status,
    },
    mode: "all",
  });

  const { isSubmitting } = form.formState;

  const onSaveClick = async (data: z.infer<typeof editListingSchema>) => {
    handleListingUpdate(id, data);
    handleDialogClose();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveClick)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>Edit Listing</DialogTitle>
              <DialogDescription>
                Make changes to the listing here. Click save when you are done
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Toyota Corolla" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price_per_day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per day</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  disabled={isSubmitting}
                  variant={`outline`}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  `Save`
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
