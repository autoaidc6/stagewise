# Product Requirements Document: Stagewise Quiz & Assessment Platform

**Version:** 1.0
**Date:** October 26, 2023
**Author:** Gemini Senior Frontend Engineer
**Status:** In Development

### 1. Introduction

Stagewise is a modern, web-based educational platform designed to support teachers and students within the UK curriculum framework. It provides a suite of tools that simplify quiz creation, facilitate student practice, and enable performance tracking. For teachers, Stagewise is a time-saving assistant, capable of generating high-quality assessment materials in seconds. For students, it is an engaging and personalized learning companion.

### 2. Vision & Goals

**Product Vision:** To become the go-to platform for UK educators seeking simple, powerful, and intelligent tools for creating and managing classroom assessments, thereby fostering a more efficient and effective learning environment.

**Key Goals:**
*   **For Teachers:** Drastically reduce the time and effort required to create curriculum-aligned quizzes. Provide clear, actionable insights into student performance.
*   **For Students:** Offer an accessible and engaging platform to practice and master subjects. Build confidence through targeted revision and progress tracking.
*   **For the Platform:** Ensure reliability, ease of use, and scalability. Leverage cutting-edge AI to provide unique value to educators.

### 3. User Personas

1.  **Mrs. Davis - The Busy Teacher**
    *   **Role:** KS4 Science Teacher
    *   **Needs:** A quick way to create topic-specific quizzes for revision and homework. A central place to manage all her assessments.
    *   **Pain Points:** Spends evenings and weekends creating worksheets from scratch. It's difficult to track which students are struggling with specific topics.
    *   **How Stagewise Helps:** Mrs. Davis can use the AI Generator to create a quiz on "Cell Mitosis" in under a minute, review it, and publish it for her class.

2.  **Tom - The Motivated Student**
    *   **Role:** Year 9 Student
    *   **Needs:** Access to practice quizzes for his upcoming Maths and History exams. A way to check his knowledge and see where he needs to improve.
    *   **Pain Points:** Finds re-reading textbooks boring. Isn't sure what the most important topics are to focus on.
    *   **How Stagewise Helps:** Tom can log in and see a list of available quizzes, including "KS3 Algebra" and "The Norman Conquest," allowing him to practice interactively.

### 4. Features & Requirements

#### 4.1. Core: User Authentication & Onboarding
*   **User Story:** As a new user, I want to sign up by selecting my role (Teacher/Student) so I can access the correct features and dashboard.
*   **Requirements:**
    *   A landing page that clearly directs users to role-based journeys.
    *   A unified form that supports both "Sign Up" and "Sign In" states.
    *   Role-specific onboarding flows to capture essential user details (e.g., subjects, key stage).

#### 4.2. Teacher Workflow: Quiz Creation & Management
*   **User Story:** As a teacher, I want a central dashboard where I can view, edit, and manage all my published quizzes and drafts.
*   **Requirements:**
    *   A teacher dashboard with distinct sections for "Published Quizzes" and "Quiz Drafts".
    *   Quizzes displayed in a clear, sortable table format showing title, subject, and question count.
    *   Action buttons for each quiz: Edit, Publish (for drafts), and Delete (for drafts).

*   **User Story:** As a teacher, I want multiple flexible options for creating a quiz to fit my needs.
*   **Requirements:**
    *   A "Create Quiz" hub that presents three creation paths:
        1.  **Manual Creation:** A step-by-step editor to build a quiz from scratch, with full control over questions and answers.
        2.  **AI Generation:** An intuitive form to specify a topic, number of questions, subject, and difficulty, which uses the Gemini API to generate a complete quiz for review. Must show loading and handle potential errors gracefully.
        3.  **File Upload:** A drag-and-drop interface to upload a pre-formatted `.csv` or `.txt` file, which is then parsed into the quiz editor.

*   **User Story:** As a teacher, I want a robust quiz editor where I can review AI-generated content or build my own questions.
*   **Requirements:**
    *   An editor that can be pre-populated with data from AI generation, file upload, or an existing quiz.
    *   Functionality to add, edit, and delete multiple-choice questions.
    *   Ability to save work as a draft to `localStorage`.
    *   A "Save & Publish" action to finalize the quiz and make it available to students.
    *   **Crucial UX:** Implement confirmation dialogs to prevent accidental data loss when deleting a draft or closing the editor with unsaved changes.

#### 4.3. Student Workflow: Quiz Access
*   **User Story:** As a student, I want to log in and immediately see all the quizzes that are available for me to practice.
*   **Requirements:**
    *   A student dashboard that displays a clean, card-based list of all published quizzes.
    *   Each card should show the quiz title, subject, and number of questions.
    *   A "Start Quiz" button on each quiz to initiate a practice session (Note: The quiz-taking interface is a future feature).

#### 4.4. Admin Workflow: Platform Oversight
*   **User Story:** As a platform administrator, I want a high-level overview of platform activity.
*   **Requirements:**
    *   An admin dashboard with key statistics (e.g., total users, total quizzes).
    *   Quick-action buttons for primary administrative tasks like user management.

### 5. Design & User Experience (UX)
*   **Aesthetics:** The UI will be clean, modern, and professional, using a consistent color palette of blues and neutral slates to create a trustworthy and focused environment.
*   **Responsiveness:** The application must be fully responsive, providing an optimal experience on desktop, tablet, and mobile devices.
*   **Accessibility:** The application will adhere to accessibility best practices, including semantic HTML, keyboard navigability, and sufficient color contrast.
*   **Feedback:** The UI will provide clear visual feedback for user actions, including loading states for asynchronous operations (like AI generation) and success/error messages.

### 6. Out of Scope / Future Roadmap
The following features are planned for future versions but are not part of the initial scope:
*   **Full quiz-taking experience** for students, including timers and submission logic.
*   **Post-quiz results page** with detailed feedback.
*   **Advanced teacher analytics** on class and individual student performance.
*   **Homework assignment system** with due dates and notifications.
*   **Backend integration** with a database to replace `localStorage` for persistent, cross-device storage of drafts and quizzes.
*   **Real user authentication** service integration.
*   Support for **additional question types** (e.g., true/false, fill-in-the-blank).
