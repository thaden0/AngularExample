![image](https://github.com/user-attachments/assets/a4ea7afd-b8df-4f0b-9ecb-04d38360bb5d)

# Angular Signal-Based Timer App

This is a demo application built with **Angular 20**, designed to showcase expertise in modern Angular features such as **Signals**, **standalone components**, **inject()**, and clean reactive state management. It is intended as a technical follow-up to my interview with Brinqa, specifically to demonstrate Angular fluency in a practical, testable project.

## Purpose

This project implements a timer utility where users can:
- Set a title and a countdown duration
- Observe a live countdown with signal-based updates
- View a record of the most recently completed timer

The application was built from scratch in under an hour, following modern Angular best practices.

## Tech Stack

- **Angular 20** (Standalone APIs and Signals)
- **Bootstrap 5** + **NG-Bootstrap** (UI)
- **date-fns** (time utilities)
- **Jest** and **Angular Testing Library** (unit and component testing)
- **TypeScript** (strict mode)

## Key Features Demonstrated

- Fully **modular**, **standalone component** architecture
- Signal-based reactive state using `signal()`, `computed()`, and `effect()`
- Service separation following **SOLID** principles
- Responsive layout with Bootstrap Grid
- Typed and testable business logic using Jest and fake timers

## Component Overview

- `AppComponent`: Shell layout
- `TimerFormComponent`: Accepts user input and initializes timers
- `TimerDisplayComponent`: Reactive countdown display
- `HistoryComponent`: Shows last completed timer
- `TimerService`: Core reactive timer state (using Signals)
- `HistoryService`: Tracks previously completed timers

## Accessibility

- ARIA roles and live regions are used to ensure screen reader compatibility
- High-contrast UI design for visual clarity

## How to Run

```bash
git clone https://github.com/your-repo/angular-signal-timer.git
cd angular-signal-timer
npm install
ng serve
