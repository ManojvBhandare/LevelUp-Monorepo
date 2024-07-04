import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const baseAmount = 10000; // Reference amount (10,000 INR)

const initialGoals = [
  { id: 1, name: "Buy a House", duration: 5, amount: 300000 },
  { id: 2, name: "Save for College", duration: 10, amount: 50000 },
  { id: 3, name: "Start a Business", duration: 2, amount: 100000 },
];

export const AddGoalUI = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [showInputCard, setShowInputCard] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalDuration, setGoalDuration] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const handleAddGoal = () => {
    setShowInputCard(true);
  };

  const handleStart = () => {
    const newGoal = {
      id: goals.length + 1,
      name: goalName,
      duration: goalDuration,
      amount: goalAmount,
    };
    setGoals([...goals, newGoal]);
    setShowInputCard(false);
    setGoalName("");
    setGoalDuration("");
    setGoalAmount("");
  };

  const handleCancel = () => {
    setShowInputCard(false);
    setGoalName("");
    setGoalDuration("");
    setGoalAmount("");
  };

  return (
    <div className="max-h-[100vh] flex justify-center items-center">
      <div className="bg-[#D6DDFC] w-full h-[95%] rounded-xl p-[1rem] flex flex-col gap-8 justify-start items-center">
        <div className="overflow-y-auto max-h-[60vh] gap-4 grid grid-cols-3 grid-flow-row w-full">
          {goals.map((goal) => {
            const percentOfBaseAmount = (
              (baseAmount / goal.amount) *
              100
            ).toFixed(2);

            return (
              <div
                key={goal.id}
                className="cols-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col"
              >
                <h2 className="text-xl font-bold">{goal.name}</h2>
                <p>Duration: {goal.duration} years</p>
                <p>Amount: ${goal.amount}</p>
                <Progress value={percentOfBaseAmount} className="w-full" />
              </div>
            );
          })}
        </div>
        <div
          className="w-[5rem] min-h-[5rem] bg-white rounded-full flex justify-center items-center text-[3rem] text-[#4A69F5] cursor-pointer"
          onClick={handleAddGoal}
        >
          <FaPlus className="w-[2rem]" />
        </div>
        {showInputCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-bold mb-4">Add Goal</h2>
              <input
                type="text"
                placeholder="Goal Name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Goal Duration (years)"
                value={goalDuration}
                onChange={(e) => setGoalDuration(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Amount Required"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full p-2 mb-4 border rounded-lg"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStart}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
