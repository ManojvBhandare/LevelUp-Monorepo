import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border-2 border-border min-h-[35rem] min-w-[30rem] max-h-[40rem] max-w-[35rem] rounded-lg flex flex-col items-center p-[3rem] gap-[3rem]">
        <h1 className="text-xl font-semibold text-cardForeground">
          Welcome to LevelUp.Money
        </h1>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div>
            <Label htmlFor="Income">Income</Label>
            <Input type="text" id="income" placeholder="Monthly Income" />
          </div>
          <div>
            <Label htmlFor="fixed">Fixed Expense</Label>
            <Input type="text" id="fixed" placeholder="Fixed Expense" />
          </div>
        </div>
        <Button size="lg" onClick={() => navigate("/home")}>
          Login
        </Button>
      </div>
    </div>
  );
};
