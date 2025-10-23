import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export function Studios() {
  return (
    <div className="mx-8">
      <div className="flex flex-row items-center justify-between mb-8">
        <h1>Studios</h1>
        <Button>Novo Estúdio</Button>
      </div>

      <Link to="/studios/agenda/1">
        <Card>
          <CardHeader>
            <CardTitle>Studio 01</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>
              <Button
                variant="outline"
                size="icon"
                className="hover:text-red-500"
              >
                <Trash2 />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}
