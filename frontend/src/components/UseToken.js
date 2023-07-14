import { useState } from 'react';

function UseToken() {
  function getToken() {
    const userToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    return userToken || '';
  }

  const [token, setToken] = useState(getToken());

  function saveToken(userToken) {
    document.cookie = `access_token=${userToken}; path=/; secure; sameSite=strict;`;
    setToken(userToken);
  }

  function removeToken() {
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setToken(null);
  }

  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}

export default UseToken;
