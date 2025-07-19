import type {WizardProps} from "../types/wizard";
import {WizardNavigation} from "./WizardNavigation";
import {WizardStep} from "./WizardStep";
import {useWizard} from "../hooks/useWizard";

export const Wizard = ({questions, onDone}: WizardProps) => {
  const {
    currentQuestion,
    currentAnswer,
    displayValidationError,
    canGoBack,
    canGoNext,
    isLastQuestion,
    handleInputChange,
    handleNext,
    handleBack,
    handleDone,
  } = useWizard({questions, onDone});

  if (!questions?.length) {
    return <div>No questions available</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="min-h-[300px] flex flex-col justify-center">
            <WizardStep
              question={currentQuestion}
              answer={currentAnswer}
              onAnswerChange={handleInputChange}
              validationError={displayValidationError}
            />
          </div>
          <WizardNavigation
            canGoBack={canGoBack}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            onBack={handleBack}
            onNext={handleNext}
            onDone={handleDone}
          />
        </div>
      </div>
    </div>
  );
};
