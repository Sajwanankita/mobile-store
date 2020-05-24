import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    state = {
        loggedInUser: {
            name: "",
            password: ""
        },
        isLoggedIn: false
    }

    setLoggedInUser = user => {
        this.setState(prevState => ({ loggedInUser: user.loggedInUser, isLoggedIn: user.isLoggedIn }))
    }

    render() {
        const { children } = this.props
        const { loggedInUser } = this.state
        const { setLoggedInUser } = this

        return (
            <UserContext.Provider
                value={{
                    loggedInUser,
                    setLoggedInUser,
                }}
            >
                {children}
            </UserContext.Provider>
        )
    }
}

export default UserContext

export { UserProvider }