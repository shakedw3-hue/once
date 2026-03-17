# BetterLife Architecture

## System Overview

BetterLife platform components:

Marketing Website  
User Dashboard  
Course Engine  
Personalization Engine  
Admin Dashboard

---

## Frontend

Framework:

Next.js

UI:

Tailwind  
ShadCN  
Framer Motion

---

## Backend

Supabase

Handles:

Authentication  
Database  
API  
Analytics

---

## Database Tables

users

questionnaire_answers

paths

modules

lessons

user_progress

payments

analytics

---

## Personalization Algorithm

Each questionnaire answer adds points to pillars.

Example:

Goal increase income

Money +5  
Mind +2

Goal reduce stress

Mind +5  
Spirit +2

Primary Path = highest score  
Secondary Path = second highest

---

## Course Structure

Hierarchy:

Path  
Module  
Lesson

Example:

Money Path

Module Financial Direction

Lessons

Financial Awareness  
Decision Framework  
Opportunity Mapping

---

## Dashboard

Displays:

BetterLife Profile  
Next Lesson  
Progress Tracker  
Modules

---

## Admin Dashboard

Admin panel includes:

Users  
Questionnaire Answers  
Modules  
Lessons  
Payments  
Analytics

---

## Analytics Events

signup  
questionnaire completion  
purchase  
lesson completion
