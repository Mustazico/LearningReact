import {createContext, useContext, useState, useEffect} from 'react'
import {getCurrentUser} from '../lib/appwrite'
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if the user is logged in
    // If the user is logged in, set the user and isLoggedIn state to true
    // Else, set the user and isLoggedIn state to false
    // Determine if to redirect the user to the login page or the home page
    useEffect(() => {
        getCurrentUser().then((res) => {
            if(res) {
                setIsLoggedIn(True);
                setUser(res);
            } else {
                setIsLoggedIn(False);
                setUser(null);
            }
        }) .catch((error) => {
            console.log(error);
        })
            .finally(() => {
                setIsLoading(false);
        });
    }, []);

    return (
        // Set inside RootLayout to wrap the entire application
        <GlobalContext.Provider
        // Add the global state here
        value = {{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}
        >


            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;