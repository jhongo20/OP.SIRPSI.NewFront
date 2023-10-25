// import { JourneyAction, JourneyActionType } from "../actions/journey.actions";
// import { Journey } from "../models/journey";


// const initialState: Array<Journey> = [
//     {
//         origin: '',
//         destination: '',
//         price: 0,
//       flights: []
//     },
//   ];
// export function JourneyReducer(
//   state: Array<Journey> = initialState,
//   action: JourneyAction
// ) {
//   switch (action.type) {
//     case JourneyActionType.ADD_ITEM:
//       return [...state, action.payload];
//     default:
//       return state;
//   }
// }