# Assessment creation prototype

A clickable single-page React prototype of the Eddo assessment creation flow — a 5-step wizard that lets a coach go from "I have an OSE assessment PDF" to "my teachers have a live assessment" without touching JSON, Google Forms config, or anything technical.

This is a pitch / screen-share prototype only. All data is hardcoded; there is no backend, no real upload, no auth.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (with a small custom theme for Eddo green and the level badge colors)

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173/.

To produce a static build:

```bash
npm run build
npm run preview
```

## What works

- Full 5-step navigation (Next / Back / clickable past steps in the stepper)
- Question delete on Step 2 — the count in the metadata grid and the info banner update live
- "Select all" / "Deselect all" toggle on the teacher list (Step 4)
- Custom checkboxes (not native) on the teacher list
- Native date input for the due date
- Loading sequence on Step 5 (`Setting up Google Forms...` → `Creating workspace entries...` → `Done!`) followed by a success state with a checkmark and a "Create another assessment" reset

## What's intentionally left out

- Real file upload, real PDF parsing
- Inline editing of question text
- Regenerate button on the feedback preview
- Authentication, persistence, responsive / mobile layouts

## Layout

```
src/
  App.tsx              top-level state + step routing
  data.ts              hardcoded questions, teachers, feedback samples, copy
  types.ts             shared types
  components/
    Stepper.tsx        the 5-step header
    Step1Upload.tsx    drop zones + search card
    Step2Review.tsx    metadata grid + question rows with delete
    Step3Preview.tsx   confidence bar + feedback samples
    Step4Assign.tsx    teacher checkboxes + due date
    Step5Confirm.tsx   summary + loading state
    SuccessState.tsx   final "Assessment is live"
    ui/
      Button.tsx
      Card.tsx
      Checkbox.tsx
      InfoBanner.tsx
```
