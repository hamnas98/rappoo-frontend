// This file is now simplified - AuthContext handles most logic
// Keep these for backward compatibility if needed

export const isAuthenticated = () => {
  // This will be handled by AuthContext
  // Kept for any components still using it
  return false; // Will be replaced by useAuth hook
};

export const getUser = () => {
  // This will be handled by AuthContext
  return null; // Will be replaced by useAuth hook
};

export const logout = () => {
  // This will be handled by AuthContext
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
};