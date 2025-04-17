import React, { useState } from "react";
import data from "./data.json"; // Umieść plik JSON w src/data.json

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");

  const domains = Object.keys(data);
  const operations =
    selectedDomain && data[selectedDomain]?.serviceOperations || [];
  const selectedDetails = operations.find(
    (op) => op.name === selectedOperation
  );

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formularz operacji produktowych</h1>

      <label className="block mb-2">Domena usługowa:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedDomain}
        onChange={(e) => {
          setSelectedDomain(e.target.value);
          setSelectedOperation("");
        }}
      >
        <option value="">-- Wybierz domenę --</option>
        {domains.map((domain) => (
          <option key={domain} value={domain}>
            {data[domain].serviceDomain}
          </option>
        ))}
      </select>

      {operations.length > 0 && (
        <>
          <label className="block mb-2">Operacja:</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedOperation}
            onChange={(e) => setSelectedOperation(e.target.value)}
          >
            <option value="">-- Wybierz operację --</option>
            {operations.map((op) => (
              <option key={op.name} value={op.name}>
                {op.name}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedDetails && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Szczegóły operacji</h2>
          <p><strong>Opis:</strong> {selectedDetails.description}</p>
          <p><strong>Częstotliwość:</strong> {selectedDetails.executionFrequency}</p>

          {selectedDetails.accountingInstructions && (
            <div className="mt-3">
              <h3 className="font-semibold">Instrukcje księgowe:</h3>
              <ul className="list-disc list-inside">
                {selectedDetails.accountingInstructions.map((ai, index) => (
                  <li key={index}>
                    {ai.instructionType} – {ai.postingRule} ({ai.trigger})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

