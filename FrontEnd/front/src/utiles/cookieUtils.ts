// cookieUtils.ts

'use client';

function setCookie(name: string, value: string, days?: number): void {
  if (typeof window !== 'undefined') {
    let expires = '';

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
}

function getCookie(name: string): string | null {
  if (typeof window !== 'undefined') {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

function deleteCookie(name: string): void {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}

export const cookieUtils = { setCookie, getCookie, deleteCookie };
