import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./components/actionSlices/UI_Slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const showCard = useSelector((state) => state.ui.cardIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCardData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      const response = await fetch("https://reduxapicallingtest-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
      const responseData = await response.json();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully",
        })
      );
    };
    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCardData().catch((error) =>
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "error!",
          message: "Sending cart data failed",
        })
      )
    );
  }, [cart, dispatch]);
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCard && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
