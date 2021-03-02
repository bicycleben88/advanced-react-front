import {
  integer,
  select,
  text,
  relationship,
  virtual,
} from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { ProductImage } from "./ProductImage";

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver: function (item) {
        return `Bananas taste pretty good ${item.price}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
