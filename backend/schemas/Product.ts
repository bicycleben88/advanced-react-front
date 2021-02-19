import { integer, select, text, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { ProductImage } from "./ProductImage";

export const Product = list({
  // Todo
  // access:
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    photo: relationship({
      ref: "ProductImage.product",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAIABLE" },
        { label: "Unavailable", value: "UNAVAIABLE" },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
    }),
    price: integer(),
    // Todo Photo
  },
});
