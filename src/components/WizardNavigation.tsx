import {ChevronLeft, ChevronRight, CheckCircle} from "lucide-react";
import type {WizardNavigationProps} from "../types/wizard";

export const WizardNavigation = ({
  canGoBack,
  canGoNext,
  isLastQuestion,
  onBack,
  onNext,
  onDone,
}: WizardNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-8">
      <div className="flex-1">
        {canGoBack && (
          <button
            onClick={onBack}
            className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200  transition-colors duration-200 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        <button
          onClick={isLastQuestion ? onDone : onNext}
          disabled={!canGoNext}
          className={`inline-flex items-center  gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200 ${
            canGoNext
              ? "bg-gradient-to-r from-blue-500  to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg cursor-pointer hover:shadow-xl transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isLastQuestion ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Complete
            </>
          ) : (
            <>
              Next
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
