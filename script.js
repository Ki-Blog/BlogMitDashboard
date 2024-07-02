import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('http://a9f15d3fa0f9849a1bf9a8a377ed214d-665923958.eu-central-1.elb.amazonaws.com/api/auth');
  sleep(1);
}
