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
import { STATUS } from "@/types";

type ActionMenuProps = {
  currentStatus: STATUS;
  onStatusChange?: (newStatus: STATUS) => void;
};

const ActionMenu = (props: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical size={20} className="outline-none cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left" className="w-42">
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <ClipboardCheck />
            <span>Approve</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <ClipboardX />
            <span>Reject</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <ClipboardPen />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
