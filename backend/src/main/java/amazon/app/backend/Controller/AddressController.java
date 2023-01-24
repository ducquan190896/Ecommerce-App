package amazon.app.backend.Controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import amazon.app.backend.Entity.Address;
import amazon.app.backend.Service.AddressService;

@RestController
@RequestMapping("/api/address")
public class AddressController {
    @Autowired
    AddressService addressService;

    @PostMapping("/shippingAddress")
    public ResponseEntity<Address> addShippingAddress(@Valid @RequestBody Address address) {
        return new ResponseEntity<Address>(addressService.saveShippingAddress(address), HttpStatus.CREATED);
    }
    @PostMapping("/billingAddress")
    public ResponseEntity<Address> addBillingAddress(@Valid @RequestBody Address address) {
        return new ResponseEntity<Address>(addressService.saveBillingAddress(address), HttpStatus.CREATED);
    }
    @PutMapping("/id/{id}")
    public ResponseEntity<Address> updateAddress(@Valid @RequestBody Address address, @PathVariable Long id) {
        return new ResponseEntity<Address>(addressService.updateAddress(id, address), HttpStatus.CREATED);
    }
    @GetMapping("/id/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable Long id) {
        return new ResponseEntity<Address>(addressService.getAddressById(id), HttpStatus.CREATED);
    }
}
