type RateLimitInfo = {
  count: number;
  resetTime: number;
};

const ipMap = new Map<string, RateLimitInfo>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  let info = ipMap.get(ip);
  if (!info) {
    info = { count: 0, resetTime: now + windowMs };
    ipMap.set(ip, info);
  }

  if (now > info.resetTime) {
    info.count = 0;
    info.resetTime = now + windowMs;
  }

  if (info.count >= maxRequests) {
    return false; // Rate limit exceeded
  }

  info.count += 1;
  return true;
}
