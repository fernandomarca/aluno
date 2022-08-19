import Notification from "./notification";
import NotificationError from "./notification.error";

describe("Unit test for notifications", () => {
  it("should create errors", () => {
    const notification = new Notification();

    const error = {
      message: "error message",
      context: "customer"
    }

    const error2 = {
      message: "error message2",
      context: "customer"
    }

    const error3 = {
      message: "error message",
      context: "order"
    }

    notification.addError(error);

    expect(notification.messages("customer")).toBe("customer: error message,")

    notification.addError(error2);

    expect(notification.messages("customer")).toBe("customer: error message,customer: error message2,")

    notification.addError(error3);

    expect(notification.messages("order")).toBe("order: error message,")

    expect(notification.messages()).toBe("customer: error message,customer: error message2,order: error message,")
  })

  it("should check if notification has at least on error", () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    const error = {
      message: "error message",
      context: "customer"
    }

    notification.addError(error);

    expect(notification.hasErrors()).toBe(true);

  })

  it("should get all errors props", () => {

    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    const error = {
      message: "error message",
      context: "customer"
    }

    notification.addError(error);

    expect(notification.getErrors()).toEqual([error]);

  })

  it("should notificationError", () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);

    const error = {
      message: "error message",
      context: "customer"
    }

    notification.addError(error);
    const notificationError = new NotificationError(notification.getErrors());

    expect(notificationError.errors.length).toBe(1);
    expect(notificationError.errors).toEqual([error]);
    expect(notificationError.errors[0].message).toBe("error message");
    expect(notificationError.errors[0].context).toBe("customer");

  })
})