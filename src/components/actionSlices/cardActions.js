import { uiActions } from "./UI_Slice";
import { cartActions } from "./CardSlice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://reduxapicallingtest-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");
      if (!response.ok) {
        throw new Error("Could not fetch data!");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      // dispatch(cartActions.replaceCart(cartData));
      //switching to this to avoid empty array or undefined error if card is empty
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

export const sendCardData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );
    const sendRequest = async () => {
      const response = await fetch("https://reduxapicallingtest-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
        method: "PUT",
        //   body: JSON.stringify(cart),
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error!",
          message: "Sending cart data failed",
        })
      );
    }
  };
};

// export default fetchCartData;
