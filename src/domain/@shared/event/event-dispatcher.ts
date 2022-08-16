import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

type EventsHandlers = {
  [eventName: string]: EventHandlerInterface[]
}

export default class EventDispatcher implements EventDispatcherInterface {

  private eventHandlers: EventsHandlers = {};

  get getEventHandlers(): EventsHandlers {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface<eventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface<eventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      throw new Error("EventHandler not registred!")
    }
    const index = this.eventHandlers[eventName].indexOf(eventHandler);
    if (index !== -1) {
      this.eventHandlers[eventName].splice(index, 1);
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {}
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      })
    }
  }

}