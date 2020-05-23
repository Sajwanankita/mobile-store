import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
    // Context state
    state = {
        loggedInUser: {
            name: "",
            password: ""
        },
        isLoggedIn: false
    }

    // Method to update state
    setLoggedInUser = user => {
        // console.log("here " + user.loggedInUser.name)
        // console.log("here " + user.loggedInUser.password)
        // console.log("here " + user.isLoggedIn)
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