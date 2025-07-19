import {AlertCircle} from "lucide-react";
import type {WizardStepProps} from "../types/wizard";

export const WizardStep = ({
  question,
  answer,
  onAnswerChange,
  validationError,
}: WizardStepProps) => {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
          {question.title}
        </h2>
        <p className="text-gray-600 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
          {question.text}
        </p>
      </div>

      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          value={answer}
          onChange={onAnswerChange}
          placeholder="Enter your answer..."
          className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 ${
            validationError
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />

        {validationError && (
          <div className="mt-3 flex items-center gap-2 absolute bottom-[-10] text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{validationError}</span>
          </div>
        )}
      </div>
    </div>
  );
};
