// src/utils/auth.js
export const saveUserId = (userId) => {
    localStorage.setItem('userId', userId);
};

export const getUserId = () => {
    return localStorage.getItem('userId');
};

export const clearUserId = () => {
    localStorage.removeItem('userId');
};
