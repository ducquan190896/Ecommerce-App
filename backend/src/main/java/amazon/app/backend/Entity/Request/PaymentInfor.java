package amazon.app.backend.Entity.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class PaymentInfor {
    private int amount;
    private String currency;
    // private String  receipt_email;
}
