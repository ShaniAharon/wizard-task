import {describe, it, expect, vi, beforeEach} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Wizard} from "../Wizard";
import {mockQuestions, mockQuestionsWithSkip} from "../../test/mockData";
import type {WizardAnswers} from "../../types/wizard";

vi.mock("../../hooks/useDebounce", () => ({
  useDebounce: (value: any) => value,
}));

describe("Wizard Component", () => {
  const mockOnDone = vi.fn();
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  describe("Basic Rendering and Navigation", () => {
    it("should render first question and navigate through wizard", async () => {
      render(<Wizard questions={mockQuestions} onDone={mockOnDone} />);
      // Should show first question
      expect(screen.getByText("What is your name?")).toBeInTheDocument();
      expect(screen.getByText("Question 1 of 4")).toBeInTheDocument();
      // Next button should be disabled initially
      expect(screen.getByText("Next")).toBeDisabled();
      // Fill first question
      await user.type(
        screen.getByPlaceholderText("Enter your answer..."),
        "John Doe"
      );
      expect(screen.getByText("Next")).not.toBeDisabled();
      // Navigate to second question
      await user.click(screen.getByText("Next"));
      expect(screen.getByText("Do you have insurance?")).toBeInTheDocument();
      expect(screen.getByText("Question 2 of 4")).toBeInTheDocument();
      // Back button should now be visible
      expect(screen.getByText("Back")).toBeInTheDocument();
    });

    it("should handle backward navigation and preserve answers", async () => {
      render(<Wizard questions={mockQuestions} onDone={mockOnDone} />);
      // Fill and navigate forward
      await user.type(
        screen.getByPlaceholderText("Enter your answer..."),
        "John Doe"
      );
      await user.click(screen.getByText("Next"));
      // Go back
      await user.click(screen.getByText("Back"));
      // Should be back on first question with answer preserved
      expect(screen.getByText("What is your name?")).toBeInTheDocument();
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    });
  });

  describe("Skip Logic", () => {
    it("should skip questions based on previous answers", async () => {
      render(<Wizard questions={mockQuestionsWithSkip} onDone={mockOnDone} />);
      // Fill first question
      await user.type(
        screen.getByPlaceholderText("Enter your answer..."),
        "answer1"
      );
      await user.click(screen.getByText("Next"));
      // Fill second question with skip trigger
      await user.type(
        screen.getByPlaceholderText("Enter your answer..."),
        "skip"
      );
      await user.click(screen.getByText("Next"));
      // Should skip question 3 and go directly to question 4
      expect(screen.getByText("Final question")).toBeInTheDocument();
      expect(screen.getByText("Question 4 of 4")).toBeInTheDocument();
    });
  });

  describe("Wizard Completion", () => {
    it("should complete wizard and call onDone with answers", async () => {
      render(<Wizard questions={mockQuestions} onDone={mockOnDone} />);
      const expectedAnswers: WizardAnswers = {
        "1": "John Doe",
        "2": "yes",
        "3": "Insurance Co",
        "4": "john@example.com",
      };
      // Navigate through all questions
      const answers = ["John Doe", "yes", "Insurance Co", "john@example.com"];
      for (let i = 0; i < answers.length; i++) {
        const input = screen.getByPlaceholderText("Enter your answer...");
        await user.type(input, answers[i]);
        if (i < answers.length - 1) {
          await user.click(screen.getByText("Next"));
        } else {
          // Last question should show "Done" button
          expect(screen.getByText("Done")).toBeInTheDocument();
          await user.click(screen.getByText("Done"));
        }
      }
      expect(mockOnDone).toHaveBeenCalledWith(expectedAnswers);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty questions array", () => {
      render(<Wizard questions={[]} onDone={mockOnDone} />);
      expect(screen.getByText("No questions available")).toBeInTheDocument();
    });
  });
});
