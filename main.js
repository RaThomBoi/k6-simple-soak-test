import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
	stages: [
		{ duration: "1m", target: 1500 }, // ramp-up to 10 users over 30 seconds
		{ duration: "5m", target: 1500 }, // stay at 10 users for 1 minute
		{ duration: "30s", target: 0 }, // ramp-down to 0 users over 30 seconds
	],
};

export default function () {
	let headers = {
		Authorization: "Basic YWRtaW46YWRtaW4=",
	};
	let res = http.get(
		"http://webserverloadbalancer-630383498.us-west-2.elb.amazonaws.com/db/admin/",
		{ headers: headers }
	);
	check(res, {
		"status is 200": (r) => r.status === 200,
	});
	sleep(1);
}
