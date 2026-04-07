
const BACKEND_URL = import.meta.env.BACKEND_URL;

export class UpcomingEvent {
    public event_name: string;
    public event_chair: string;
    public event_start_date: string; // YYYY-MM-DD
    public approx_total_budget?: number;

    constructor(eventName: string, eventChair: string, eventDate: string, approxTotalBudget?: number) {
        this.event_name = eventName;
        this.event_chair = eventChair;
        this.event_start_date = eventDate;
        this.approx_total_budget = approxTotalBudget;
    }
}


export interface Stats {
    balance: number;
    pending_proposals: number;
    pending_reimbursements: number;
    approved_proposals: number;
    approved_reimbursements: number;
}

export async function getStatsAndUpcomingEvents(): Promise<{stats: Stats, upcoming_events: Array<UpcomingEvent>}> {
    const res = await fetch(`${BACKEND_URL}/get-stats-and-upcoming-events`);
    // const res = await fetch('http://localhost:5000/get-stats-and-upcoming-events')
    let js = await res.json();
    console.log({
        stats: js.stats,
        upcoming_events: js.upcoming_events
    })
    return {
        stats: js.stats,
        upcoming_events: js.upcoming_events
    }
}


export interface Transaction {
    Timestamp: string;
    From: string;
    To: string;
    Amount: number;
    PropID: string;
    Notes: string;
    Balance: number;
    PrevHash: string;
}