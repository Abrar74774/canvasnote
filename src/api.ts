const url = import.meta.env.VITE_BACKEND_URL + '/api';

export function testConnectivity() {
    fetch(url)
    .then(res => res.json())
    .then(info => console.log(info))
    .catch(err => console.error("Connection to backend failed: ", err));
}

//export function addUser
