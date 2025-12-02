import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScryfallLegalities } from "@/types/scryfall";

export function Legalities({ legalities }: { legalities: ScryfallLegalities }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>View Legality</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Format Legality</SheetTitle>
          <SheetDescription asChild>
            <div>
              {legalities &&
                Object.entries(legalities).map(([format, status]) => (
                  <div key={format} className="flex justify-between py-1">
                    <span className=" capitalize">{format}</span>
                    <span>{getStatusBadge(status)}</span>
                  </div>
                ))}
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function getStatusBadge(status: string) {
  const statusInfo = {
    legal: {
      label: "Legal",
      border: "border-success",
      background: "bg-success",
      color: "text-success-foreground",
    },
    not_legal: {
      label: "Not Legal",
      border: "border-danger",
      background: "bg-danger",
      color: "text-danger-foreground",
    },
    banned: {
      label: "Banned",
      border: "border-danger",
      background: "bg-danger",
      color: "text-danger-foreground",
    },
    restricted: {
      label: "Restricted",
      border: "border-warning",
      background: "bg-warning",
      color: "text-warning-foreground",
    },
  };
  return (
    <Badge
      variant="outline"
      className={`${statusInfo[status as keyof typeof statusInfo]?.border} ${
        statusInfo[status as keyof typeof statusInfo]?.background
      } ${statusInfo[status as keyof typeof statusInfo]?.color}`}
    >
      {statusInfo[status as keyof typeof statusInfo]?.label || "Unknown"}
    </Badge>
  );
}
