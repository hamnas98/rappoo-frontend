

export const isAuthenticated = () => {

  return false; 
};

export const getUser = () => {

  return null; 
};

export const logout = () => {
  
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
};