import { createAppContainer, createStackNavigator} from 'react-navigation'
import { HomeScreens, SignInScreens, SplashScreen} from '../screens'

const rootStack = createStackNavigator({
    Home : HomeScreens,
    SignIn : SignInScreens,
    Splash : SplashScreen
},{
    initialRouteName: 'Splash',
    headerMode:'none',
})

export const AppContainer = createAppContainer(rootStack)