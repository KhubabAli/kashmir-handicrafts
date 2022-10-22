import {CardField, useStripe} from "@stripe/stripe-react-native";
import {useDispatch} from "react-redux";

import {saveCard} from "../store/addressBook";

export default () => {
    const dispatch = useDispatch();
    useStripe();

    const handlePayPressed = async () => {
        const response = await fetch
    }
    return (
        <CardField onCardChange={card => {
            dispatch(saveCard(card));
        }}
                   postalCodeEnabled={true}
                   placeholder={{
                       number: '4242 4242 4242 4242'
                   }}
                   cardStyle={{
                       borderRadius: 5,
                   }}
                   style={{
                       width: "100%",
                       height: 50,
                       marginVertical: 30
                   }}
        />
    )
}