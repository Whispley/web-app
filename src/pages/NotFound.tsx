import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RiHomeLine, RiArrowLeftLine } from "@remixicon/react";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 h-screen">
      <div className="text-center space-y-4">
        <div className="text-6xl font-bold text-muted-foreground">404</div>
        <h1 className="text-3xl font-semibold">Page Not Found</h1>
        <p className="text-lg text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. The page might
          have been moved, deleted, or doesn't exist.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center gap-2">
            <RiArrowLeftLine size={16} />
            Go Back
          </Link>
        </Button>
        <Button asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <RiHomeLine size={16} />
            Go to Dashboard
          </Link>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
