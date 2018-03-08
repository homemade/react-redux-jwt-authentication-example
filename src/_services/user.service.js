import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout
};

function login(username, password, orguuid, campaignuuid) {
  return raiselyLogin(username, password, orguuid);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}

async function raiselyLogin(username, password, orguuid) {
  if (!username || username == "") {
    return null;
  }
  let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, "organisationUuid": orguuid })
  };
  let request = await fetch('https://api.raisely.com/v3/login', requestOptions)
  let user = await request.json();
  if (user && user.token && user.data) {
    let requestOptions = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + user.token }
    };
    let request = await fetch('https://api.raisely.com/v3/profiles?user='+user.data.uuid, requestOptions);
    let profiles = await request.json();
    user.profiles = profiles;
  }
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};
