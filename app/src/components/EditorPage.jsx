import { useState, useEffect, useCallback } from 'react';
import Login from './Login';
import Editor from './Editor';

const EditorPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Configuración de timeouts (en milisegundos)
  const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutos de inactividad
  const WARNING_TIME = 2 * 60 * 1000; // Mostrar advertencia 2 min antes
  const ABSOLUTE_TIMEOUT = 2 * 60 * 60 * 1000; // 2 horas máximo

  const logout = useCallback(() => {
    localStorage.removeItem('editorAuth');
    localStorage.removeItem('sessionStart');
    localStorage.removeItem('lastActivity');
    setIsAuthenticated(false);
    setShowWarning(false);
  }, []);

  const updateActivity = useCallback(() => {
    const now = Date.now();
    localStorage.setItem('lastActivity', now.toString());
    setShowWarning(false);
  }, []);

  const checkSession = useCallback(() => {
    const auth = localStorage.getItem('editorAuth');
    const sessionStart = parseInt(localStorage.getItem('sessionStart') || '0');
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
    const now = Date.now();

    if (auth !== 'true') {
      return false;
    }

    // Verificar timeout absoluto
    if (now - sessionStart > ABSOLUTE_TIMEOUT) {
      alert('Tu sesión ha expirado por tiempo máximo (2 horas). Por favor, inicia sesión nuevamente.');
      logout();
      return false;
    }

    // Verificar inactividad
    const inactiveTime = now - lastActivity;
    if (inactiveTime > INACTIVITY_TIMEOUT) {
      alert('Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente.');
      logout();
      return false;
    }

    // Mostrar advertencia si está cerca de expirar
    if (inactiveTime > INACTIVITY_TIMEOUT - WARNING_TIME) {
      setShowWarning(true);
    }

    return true;
  }, [ABSOLUTE_TIMEOUT, INACTIVITY_TIMEOUT, WARNING_TIME, logout]);

  const extendSession = useCallback(() => {
    updateActivity();
    setShowWarning(false);
  }, [updateActivity]);

  useEffect(() => {
    // Verificar si hay una sesión activa al montar
    const auth = localStorage.getItem('editorAuth');
    if (auth === 'true') {
      const isValid = checkSession();
      if (isValid) {
        setIsAuthenticated(true);
        updateActivity();
      }
    }
  }, [checkSession, updateActivity]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Verificar sesión cada minuto
    const intervalId = setInterval(() => {
      checkSession();
    }, 60 * 1000); // Cada 1 minuto

    // Detectar actividad del usuario
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity);
    });

    return () => {
      clearInterval(intervalId);
      events.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [isAuthenticated, checkSession, updateActivity]);

  const handleLoginSuccess = () => {
    const now = Date.now();
    localStorage.setItem('sessionStart', now.toString());
    localStorage.setItem('lastActivity', now.toString());
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <>
      {showWarning && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-yellow-500 text-black px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <span className="font-bold">
            ⚠️ Tu sesión expirará pronto por inactividad
          </span>
          <button
            onClick={extendSession}
            className="bg-black text-yellow-500 px-4 py-2 rounded font-bold hover:bg-gray-800"
          >
            Mantener Sesión Activa
          </button>
        </div>
      )}
      <Editor />
    </>
  );
};

export default EditorPage;
