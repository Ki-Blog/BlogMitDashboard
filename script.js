import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  let res = http.get('https://aiq-blog.de');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  console.log(`Response status: ${res.status}`);
  console.log(`Response body: ${res.body}`);
  sleep(1);
}
