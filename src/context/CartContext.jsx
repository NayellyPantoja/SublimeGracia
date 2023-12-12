import { createContext } from "react"

export const CartContext = createContext();

const CartContextComponent = ({children}) => {
  return <CartContext.Provider>
    {children}
  </CartContext.Provider>
}

export default CartContextComponent