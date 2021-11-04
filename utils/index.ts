import {Event} from "../types";

export function groupEventsByDate(events: Event[]): Record<string, Event[]> {
    const grouped: Record<string, Event[]> = {}
    events.forEach((event) => {
        const cmp: string = new Date(event.date).toDateString()
        if (grouped[cmp]) {
            grouped[cmp].push(event)
        } else {
            grouped[cmp] = new Array(event)
        }
    })
    return grouped
}

