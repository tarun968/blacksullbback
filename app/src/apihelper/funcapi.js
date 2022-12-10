export const EditName = async (Email,FirstName,LastName,Token) => {
    console.log("user data ",FirstName,LastName,Email)
    try {
        const response = await fetch(`http://localhost:5000/${Email}/editname`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`
            },
            body: JSON.stringify({FirstName,LastName})
        })
        return await response.json()
    } catch (err) {
        return console.log("err", err)
    }
}


export const getUser = async (Email,Token) => {
    try {
        const response = await fetch(`http://localhost:5000/${Email}/user`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Token}`
            },
        })
        return await response.json()
    } catch (err) {
        return console.log("err", err)
    }
}