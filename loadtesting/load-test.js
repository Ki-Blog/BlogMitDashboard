import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let myTrend = new Trend('my_trend');

export let options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'http_req_duration': ['p(95)<500'],
  },
  ext: {
    loadimpact: {
      projectID: 123456,
      name: "My k6 test"
    }
  },
  summaryTrendStats: ["avg", "p(95)", "p(99)"]
};

export default function () {
  let res = http.get('https://api.aiq-blog.de/api/auth');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  myTrend.add(res.timings.duration);
  sleep(1);
}
