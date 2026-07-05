## This is the backend for the Vet Clinic application, built using C# (ASP.NET Core).

# Vet Clinic App - Version 1 (Prototype)

This is the initial foundational prototype of my Vet Clinic application. The goal of Version 1 was to design the core database structure, build the basic CRUD operations, and connect a working Angular frontend to a C# ASP.NET Core backend.

* **Backend:** C# (ASP.NET Core Web API)
* **Database:** SQL Server via Entity Framework Core
* **Frontend:** Angular, HTML5, and CSS3

## Core Features Implemented
* **Basic CRUD Operations:** Set up the initial data pathways to create, read, update, and delete Users, Animals, and Medications.
* **Relational Database Design:** Configured tables, foreign keys, and standard query tracking filters.
* **Connected User Interface:** Formed the basic layout input fields and roster tables to display backend data on the screen.

## Why I Moved to Version 2
While Version 1 successfully connected the frontend to the backend, it revealed a few architectural limitations. It relied on default browser styling, lacked defense safeguards against duplicate data codes, and the UI buttons would lock up during server errors. 

I built **Version 2** as a separate repository to address these edge cases, implement strict controller-level input validations, add full multi-language support (English/Serbian), and design a polished, responsive card dashboard layout.
