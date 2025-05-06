import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const analyzeMedicine = async (medicineName) => {
    console.error("Analyzing medicine:", medicineName);
  try {
    const systemPrompt = `
          You are an AI-powered assistant for analyzing medicines. Your task is to provide detailed and structured information about a specific medicine based on its name or active ingredient, or you may engage in a general conversation related to medicine. The type of request will be indicated by the prompt type, which can be either "medicine name" or "conversation."
      
          - **medicine name**: For requests that ask for detailed information about a specific medicine.
          - **conversation**: For general discussions or clarifications related to medicines or medical information.
      
          The response should be structured as follows:
      
          - **name**: The name of the medicine.
          - **description**: A short description of what the medicine is and what it is used for.
          - **sideEffects**: List the possible side effects that users may experience when taking the medicine.
          - **contraindications**: Conditions or situations where the medicine should not be used.
          - **pharmacokinetics**: Information about how the medicine is absorbed, distributed, metabolized, and excreted from the body.
          - **warnings**: Warnings related to the use of the medicine.
          - **dosage**: Recommended dosage for the medicine, including specific instructions.
          - **interactions**: Known drug interactions that may affect the effectiveness or safety of the medicine.
          - **indications**: The conditions or diseases for which the medicine is prescribed.
          - **mechanismOfAction**: A description of how the medicine works in the body to achieve its therapeutic effect.
          - **administrationRoute**: How the medicine should be administered (e.g., oral, intravenous, etc.).
          - **storage**: How the medicine should be stored, including temperature and humidity conditions.
          - **overdose**: Information about what to do in case of overdose and symptoms of overdose.
          - **precautions**: Specific precautions that should be taken when using the medicine.
          - **adverseReactions**: Rare or severe reactions that may occur with the use of the medicine.
      
          Please ensure that the response includes detailed, accurate, and relevant information about the requested medicine. If any of the details are unavailable, provide a reasonable explanation for their absence.
      
          The output should be in the following structured format:
          '''json
          {
            "prompt_type": "string",
            "medicine_data": {
              "name": "string",
              "description": "string",
              "sideEffects": "string or null",
              "contraindications": "string or null",
              "pharmacokinetics": "string or null",
              "warnings": "string or null",
              "dosage": "string or null",
              "interactions": "string or null",
              "indications": "string or null",
              "mechanismOfAction": "string or null",
              "administrationRoute": "string or null",
              "storage": "string or null",
              "overdose": "string or null",
              "precautions": "string or null",
              "adverseReactions": "string or null"
            }
          }
          '''
          - **prompt_type**: Indicates whether the request is related to specific medicine data ("medicine") or a general conversation ("conversation"). This should be one of the following values:
            - "medicine": The query is asking for details about a specific medicine.
            - "conversation": The query is related to general medical information or clarification.
      
          The response should be comprehensive, concise, and scientifically accurate to ensure that the user receives the best possible information about the medicine or has a meaningful conversation about medical topics.
        `;

    const response = await ai.models.generateContent({
      model: import.meta.env.VITE_GEMINI_MODEL,
      contents: `${systemPrompt} + ${medicineName}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt_type: {
              type: Type.STRING,
              description:
                'Type of the prompt: either "medicine" or "conversation"',
              nullable: false,
            },
            conversation_response: {
              type: Type.STRING,
              description: "Response to the conversation prompt",
              nullable: true,
            },
            medicine_data: {
              type: Type.OBJECT,
              description: "Detailed information about the medicine", // Added a description for clarity
              properties: {
                name: {
                  type: Type.STRING,
                  description: "Name of the medicine",
                  nullable: false,
                },
                description: {
                  type: Type.STRING,
                  description: "Description of the medicine",
                  nullable: false,
                },
                sideEffects: {
                  type: Type.STRING,
                  description: "Possible side effects",
                  nullable: true,
                },
                contraindications: {
                  type: Type.STRING,
                  description: "Contraindications for the medicine",
                  nullable: true,
                },
                pharmacokinetics: {
                  type: Type.STRING,
                  description: "Pharmacokinetics of the medicine",
                  nullable: true,
                },
                warnings: {
                  type: Type.STRING,
                  description: "Warnings associated with the medicine",
                  nullable: true,
                },
                dosage: {
                  type: Type.STRING,
                  description: "Recommended dosage",
                  nullable: true,
                },
                interactions: {
                  type: Type.STRING,
                  description: "Drug interactions",
                  nullable: true,
                },
                indications: {
                  type: Type.STRING,
                  description: "Indications for the medicine",
                  nullable: true,
                },
                mechanismOfAction: {
                  type: Type.STRING,
                  description: "Mechanism of action of the medicine",
                  nullable: true,
                },
                administrationRoute: {
                  type: Type.STRING,
                  description: "Route of administration",
                  nullable: true,
                },
                storage: {
                  type: Type.STRING,
                  description: "Storage instructions",
                  nullable: true,
                },
                overdose: {
                  type: Type.STRING,
                  description: "Overdose information",
                  nullable: true,
                },
                precautions: {
                  type: Type.STRING,
                  description: "Precautions to take",
                  nullable: true,
                },
                adverseReactions: {
                  type: Type.STRING,
                  description: "Adverse reactions",
                  nullable: true,
                },
              },
              // Required properties *within* the medicine_data object
              required: ["name", "description"],
            },
          },
          // Required properties at the *top* level of the responseSchema object
          required: ["prompt_type", "conversation_response"],
        },
      },
    });

    if (response && response.text) {
        console.log("Response text:", response);
      return JSON.parse(response.text);
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error analyzing medicine:", error);
    throw error;
  }
};

export const analyzeMedicineStream = async (medicineName, onChunk) => {
  const response = await ai.models.generateContentStream({
    model: import.meta.env.VITE_GEMINI_MODEL,
    contents: medicineName,
  });

  for await (const chunk of response) {
    onChunk(chunk.text);
  }
};
