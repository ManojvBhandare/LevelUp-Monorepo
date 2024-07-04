import { AddGoalUI } from "@/components/AddGoalUi";
import BasicBars from "@/components/charts/BarChart";
import BasicGauges from "@/components/charts/Glory";
import HorizontalGrid from "@/components/charts/HorizontalChart";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const toggleReadSection = () => {
    navigate("/read");
  };

  return (
    <div>
      <div className="relative ml-[5rem] py-6 px-8 flex flex-row gap-[75rem]">
        <div className="flex flex-col gap-1 justify-start items-start">
          <h1 className="text-3xl font-bold">Welcome, Rohith</h1>
          <p className="text-md font-light">LevelUp.Money dashboard.</p>
        </div>
        <div className=" flex flex-col items-start justify-center p-2 border-2 border-border h-[10vh] w-[12vw] rounded-lg">
          <h2 className="text-xl font-semibold">Daily Limit</h2>
          <p className="text-lg">Rs.100</p>
        </div>
      </div>
      <div className="ml-[5rem] py-8 px-8 flex flex-row justify-between gap-2">
        <div className="flex flex-col justify-center items-center h-[35vh] w-[15vw] border-2 border-border rounded-lg p-4">
          <div className="flex flex-col items-start place-self-start ">
            <h1 className="text-xl font-semibold">Total Spent</h1>
            <p>Recent Total</p>
          </div>
          <BasicGauges />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh]  border-2 border-border rounded-lg ">
          <HorizontalGrid />
        </div>
        <div className="flex flex-col justify-center items-center h-[35vh]  border-2 border-border rounded-lg ">
          <BasicBars />
        </div>
      </div>
      <div className="ml-[5rem] px-8 flex flex-col justify-start gap-2">
        <h1 className="text-2xl font-semibold">Goals</h1>
        <div>
          <AddGoalUI />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
