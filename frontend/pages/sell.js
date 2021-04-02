import CreateProduct from "../components/CreateProduct";
import PleaseSignIn from "../components/PleaseSignIn";

export default function SalePage() {
  return (
    <div>
      <PleaseSignIn>
        <CreateProduct />
      </PleaseSignIn>
    </div>
  );
}
