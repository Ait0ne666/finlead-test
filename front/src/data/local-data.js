






export const saveJwt = (jwt) => {
    localStorage.setItem('finlead-jwt-token', jwt)
}

export const getJwt = () => {
    return localStorage.getItem('finlead-jwt-token')
}

export const clearJwt = () => {
    localStorage.removeItem('finlead-jwt-token')
}


export const saverefresh = (refresh) => {
    localStorage.setItem('finlead-refresh-token', refresh)
}

export const getrefresh = () => {
    return localStorage.getItem('finlead-refresh-token')
}

export const clearrefresh = () => {
    localStorage.removeItem('finlead-refresh-token')
}




export const saveUser = (user) => {
    const jsonString = JSON.stringify(user)


    localStorage.setItem('finleadUser', jsonString)
}



export const getUser = () => {
    const jsonString = localStorage.getItem('finleadUser')
    if (jsonString) {
        const user = JSON.parse(jsonString)
        return user
    }

    return undefined
}


export const deleteUser = () => {
    localStorage.removeItem('finleadUser')
}