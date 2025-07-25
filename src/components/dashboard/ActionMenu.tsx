import {
  ClipboardCheck,
  ClipboardPen,
  ClipboardX,
  EllipsisVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { CAR_RENTAL, STATUS } from "@/types";

type ActionMenuProps = {
  listing: CAR_RENTAL;
  onStatusChange: (id: string, newStatus: STATUS) => void;
  onEditClick: (data: CAR_RENTAL) => void;
};

const ActionMenu = (props: ActionMenuProps) => {
  const { onStatusChange, listing, onEditClick } = props;

  const { id: listingId } = listing;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} className="outline-none cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="left"
        className="w-42"
        alignOffset={20}
      >
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => onStatusChange(listingId, "approved")}
            className="cursor-pointer"
          >
            <ClipboardCheck />
            <span>Approve</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onStatusChange(listingId, "rejected")}
          >
            <ClipboardX />
            <span>Reject</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onEditClick(listing)}
          >
            <ClipboardPen />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
