import { RecentsTransactions } from "@/components/RecentTransaction";
import BasicPie from "@/components/charts/BasicPie";
import BasicGauges from "@/components/charts/Glory";
import BasicLineChart from "@/components/charts/LineChart";

import { SecondBar } from "@/components/charts/SecondBar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Analytics = () => {
  return (
    <div className="ml-[5rem] px-8 py-8 flex flex-col gap-4">
      <h1 className="text-3xl font-bold ">Get Your Insights here.</h1>
      <div className="flex flex-row items-center gap-[50px]">
        <div className="mt-4 py-6 px-8 relative flex flex-col justify-center items-center h-[55vh] w-[55vw] border-2 border-border rounded-lg">
          <div className="absolute top-2 right-2">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Friends">Friends/Family</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <SecondBar height={800} width={1000} />
        </div>
        <div className="mt-4 py-6 px-8 relative flex flex-col justify-center items-center h-[45vh] w-[30vw] border-2 border-border rounded-lg">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <BasicPie height={300} width={500} />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="bg-[#D6DDFC] rounded-lg max-w-[35vw] py-4 px-4">
          <h1 className="text-xl font-semibold">Recent Transactions</h1>
          <div className="grid grid-cols-1 gap-3 overflow-y-auto p-2 max-h-[40vh] w-[30vw]">
            <RecentsTransactions type={"+"} amount={"Rs.100.00"} />
            <RecentsTransactions type={"-"} amount={"Rs.100.00"} />
            <RecentsTransactions type={"+"} amount={"Rs.100.00"} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh] w-[15vw] border-2 border-border rounded-lg p-4">
          <h1 className="font-semibold text-md text-primary">
            Probability of Reaching Your Goal.
          </h1>
          <BasicGauges />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh] w-[35vw] border-2 border-border rounded-lg p-4">
          <h1 className="font-semibold text-md text-primary"></h1>
          <BasicLineChart />
        </div>
      </div>
    </div>
  );
};
