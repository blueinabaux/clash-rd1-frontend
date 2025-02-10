import { useState } from "react";

export default function Questions() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F08E25] to-[#881200] p-4 font-mono">
      {/* Header */}
      

      <div className="flex gap-8">
        {/* Main Content Area */}
        <div className="flex-1 bg-[#EC841C] rounded-lg border-4 border-[#4A1237] h-[400px] shadow-[3px_3px_0px_0px_#1E3445]"></div>

        {/* Side Panel */}
        <div className="w-96 bg-[#FFAC57] rounded-lg border-4 border-[#4A1237] h-[400px] shadow-[3px_3px_0px_0px_#1E3445]"></div>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-8 mt-8 mb-8 max-w-3xl">
        {["A", "B", "C", "D"].map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`bg-[#FF7B00] rounded-lg border-4 border-[#4A1237] p-6 opacity-80 shadow-[3px_3px_0px_0px_#1E3445] hover:opacity-100 transition-opacity ${
              selectedOption === option ? "opacity-100" : ""
            }`}
          >
            <span
              className="text-[#FFF546] text-3xl font-bold"
              style={{ textShadow: "2px 2px #4A1237" }}
            >
              {option}
            </span>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          className="bg-[#FF7B00] text-[#FFF546] px-8 py-3 rounded-lg border-4 border-[#4A1237] hover:opacity-90 transition-opacity shadow-[3px_3px_0px_0px_#1E3445]"
          style={{ textShadow: "2px 2px #4A1237" }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
