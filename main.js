import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
	stages: [
		{ duration: "1m", target: 1500 }, // ramp-up to 1500 users over 1 minute
		{ duration: "5m", target: 1500 }, // stay at 1500 users for 5 minute
		{ duration: "30s", target: 0 }, // ramp-down to 0 users over 30 seconds
	],
};

export default function () {
	let headers = {
		Authorization: "Basic encodedUsernameAndPassword",
	};
	let res = http.get("testingEndPoint", { headers: headers });
	check(res, {
		"status is 200": (r) => r.status === 200,
	});
	sleep(1);
}
