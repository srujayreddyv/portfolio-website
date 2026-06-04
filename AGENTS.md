# AI Software Engineering Memory

## Before Implementation

1. Understand the task and expected outcome.
2. Read:
   * `memory/CODEBASE.md`
   * `memory/ARCHITECTURE.md`
   * `memory/PATTERNS.md`
   * `memory/DECISIONS.md`
3. State assumptions and unclear requirements.
4. Create a task plan before changing code.
5. Define how the work will be verified.

## Implementation

1. Follow the approved plan.
2. Prefer existing patterns.
3. Make minimal changes.
4. Avoid unrelated refactoring.
5. Preserve architectural boundaries.
6. Update tests when behavior changes.
7. Keep new abstractions justified by current needs.
8. Remove only unused code introduced by the task.

## Review

Review:

* Correctness
* Security
* Performance
* Maintainability
* Backward compatibility
* Test coverage

Document material risks before finalizing the work.

## Memory Updates

Update memory when:

* Repository structure changes
* Architecture changes
* Patterns change
* New engineering decisions are made
* Existing decisions are superseded

Do not update memory for ordinary task history, release notes, or implementation details that are obvious from source code.

## Additional Rules

* Prefer consistency over novelty.
* Document assumptions.
* Document risks.
* Prefer incremental changes.
* Preserve existing conventions.
* Keep files concise and high signal.
* Do not invent process when memory is enough.
