# AI Agent Rules - MyCard

## Objective

Maintain code quality, ensure stable pipelines, and keep the project organized.

---

## Pipeline Validation

After every push:

1. Verify if the GitHub Actions pipeline completed successfully.
2. If the pipeline fails:

   * Analyze the error logs.
   * Identify the root cause.
   * Apply the smallest safe correction possible.
   * Run local validations before pushing again:

     * npm run build
     * npm run lint
     * npm test
3. Commit and push the correction.
4. Repeat for a maximum of 3 attempts.
5. If the same error continues, stop and request human review.

---

## Development Rules

* Keep components reusable.
* Prefer simple and readable React code.
* Avoid unnecessary complexity.
* Follow the existing project structure.
* Never delete unrelated files.
* Always explain:

  * what failed
  * what was corrected
  * why the fix works

---

## React Standards

* Prefer functional components.
* Use useState for dynamic state.
* Use useEffect for side effects and API calls.
* Handle loading and error states for APIs.

---

## Safety Rules

* Never expose API keys or secrets.
* Never make destructive changes without confirmation.
* Avoid infinite correction loops.
