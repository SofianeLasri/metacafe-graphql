type EventCallback = (payload?: any) => void;

class EventBus {
    private events: Map<string, EventCallback[]> = new Map();

    on(event: string, callback: EventCallback): void {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);
    }

    emit(event: string, payload?: any): void {
        if (this.events.has(event)) {
            this.events.get(event)!.forEach(callback => callback(payload));
        }
    }
}

export default new EventBus();