import { createContext } from "react";
const UserContext = createContext({});

type WishlistType = {
    id: string,
    title: string,
    url: string | null,
    description: string | null,
    price: string,
}

type UserType = {
    person: string,
    wishlist?: [WishlistType],
    giftsTo: string
}

enum UserActionKind {
    addToList,
    removeFromList,
    editItemFromList,
    addNewUser
}

interface CountAction {
    type: UserActionKind;
    payload: any;
}

function userReducer(state: UserType, action: CountAction) {

    switch (action.type) {

        case UserActionKind.addNewUser: return action.payload;

        case UserActionKind.addToList: {
            if (state['wishlist'] !== undefined) {
                return {
                    ...state,
                    wishlist: [...state.wishlist, action.payload]
                }
            }
            
            return {
                ...state,
                wishlist: [action.payload]
            }
        }

        case UserActionKind.removeFromList: {
            if(state['wishlist'] === undefined) {
                return
            }

            const newList = [...state.wishlist];
            newList.splice(newList.findIndex((elem) => elem.id === action.payload), 1)
            return {
                ...state,
                wishlist: newList
            }
        }

        case UserActionKind.editItemFromList: {

            if(state['wishlist'] === undefined) {
                return
            }

            const newList = [...state.wishlist];
            newList[newList.findIndex((elem) => elem.id === action.payload.id)] = action.payload
            return {
                ...state,
                wishlist: newList
            }
        }


        default: throw new Error('Unrecognized Action')

    }
}

type UserContextVar = {
    userState: UserType;
    dispatchUserEvent: React.Dispatch<CountAction>;
}

export { type UserContextVar, type WishlistType, UserContext, userReducer, UserActionKind }