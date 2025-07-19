import {ChevronLeft, ChevronRight, CheckCircle} from "lucide-react";
import type {WizardNavigationProps} from "../types/wizard";
import {Button} from "./common/Button";

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
          <Button
            onClick={onBack}
            variant="secondary"
            icon={ChevronLeft}
            iconPosition="left"
          >
            Back
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        <Button
          onClick={isLastQuestion ? onDone : onNext}
          disabled={!canGoNext}
          variant="gradient"
          icon={isLastQuestion ? CheckCircle : ChevronRight}
          iconPosition={isLastQuestion ? "left" : "right"}
          className="px-8"
        >
          {isLastQuestion ? "Done" : "Next"}
        </Button>
      </div>
    </div>
  );
};
