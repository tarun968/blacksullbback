
export const signup = async (user) => {
    console.log("user data ", user)
    try {
        const response = await fetch(`http://localhost:5000/user/signup`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        return console.log("err", err)
    }
}

export const signin = async (user) => {
    console.log("", user)
    try {
        const response = await fetch(`http://localhost:5000/user/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        return console.log("err", err)
    }
}

export const authenticate = (data, next) => {
    console.log('data', data)
    if (typeof window !== 'undefined') {
        localStorage.setItem("jwt", JSON.stringify(data))
        next();
    }
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem("jwt")
        next();
    }
    return fetch(`http://localhost:5000/user/signout`, {
        method: 'POST'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else {
        return false
    }
}