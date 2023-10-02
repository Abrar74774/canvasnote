const url = import.meta.env.VITE_BACKEND_URL + '/api';

export function testConnectivity() {
    fetch(url)
    .then(res => res.json())
    .then(info => console.log(info))
    .catch(err => console.error("Connection to backend failed: ", err));
}

export function addUser(user: any) {
    fetch(url + '/users', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

export function saveData(canvasList: any[]) {
    console.log("saved data")
    window.localStorage.setItem("canvasnote_state", JSON.stringify(canvasList));
}

export function loadData() {
    const data = window.localStorage.getItem("canvasnote_state") || "[]";
    return JSON.parse(data);
}

//export function addUser
