import { Scale } from "lucide-react";
import { ScryfallLegalities } from "@/types/scryfall";
import { useState, memo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

const FIXED_FORMATS = ["commander", "modern", "standard", "legacy"] as const;

type LegalityStatus = "legal" | "banned" | "restricted" | "not_legal";

function getStatusColor(status: LegalityStatus) {
  switch (status) {
    case "legal":
      return {
        bg: "bg-success",
        border: "border-success",
        text: "text-success-foreground",
      };
    case "banned":
      return {
        bg: "bg-danger",
        border: "border-danger",
        text: "text-danger-foreground",
      };
    case "restricted":
      return {
        bg: "bg-warning",
        border: "border-warning",
        text: "text-warning-foreground",
      };
    case "not_legal":
    default:
      return {
        bg: "bg-danger",
        border: "border-danger",
        text: "text-danger-foreground",
      };
  }
}

const LegalityItem = memo(
  ({ format, status }: { format: string; status: LegalityStatus }) => {
    const colors = getStatusColor(status);
    const statusLabel =
      status === "not_legal"
        ? "Not Legal"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <div
        className={`flex flex-col items-center p-2 rounded ${colors.bg} border ${colors.border}`}
      >
        <span className={`text-xs ${colors.text} font-bold uppercase`}>
          {format}
        </span>
        <span className={` text-xs font-bold ${colors.text}`}>
          {statusLabel}
        </span>
      </div>
    );
  },
);
LegalityItem.displayName = "LegalityItem";

export default function Legalities({
  legalities,
}: {
  legalities: ScryfallLegalities;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const allFormats = Object.entries(legalities).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const hasMoreFormats = allFormats.length > FIXED_FORMATS.length;

  return (
    <>
      <div className="flex flex-col rounded-xl  bg-[--clr-surface-a20] backdrop-blur shadow-xl shadow-[--clr-surface-a0]/30 border">
        <div className="flex items-center gap-2 p-4">
          <Scale className="w-4 h-4 md:w-5 md:h-5" />
          <div className="font-bold uppercase">Format legality</div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-2 bg-[--clr-surface-a10] rounded-b-xl border-t border-[--clr-surface-a30]">
          {FIXED_FORMATS.map((format) => {
            const status = (legalities[format as keyof ScryfallLegalities] ||
              "not_legal") as LegalityStatus;
            return (
              <LegalityItem key={format} format={format} status={status} />
            );
          })}
          {hasMoreFormats && (
            <button onClick={() => setSheetOpen(true)}>
              <span className="text-xs font-bold uppercase">
                See all formats
              </span>
            </button>
          )}
        </div>
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex flex-col">
          <SheetHeader>
            <SheetTitle>All Format Legalities</SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 w-full h-[80vh] ">
            <div className="grid grid-cols-2 gap-3 p-4">
              {allFormats.map(([format, status]) => {
                const colors = getStatusColor(status as LegalityStatus);
                const statusLabel =
                  status === "not_legal"
                    ? "Not Legal"
                    : status.charAt(0).toUpperCase() + status.slice(1);

                return (
                  <div
                    key={format}
                    className={`flex flex-col items-center p-3 rounded ${colors.bg} border ${colors.border}`}
                  >
                    <span
                      className={`text-xs ${colors.text} font-bold uppercase`}
                    >
                      {format}
                    </span>
                    <span className={`text-xs font-bold ${colors.text}`}>
                      {statusLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
