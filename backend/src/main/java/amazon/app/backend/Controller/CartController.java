package amazon.app.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Response.CartResponse;
import amazon.app.backend.Service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    CartService cartService;

    @PutMapping("/addToCart/product/{productId}/quantity/{quantity}")
    public ResponseEntity<CartResponse> addToCart(@PathVariable Long productId, @PathVariable int quantity) {
        return new ResponseEntity<CartResponse>(cartService.addToCart(productId, quantity), HttpStatus.ACCEPTED);
    }
    @PutMapping("/minusFromCart/product/{productId}/quantity/{quantity}")
    public ResponseEntity<CartResponse> minusFromCart(@PathVariable Long productId, @PathVariable int quantity) {
        return new ResponseEntity<CartResponse>(cartService.minusFromCart(productId, quantity), HttpStatus.ACCEPTED);
    }
    @PutMapping("/clearCart")
    public ResponseEntity<CartResponse> clearClart() {
        return new ResponseEntity<CartResponse>(cartService.clearCart(), HttpStatus.ACCEPTED);
    }
}
