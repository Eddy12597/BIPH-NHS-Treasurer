<script lang="ts">

class UpcomingEvent {
	
	public eventName: string;
	public eventChair: string;
	public approxTotalBudget?: number;


	constructor(eventName: string, eventChair: string, approxTotalBudget?: number) {
		this.eventName = eventName;
		this.eventChair = eventChair;
		this.approxTotalBudget = approxTotalBudget;
	}
}

export function getUpcomingEvents(): Array<UpcomingEvent> {
	// Test

	let eventA = new UpcomingEvent("Test 1", "Test Chair 1", 1234);
	let eventB = new UpcomingEvent("Test 2", "Test Chair 2");

	return [eventA, eventB];
}

export function getStats() {
	return {
		"balance": 6767,
		"pending_proposals": 1,
		"pending_reimbursements": 5,
		"approved_proposals": 4,
		"approved_reimbursements": 3,
	}
}

</script>