package amazon.app.backend.Service.Implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import amazon.app.backend.Entity.Address;
import amazon.app.backend.Exception.EntityNotFoundException;
import amazon.app.backend.Repository.AddressRepos;
import amazon.app.backend.Service.AddressService;

@Service
public class AddressServiceIml implements AddressService {
    @Autowired
    AddressRepos addressRepos;

    @Override
    public Address saveBillingAddress(Address address) {
        address.setBilling(true);
        address.setShipping(false);
        return addressRepos.save(address);
    }

    @Override
    public Address saveShippingAddress(Address address) {
        address.setBilling(false);
        address.setShipping(true);
        return addressRepos.save(address);
    }

    @Override
    public Address updateAddress(Long id, Address address) {
        Address addressOld = ischeck(id);
        addressOld.setCity(address.getCity());
        addressOld.setCountry(address.getCountry());
        addressOld.setStreet(address.getStreet());
        addressOld.setZipCode(address.getZipCode());
        return addressRepos.save(addressOld);
    }

   

    private Address ischeck(Long id) {
        Optional<Address> entity = addressRepos.findById(id);
        if(!entity.isPresent()) {
            throw new EntityNotFoundException("the address with id " + id + " not found");
        }
        Address address = entity.get();
        return address;
    }
    
}
