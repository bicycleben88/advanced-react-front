import { KeystoneContext, SessionStore } from "@keystone-next/types";

import {
  CartItemCreateInput,
  OrderCreateInput,
} from "../.keystone/schema-types";
import stripeConfig from "../lib/Stripe";

const graphql = String.raw;
async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error("Sorry you must be logged in");
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          photo {
            id 
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
  });
  console.dir(user, { depth: null });

  const cartItems = user.cart.filter((cartItem) => cartItem.product);

  const amount = cartItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);
  console.log({ amount });

  const charge = await stripeConfig.paymentIntents
    .create({
      amount: 4000009808,
      currency: "USD",
      confirm: true,
      payment_method: token,
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });
}

export default checkout;
