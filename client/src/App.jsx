import React from 'react';
import Login from './components/Login';

const App = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-6 w-full max-w-md">
                <Login />
            </div>
        </div>
    );
};

export default App;