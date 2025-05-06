# 🧾 Product Requirements Document (PRD)

## 📌 Project Title
**AI-Powered Medicine Analyzer**

## 🧠 Overview
A browser-based application that allows users to input the name of a medicine and get a structured AI-generated breakdown of its:
- Composition
- Usage
- Dosage
- Side effects
- Interactions
- Warnings

The application uses **React + Vite** for fast frontend rendering and the **Google Generative AI SDK (`@google/generative-ai`)** with **Structured Output API** to query **MedLM** models for medical intelligence.

---

## 🎯 Goals
- Provide clear, structured, medically relevant information from natural language queries.
- Showcase the power of Google MedLM’s structured output in a real-world health context.
- Keep the application frontend-only with no backend or database involved.
- Be simple, viral, and useful to both general users and developers.

---

## 🧱 Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | React + Vite                     |
| Styling      | Tailwind CSS                     |
| AI API       | Google genai sdk    |
| Output Mode  | Structured Output (JSON Schema)  |
| Hosting      | Any static host (GitHub Pages, Vercel, etc.) |

---

## 🖥️ Key Features

### ✅ Input Section
- Text input to accept medicine name
- "Analyze" button to trigger AI request

### ✅ AI Query & Structured Output
- Query MedLM using structured schema prompt
- Expect output in strict JSON format:
  ```json
	{
  	"name": "string",
  	"generic_name": "string",
  	"composition": ["string"],
  	"dosage": "string",
  	"uses": ["string"],
  	"side_effects": ["string"],
  	"interactions": ["string"],
  	"contraindications": ["string"],
  	"warnings": ["string"],
  	"storage": "string",
  	"administration": "string",
  	"manufacturer": "string",
  	"approval_status": "string",
  	"last_updated": "YYYY-MM-DD",
  	"additional_notes": "string",
  	"drug_class": "string",                     // e.g., NSAID, Antibiotic
  	"mechanism_of_action": "string",           // How the drug works
  	"pharmacokinetics": "string",              // Absorption, metabolism info
  	"overdose_symptoms": ["string"],           // What happens if overdosed
  	"antidote": "string",                      // If any exists
  	"prescription_required": "boolean",        // OTC or not
  	"pregnancy_category": "string",            // e.g., Category B, C, D, X
  	"age_restrictions": "string",              // Min/max age limits
  	"black_box_warning": "string",             // FDA black box warning if any
  	"source_reference": "string"               // URL or citation for info
	}

