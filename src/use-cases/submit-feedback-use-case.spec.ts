import { create } from "domain";
import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {

    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "This is a bug",
      screenshot: "data:image/png;base64,fpd0fysupdsu0sadud"
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(submitFeedback.execute({
      type: "",
      comment: "This is a bug",
      screenshot: "data:image/png;base64,fpd0fysupdsu0sadud"
    })).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "",
      screenshot: "data:image/png;base64,fpd0fysupdsu0sadud"
    })).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(submitFeedback.execute({
      type: "BUG",
      comment: "This is a bug",
      screenshot: "test.jpg"
    })).rejects.toThrow();
  });
});