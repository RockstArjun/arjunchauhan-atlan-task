import { Badge } from "@/components/ui/badge";

export const GetStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "PENDING":
      return <Badge variant="destructive">Pending</Badge>;
    case "CONFIRMED":
      return <Badge variant="secondary">Confirmed</Badge>;
    case "IN_PROGRESS":
      return <Badge variant="outline">In Progress</Badge>;
    case "COMPLETED":
      return <Badge variant="secondary">Completed</Badge>;
    case "CANCELED":
      return <Badge variant="destructive">Canceled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};
