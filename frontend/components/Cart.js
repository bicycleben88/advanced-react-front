import styled from "styled-components";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import formatMoney from "../lib/formatMoney";
import { useUser } from "./User";
import { useCart } from "../lib/cartState";
import calcTotalPrice from "../lib/calcTotalPrice";
import CloseButton from "./styles/CloseButton";
import RemoveFromCart from "./RemoveFromCart";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;
function CartItem({ item }) {
  const { product } = item;
  //   console.log(product);
  return (
    <CartItemStyles>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
        width="100"
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * item.quantity)} -
          <en>
            {item.quantity} &times; {formatMoney(product.price)} each
          </en>
        </p>
      </div>
      <RemoveFromCart id={item.id} />
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const { cartOpen, closeCart } = useCart();
  if (!me) return null;
  return (
    <CartStyles open={cartOpen}>
      <header>
        <Supreme>{me.name}</Supreme>
      </header>
      <CloseButton onClick={closeCart}> &times; </CloseButton>
      <ul>
        {me.cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
