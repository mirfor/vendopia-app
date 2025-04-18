import React, { useState } from 'react';
import data from './data.json';

const DataForm = () => {
  const [formData, setFormData] = useState(data);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const domains = Object.keys(formData);

  const handleDomainChange = (e) => {
    setSelectedDomain(e.target.value);
    setSelectedOperation(null);
    setIsEditing(false);
  };

  const handleOperationSelect = (operation) => {
    setSelectedOperation(operation);
    setIsEditing(true);
  };

  const handleOperationChange = (e) => {
    const { name, value } = e.target;
    setSelectedOperation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountingInstructionChange = (index, field, value) => {
    setSelectedOperation(prev => ({
      ...prev,
      accountingInstructions: prev.accountingInstructions.map((instruction, i) => 
        i === index ? { ...instruction, [field]: value } : instruction
      )
    }));
  };

  const handleSave = () => {
    setFormData(prev => ({
      ...prev,
      [selectedDomain]: {
        ...prev[selectedDomain],
        serviceOperations: prev[selectedDomain].serviceOperations.map(op =>
          op.name === selectedOperation.name ? selectedOperation : op
        )
      }
    }));
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Service Operations Manager</h1>
      <div className="welcome-message">
        <p>Welcome to the Service Operations Manager! Version 1.0.1</p>
        <p className="deployment-info">Deployment verified: {new Date().toLocaleDateString()}</p>
      </div>
      
      <div className="form-group">
        <label className="label">Select Service Domain</label>
        <select
          className="select"
          value={selectedDomain}
          onChange={handleDomainChange}
        >
          <option value="">-- Select Domain --</option>
          {domains.map(domain => (
            <option key={domain} value={domain}>
              {formData[domain].serviceDomain}
            </option>
          ))}
        </select>
      </div>

      {selectedDomain && (
        <div>
          <h2>{formData[selectedDomain].serviceDomain} Operations</h2>
          
          <div className="operations-grid">
            {formData[selectedDomain].serviceOperations.map((operation, index) => (
              <div
                key={operation.name}
                className={`operation-card ${selectedOperation?.name === operation.name ? 'selected' : ''}`}
                onClick={() => handleOperationSelect(operation)}
              >
                <h3 className="operation-title">{operation.name}</h3>
                <p className="operation-description">{operation.description}</p>
                <p className="operation-frequency">
                  Frequency: {operation.executionFrequency}
                </p>
              </div>
            ))}
          </div>

          {selectedOperation && isEditing && (
            <div className="edit-form">
              <h3>Edit Operation</h3>
              
              <div className="form-group">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={selectedOperation.name}
                  onChange={handleOperationChange}
                  className="input"
                />

                <label className="label">Description</label>
                <textarea
                  name="description"
                  value={selectedOperation.description}
                  onChange={handleOperationChange}
                  className="textarea"
                  rows="3"
                />

                <label className="label">Execution Frequency</label>
                <input
                  type="text"
                  name="executionFrequency"
                  value={selectedOperation.executionFrequency}
                  onChange={handleOperationChange}
                  className="input"
                />

                {selectedOperation.accountingInstructions && (
                  <div className="form-group">
                    <h4>Accounting Instructions</h4>
                    {selectedOperation.accountingInstructions.map((instruction, index) => (
                      <div key={index} className="form-group">
                        <label className="label">Instruction Type</label>
                        <input
                          type="text"
                          value={instruction.instructionType}
                          onChange={(e) => handleAccountingInstructionChange(index, 'instructionType', e.target.value)}
                          className="input"
                        />

                        <label className="label">Posting Rule</label>
                        <input
                          type="text"
                          value={instruction.postingRule}
                          onChange={(e) => handleAccountingInstructionChange(index, 'postingRule', e.target.value)}
                          className="input"
                        />

                        <label className="label">Trigger</label>
                        <input
                          type="text"
                          value={instruction.trigger}
                          onChange={(e) => handleAccountingInstructionChange(index, 'trigger', e.target.value)}
                          className="input"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="button-container">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="button button-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="button button-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataForm; 