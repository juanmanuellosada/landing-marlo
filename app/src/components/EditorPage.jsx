import { useState, useEffect } from 'react';
import Login from './Login';
import Editor from './Editor';

const EditorPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const auth = localStorage.getItem('editorAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return <Editor />;
};

export default EditorPage;
