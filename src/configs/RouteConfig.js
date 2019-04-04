import { createAppContainer, createStackNavigator} from 'react-navigation'
import { HomeScreens, SignInScreens} from '../screens'

const rootStack = createStackNavigator({
    Home : HomeScreens,
    SignIn : SignInScreens
},{
    initialRouteName: 'SignIn',
    headerMode:'none',
})

export const AppContainer = createAppContainer(rootStack)