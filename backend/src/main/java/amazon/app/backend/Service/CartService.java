package amazon.app.backend.Service;

import amazon.app.backend.Entity.Response.CartResponse;

public interface CartService {
    CartResponse addToCart(Long productId, int quantity);
    CartResponse minusFromCart(Long productId, int quantity);
    CartResponse clearCart();
    
}
