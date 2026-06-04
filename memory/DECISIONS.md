# Engineering Decisions

Use this file as a lightweight Architecture Decision Record log. Record only decisions that affect architecture, system boundaries, technology choices, infrastructure direction, or long-term maintainability.

Do not use this file as a change log, release notes, task history, or commit history.

When a decision is replaced, mark the old decision as `Superseded` and reference the replacement decision. Preserve decision history.

## 2026-06-04

### Title

Use Terminal/Infrastructure Portfolio Visual Direction

### Status

Accepted

### Context

The portfolio redesign replaces the previous general portfolio styling with a stronger AI/backend systems presentation.

### Decision

Use a terminal/infrastructure-inspired visual system with compact mono labels, semantic Tailwind color tokens, hairline borders, projects-before-experience page order, and a branded Open Graph image.

### Impact

Future UI changes should extend this visual language instead of reintroducing rounded card-heavy or generic marketing styling. Keep project content, resume links, analytics, and Vercel deployment behavior preserved when changing presentation.

## 2026-06-03

### Title

Portfolio Focuses on Projects Over Blogging

### Status

Accepted

### Context

The primary goal of the website is to support job applications for AI Software Engineer and Backend Engineering roles.

### Decision

Prioritize project showcases and technical work over blog content.

### Impact

Future additions should emphasize projects, architecture, and engineering outcomes.

## 2026-06-03

### Title

Deploy Portfolio on Vercel

### Status

Accepted

### Context

The portfolio is a personal website with low operational complexity requirements.

### Decision

Use Vercel for hosting and deployment.

### Impact

Deployment workflows should remain compatible with the Vercel platform.

## 2026-06-03

### Title

Portfolio Focuses on AI Software Engineering

### Status

Accepted

### Context

Career goals are AI Software Engineer, AI Engineer, and Backend-focused AI Engineering roles.

### Decision

Present projects, skills, and content through the lens of AI systems and backend engineering rather than general software development.

### Impact

New projects and portfolio content should reinforce this positioning.
