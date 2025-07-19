import type {WizardProgressProps} from "../types/wizard";

export const WizardProgress = ({
  currentIndex,
  totalQuestions,
}: WizardProgressProps) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{width: `${progressPercentage}%`}}
        />
      </div>
    </div>
  );
};
