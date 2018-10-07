import { NavigationActions } from 'react-navigation';
import Constants from '../Constants/Constants';

export const resetNavigator = (navigation) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: Constants.INITIAL_ROUTE_NAME })
        ]
    });
    navigation.dispatch(resetAction);
};