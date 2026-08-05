---
stack: [Django, Django REST Framework, Pydantic, pytest]
description: >-
  A shared Django library that kills boilerplate: API views with built-in
  validation and exception handling, easy model serialization, and Postman
  documentation generated from your views.
---

## The problem

Every new Django project starts with the same grind: repetitive API views, serializer classes, request validation, and documentation that drifts from the code. This library exists to make those parts consistent, boring, and shared across my projects. The README states the objectives plainly: consistency, productivity, best practices, flexibility, and sustainability.

## How it works

Four features, each targeting a recurring Django chore:

- **Seamless API views**: endpoint creation with built-in exception handling and straightforward request-body validation.
- **Extended model features**: serialization without specifying custom serializer classes — the model carries its own serialization story.
- **Postman documentation generation**: docs generated from your API views and importable into a Postman workspace. Docs stay in sync because they're *derived* from the code, not maintained next to it.
- **Request-body validation with Pydantic**: typed, declarative validation on the way in.

## Decisions worth explaining

- **Docs generated from code instead of written separately**: no drift, no "documentation sprint." If the view changes, the next generation reflects it.
- **Pydantic for validation**: type hints are the contract; validation reuses them instead of duplicating schemas. It's also the tool I reach for in Python when I want correctness without ceremony.
- **Low-ceremony distribution**: clone, submodule, or zip — it's not on PyPI yet, and the README is upfront about it: "this library is unstable, everything works fine but changes are inevitable." Honest versioning for a personal library beats fake stability.

## What's next

Stabilize the API, exercise it across more projects, and get it to PyPI once it's been battle-tested. The docs (`docs/creating-endpoints.md`, `validating-request-body.md`, `defining-models.md`, etc.) are already structured for that path.
