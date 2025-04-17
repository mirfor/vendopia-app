import React from "react";
import data from "./data.json";

export default function App() {
  const productDirectory = data.ProductDirectory;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product Directory Operations</h1>
      
      <div className="space-y-8">
        {/* Service Operations Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Service Operations</h2>
          <div className="space-y-4">
            {productDirectory.serviceOperations.map((operation, index) => (
              <div key={index} className="border p-4 rounded">
                <h3 className="text-xl font-medium mb-2">{operation.name}</h3>
                <p className="text-gray-600 mb-2">{operation.description}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Execution Frequency:</span> {operation.executionFrequency}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Parameters Section */}
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Product Parameters</h2>
          <div className="space-y-4">
            {Object.entries(productDirectory.productParameters).map(([key, value]) => (
              <div key={key} className="border p-4 rounded">
                <h3 className="text-xl font-medium mb-2">{key}</h3>
                <div className="space-y-2">
                  {Object.entries(value).map(([paramKey, paramValue]) => (
                    <div key={paramKey} className="flex">
                      <span className="font-medium w-1/3">{paramKey}:</span>
                      <span className="w-2/3">{paramValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

