package amazon.app.backend.Service;

import amazon.app.backend.Entity.Address;

public interface AddressService {
    Address saveBillingAddress(Address address);
    Address saveShippingAddress(Address address);
    Address updateAddress(Long id, Address address);
   Address getAddressById(Long id);
}
