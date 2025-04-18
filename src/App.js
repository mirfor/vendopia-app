import React from 'react';

function App() {
  return (
    <div style={{ 
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#1a73e8' }}>Hello World</h1>
        <p style={{ color: '#5f6368' }}>Welcome to Vendopia App</p>
      </div>
    </div>
  );
}

export default App;
