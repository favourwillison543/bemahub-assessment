# SOLUTION.md

**Name:** Mmesoma favour
**Date:** 2026-09-12
**Actual time spent:** Approximately 5hrs:30mins of assessment work. Environment/setup was completed before starting the timed assessment, including a significant amount of Docker networking troubleshooting specific to GitHub Codespaces. An initial repository push (the unmodified starter package) was made before starting the timed work.

---

## 1. What I completed

| Task | Status | Evidence file |
|---|---|---|
| 1 — Course list | done | `evidence/task-1-ui.png`, `evidence/task-1-network.png` |
| 2 — Authentication | done | `evidence/task-2-signedout.png`, `evidence/task-2-signedin.png`, `evidence/task-2-network.png` |
| 3 — Withdrawal form | done | `evidence/task-3-validation.png`, `evidence/task-3-server-error.png`, `evidence/task-3-success.png`, `evidence/task-3-network.png` |
| 4 — PHP defects | 4 of 4 found and fixed | `evidence/task-4-curl.txt` |
| 5 — Database | not attempted | |
| 6 — Infrastructure | not attempted | |
| 7 — Python | not attempted | |

## 2. What I did NOT finish, and how I would approach it

I completed Tasks 1–4 but did not complete Tasks 5–7 within the available assessment time.

For Task 5, I would first inspect the relevant tables and indexes, reproduce the duplicate-record behaviour described in 5.2, and confirm why the existing unique key allows duplicates (MySQL treats each `NULL` in a unique index as distinct, so two active rows with `cancelled_at IS NULL` never collide). I would then write a forward-only migration (`002_fix_withdrawal_reference.sql`) rather than editing the applied `001_initial.sql`, apply it, and re-run the duplicate-insert test to confirm it now fails.

For Task 6, I would answer each incident by reasoning through the cheapest, most likely check first: for the invisible deploy, checking browser/CDN caching and build-hash verification before assuming a deeper issue; for the 502, checking container logs for a startup crash tied to the new config read before assuming infrastructure; for the vanishing change, explaining that a manual in-container fix does not survive a redeploy because containers are rebuilt from the image, not the running instance.

For Task 7, I would run the script against the real data, read the traceback, and fix the three named issues in order: handle the data condition that crashes the script, filter by `status == "paid"` before summing, and ensure a missing/invalid file exits with code 2 instead of a raw traceback.

Given additional time, I would estimate roughly 40–60 minutes to complete and verify Tasks 5–7 properly, including evidence capture.

## 3. Task 4 — the defects

**Defect 1 (permission):** `GET /me/earnings` used `check_authenticated` as its permission callback. This only verified that the caller was signed in, not that they held the instructor role. This was incorrect because the contract requires the endpoint to be instructor-only; a learner account could call it and receive a real, successful response containing another user's financial data. I changed the permission callback to use the existing `check_instructor` method. I verified this using the learner account's token against the same request before and after the change: `200 OK` with earnings data before, `403 Forbidden` with `{"code":"forbidden","message":"Instructors only."}` after.

**Defect 2 (schema):** The course detail controller (`get_course()`) read `$row->lessons_total`, a property that does not exist on the returned database row — the actual column, per the migration, is `lesson_count`. Because the property didn't exist, the null-coalescing fallback silently returned `0` for every course regardless of its real lesson count. I corrected the property name to `lesson_count`. I verified this via `GET /courses/1`, which returned `"lessonCount":0` before the fix and `"lessonCount":12` after, matching the seeded value.

**Defect 3 (contract):** The public `GET /courses` query had no `WHERE` clause filtering on `is_published`. As a result, the unpublished seed course ("Advanced Laminated Dough") appeared in the public course list, even though the API contract explicitly states unpublished courses must never be returned. I added `WHERE c.is_published = 1` to the query. I verified this via `GET /courses`, which returned 5 courses (including the unpublished one) before the fix and 4 courses (ids 1–4 only) after.

**Defect 4 (validation):** `MINIMUM_WITHDRAWAL_MINOR` was defined as a constant but never actually checked inside `create_withdrawal()`. This meant a withdrawal for any amount above zero would succeed as long as it didn't exceed the available balance, silently ignoring the documented minimum. I added a `below_minimum` check, placed before the `insufficient_balance` check so the more specific rule is evaluated first and the failure reason is deterministic. I verified this by submitting a withdrawal of `amountMinor: 100` (₦1.00), which returned `422` with `{"code":"below_minimum","message":"Withdrawal amount is below the minimum allowed."}` after the fix.

## 4. Specific questions

**Task 1:** I treated `previewExpiresInSeconds` as data-freshness metadata supplied by the API, not something the frontend should calculate independently. My course list hook uses it to drive React Query's `refetchInterval`, so the list automatically refetches once the server-declared preview window has elapsed, keeping the displayed data aligned with what the backend considers current without hardcoding any TTL value in the frontend.

**Task 3:** `payoutReference` must be generated once per attempt and reused across any retries of that same attempt because it is the idempotency key the backend uses to recognise a repeated request. If it were regenerated on every retry, a network hiccup that caused the client to silently resend the request would look like a brand-new, distinct withdrawal to the server — and the instructor could be paid out twice for what was intended as a single action. Reusing the same reference lets the backend detect the duplicate and return the original result instead of creating a second payout.

**Task 5.2:** Not attempted directly, but based on reading the schema comment in `001_initial.sql` and the task description: the unique key `(instructor_id, payout_reference, cancelled_at)` fails to prevent duplicates because MySQL unique indexes treat each `NULL` value as distinct from every other `NULL`. Since `cancelled_at` is `NULL` for every active (non-cancelled) withdrawal, two active rows with the same `instructor_id` and `payout_reference` can both satisfy the constraint simultaneously. A new migration is needed rather than editing `001_initial.sql` because that migration has already been applied to the running database — editing it changes nothing for a database that already booted from it, and it would make the migration history inconsistent for anyone (including graders) who runs the package fresh.

**Task 7:** Not attempted directly. My reasoning: `"fee_minor": null` should be treated as a distinct state from `0`, not silently coerced to zero, following the same principle applied throughout this assessment to `enrolmentCount`/`averageRating` — `null` means "not known or not applicable," while `0` is an explicit, measured value. Treating `null` as `0` in a reconciliation script risks understating or misrepresenting fees in a financial report. I would flag such records rather than silently summing them as zero.

## 5. Anything wrong in our brief

Per `docs/SETUP.md`: "If setup exceeds 20 minutes because of environment or Docker issues, stop and contact us... it is our packaging problem to solve, not yours." I want to report exactly what I saw, in that spirit.

I worked in GitHub Codespaces rather than local Docker, due to a limited local data allowance. Two issues surfaced that are specific to that environment and are not present in the local-Docker setup this package assumes:

1. The WordPress container's setup script (`setup.sh`) downloads WP-CLI from `raw.githubusercontent.com` on first boot. Inside the Codespaces container, this failed with a DNS resolution error ("Could not resolve host"), even though the Codespace host itself had normal internet access. I worked around this by downloading WP-CLI directly in the Codespace and copying it into the container with `docker cp`, without modifying any package files.

2. Separately, the `wordpress` container experienced a persistent TCP connection timeout (not a DNS failure) when connecting to the `db` container on port 3306, despite both containers being confirmed on the same Docker network, DNS correctly resolving the `db` hostname, and MySQL confirmed healthy and accepting connections. I diagnosed this via `docker network inspect`, `getent hosts`, a raw `/dev/tcp` connection test, and iptables/iptables-legacy inspection, and attempted a full network rebuild — none of which resolved it. This is very likely a Codespaces-specific nested-networking issue rather than a fault in `docker-compose.yml` itself, since the file's configuration (`WORDPRESS_DB_HOST: db:3306`) is correct and standard.

Both issues cost significant time beyond the 20-minute threshold in `docs/SETUP.md`. I did not treat this as a reason to stop working, since I was able to verify the application logic against the live API once connectivity was restored, but I'm flagging it here as instructed rather than treating it as my own failure. I'd be glad to share full terminal logs if useful for improving the Codespaces path for future candidates.

Additionally, `wordpress-plugin/bemalearn.php`'s CORS policy only allows `http://localhost:PORT` origins. This does not match a Codespaces-forwarded frontend URL (`https://*.app.github.dev`), and would need adjusting for anyone testing this way rather than with local Docker.

Separately, in Task 2: the contract states a learner calling `GET /me/earnings` should receive `403`. Before I found and fixed the Task 4 permission defect, the running backend actually returned a successful `200` response with earnings data for the learner account. I treated the contract as authoritative and did not alter the frontend to fake a `403` — instead I built the frontend to correctly render whatever the API actually returned, which helped surface the underlying permission defect later confirmed and fixed in Task 4.

## 6. AI Tool Usage — required

**Which tools did you use?** Claude (Anthropic).

### 6a. Where AI was used

| Task | What AI produced | Accepted / rejected / modified |
|---|---|---|
| 1 | Initial React Query hook, course list component structure, and styling | Accepted the data-fetching logic after verifying it against the live API response; modified component structure into separate hook/list/card files and iterated on styling to match a reference design |
| 2 | Response interceptor logic for 401 handling, error-message distinction between transport failure, 401, and 403 | Accepted after verifying against real API responses for both the instructor and learner accounts |
| 3 | Withdrawal form structure, zod validation schema, idempotency key generation and header wiring | Accepted the core structure; the `withdrawal_in_progress` (422) error handling was added after I discovered that error code during my own manual testing, since it wasn't one of the two error codes explicitly named in the task brief |
| 4 | Analysis of the four PHP controller/schema files against the API contract, identification of all four defects, and proposed minimal fixes | Reviewed each proposed fix against the actual controller code, migration schema, and live API responses before applying; corrected the ordering of the minimum-withdrawal and insufficient-balance checks based on my own reasoning about which failure should take precedence |
| Environment/Docker debugging | Suggested diagnostic commands (DNS resolution checks, Docker network inspection, raw TCP tests, iptables inspection) | Ran every command myself and read the actual output before deciding on the next diagnostic step; rejected an early suggested fix (a `dns:` override in `docker-compose.yml`) after testing showed it did not resolve the issue, and reverted it |
| 5–7 | Not completed — no implementation was produced or accepted for these tasks | N/A |

### 6b. What you accepted or rejected, and why

I did not treat AI output as automatically correct. During Task 2, the actual running backend and the API contract disagreed on the learner's `/me/earnings` behaviour (200 instead of 403). Rather than accepting a suggestion to make the frontend behave as if the API had returned 403, I kept the frontend truthful to what the API actually returned and documented the discrepancy — which turned out to be the exact permission defect Task 4 asked me to find.

For Task 4, I rejected the idea of adding any extra hardening beyond the four named defects, since the brief explicitly states that fixing things the contract doesn't ask for is treated as a negative signal, not a bonus.

During Docker debugging, I rejected a `dns:` override suggestion after directly testing it and confirming it did not fix the container-to-container timeout; I removed it rather than leaving unused configuration in the compose file.

### 6c. What you verified myself, and how

- Verified all four Task 4 defects by running the actual `curl -i` commands before and after each fix and reading the real response bodies and status codes myself (see `evidence/task-4-curl.txt`).
- Verified the null-vs-zero distinction using real seeded data: inspected the live `/courses` response directly and confirmed course "Cake Decorating Basics" has a genuine `averageRating: 0` while "Pastry Fundamentals" has `averageRating: null` and `enrolmentCount: null`.
- Verified the learner-vs-instructor permission defect by logging in as both seeded test accounts and comparing the real responses from `/me/earnings`.
- Verified the response interceptor's 401 behaviour by reading `lib/api/client.ts` directly and confirming it calls `signOut()` on a 401 response.
- Verified the withdrawal flow end-to-end in the browser: triggered a client-side validation rejection, a real server-side rejection (`withdrawal_in_progress`), and a successful withdrawal, checking the DevTools Network tab for the `Idempotency-Key` header on each attempt.

### 6d. Assumptions you made

I assumed the assessment's stated local-Docker environment was equivalent to GitHub Codespaces for the purposes of setup, which turned out to be false in two specific ways (DNS resolution to GitHub, and container-to-container TCP connectivity), both documented in Section 5. I assumed `docs/API-CONTRACT.md` was authoritative whenever it disagreed with the running backend's actual behaviour, per the brief's explicit instruction. I also assumed that existing infrastructure the assessment provided (the auth token scheme, the migration system, the `useAuthStore`/axios setup) should not be rewritten or "improved" unless a specific task asked for it.

I am able to explain every part of this submission and would welcome the opportunity to walk through any of it.

## 7. Assumptions and trade-offs

The primary trade-off was scope under time pressure combined with significant unplanned environment troubleshooting. I prioritised fully completing and verifying the higher-weighted tasks (Tasks 1–4, worth 80% of the total score) over partially attempting every task. I made a deliberate choice to work in GitHub Codespaces rather than local Docker or a local VM due to a limited data allowance, which cost meaningful setup time but avoided needing to modify any application code to work around it.

For Task 4, I made only the four documented minimal fixes and did not refactor the controllers or add validation beyond what was specified. For Task 2, I used the authentication architecture already provided (`useAuthStore`, the axios interceptor) rather than introducing a different mechanism. For Task 3, I read the minimum withdrawal amount from the API response rather than hardcoding the business rule on the frontend.

## 8. If this went to production tomorrow

The areas that would worry me most are exactly the ones I did not have time to fully investigate: the database constraint issue described in Task 5.2 (which, based on my reading, currently allows duplicate active withdrawal references — a real risk of double-paying an instructor), and the infrastructure and operational-script categories I did not attempt at all.

The authentication scheme (a plain bearer token stored in user meta, with no rotation or refresh flow) is explicitly noted in the code as not production-grade, and Task 2 marked it out of scope, so I did not change it — but I would flag it before shipping.

I have not load- or concurrency-tested the withdrawal idempotency logic beyond a single manual retry in the browser, so I can't yet vouch for its behaviour under genuine race conditions (e.g., two near-simultaneous requests with the same reference arriving at almost the same time).

The Docker networking issues I encountered in Codespaces also suggest that the deployment/runtime environment matters more than the assessment's local-Docker assumption accounts for. Before trusting this setup elsewhere, I'd want to confirm behaviour in whatever the real target environment actually is.

Overall, I prioritised making the completed tasks correct, contract-aligned, and honestly evidenced over claiming completion of work I had not actually finished.