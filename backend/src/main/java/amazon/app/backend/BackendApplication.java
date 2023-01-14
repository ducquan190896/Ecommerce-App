package amazon.app.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import amazon.app.backend.Entity.Address;
import amazon.app.backend.Entity.Brand;
import amazon.app.backend.Entity.Cart;
import amazon.app.backend.Entity.Category;
import amazon.app.backend.Entity.City;
import amazon.app.backend.Entity.Country;
import amazon.app.backend.Entity.OrderItem;
import amazon.app.backend.Entity.Orders;
import amazon.app.backend.Entity.Product;
import amazon.app.backend.Entity.Review;
import amazon.app.backend.Entity.Role;
import amazon.app.backend.Entity.Users;
import amazon.app.backend.Repository.AddressRepos;
import amazon.app.backend.Repository.BrandRepos;
import amazon.app.backend.Repository.CartRepos;
import amazon.app.backend.Repository.CategoryRepos;
import amazon.app.backend.Repository.CityRepos;
import amazon.app.backend.Repository.CountryRepos;
import amazon.app.backend.Repository.OrderItemRepos;
import amazon.app.backend.Repository.OrderRepos;
import amazon.app.backend.Repository.ProductRepos;
import amazon.app.backend.Repository.ReviewRepos;
import amazon.app.backend.Repository.UserRepos;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(UserRepos userRepos, ReviewRepos reviewRepos, ProductRepos productRepos, OrderRepos orderRepos, OrderItemRepos orderItemRepos, CountryRepos countryRepos, CityRepos cityRepos, CategoryRepos categoryRepos, CartRepos cartRepos, BrandRepos brandRepos, AddressRepos addressRepos) {
		return args -> {
			Users user1 = new Users("quan@gmail.com", "quan", new BCryptPasswordEncoder().encode("123456"), Role.USER);
			Users admin = new Users("admin@gmail.com", "admin", new BCryptPasswordEncoder().encode("123456"), Role.ADMIN);
			Users user2 = new Users("quan2@gmail.com", "quan2", new BCryptPasswordEncoder().encode("123456"), Role.USER);
			userRepos.save(user1);
			userRepos.save(admin);
			userRepos.save(user2);
			
			Brand nike = new Brand("nike");
			Brand addidas = new Brand("addidas");
			Brand newBalance = new Brand("new balance");
			Brand puma = new Brand("Puma");
			Brand reebok = new Brand("reebok");
			brandRepos.save(nike);
			brandRepos.save(addidas);
			brandRepos.save(newBalance);
			brandRepos.save(puma);
			brandRepos.save(reebok);

			Category shoe = new Category("shoe");
			Category shirt = new Category("shirt");
			Category hat = new Category("hat");
			Category glove = new Category("glove");
			Category pant = new Category("pant");
			categoryRepos.save(shoe);
			categoryRepos.save(shirt);
			categoryRepos.save(hat);
			categoryRepos.save(glove);
			categoryRepos.save(pant);

			Product product1 = new Product("shoes nike xx12", "football shoes", 200, 100,  nike, "000111", shoe);
			productRepos.save(product1);
			Product product2 = new Product("shoes addidas 2019", "football shoes", 200, 100,  addidas, "000112", shoe);
			productRepos.save(product2);
			Product product3 = new Product("shoes reebok liverpool", "football shoes 2", 200, 100,  reebok, "000113", shoe);
			productRepos.save(product3);
			Product product4 = new Product("shirt puma helsinki", "football shirt", 200, 100,  puma, "000114", shirt);
			productRepos.save(product4);
			Product product5 = new Product("pant new balance chelsea", "football pant", 200, 100,  newBalance, "000115", pant);
			productRepos.save(product5);
			Product product6 = new Product("goalkeeper gloves Neuer", "football glove for goalkeeper", 200, 100,  newBalance, "000116", glove);
			productRepos.save(product6);
			Product product7 = new Product("summer hat reebok", "football glove for goalkeeper", 200, 100,  reebok, "000117", glove);
			productRepos.save(product7);
			Product product8 = new Product("sweet pant", "football glove for goalkeeper", 200, 100,  addidas, "000118", pant);
			productRepos.save(product8);
			Product product9 = new Product("sweet pant", "winter glove", 200, 100,  nike, "000119", glove);
			productRepos.save(product9);
			Product product10 = new Product("sweet pant", "winter glove", 200, 100,  nike, "000120", glove);
			productRepos.save(product10);

			Country finland = new Country("finland");
			Country sweden = new Country("sweden");
			countryRepos.save(finland);
			countryRepos.save(sweden);

			City helsinki = new City("helsinki", finland);
			City oulu = new City("oulu", finland);
			City tampere = new City("tampere", finland);
			City stockholm = new City("stockholm", sweden);
			City malmo = new City("malmo", sweden);
			cityRepos.save(helsinki);
			cityRepos.save(oulu);
			cityRepos.save(tampere);
			cityRepos.save(stockholm);
			cityRepos.save(malmo);

			Review review1 = new Review("it is good", 3, product1, user1);
			Review review2 = new Review("it is helpful", 2, product2, user1);
			Review review3 = new Review("it is normal",4, product3, user1);
			Review review4 = new Review("it is useless", 1, product4, user1);
			Review review5 = new Review("it is acceptable", 2, product5, user1);
			Review review6 = new Review("it is good", 3, product6, user1);
			Review review7 = new Review("it is good", 5, product7, user1);
			Review review8 = new Review("it is good", 4, product8, user1);
			Review review9 = new Review("it is ugly", 1, product8, user2);
			Review review10 = new Review("it is beautiful", 3, product10, user2);
			Review review11 = new Review("it is convenient", 5, product9, user2);
			Review review12 = new Review("it is convenient", 5, product1, user2);

			reviewRepos.save(review1);
			reviewRepos.save(review2);
			reviewRepos.save(review3);
			reviewRepos.save(review4);
			reviewRepos.save(review5);
			reviewRepos.save(review6);
			reviewRepos.save(review7);
			reviewRepos.save(review8);
			reviewRepos.save(review9);
			reviewRepos.save(review10);
			reviewRepos.save(review11);
			reviewRepos.save(review12);

			Cart cart1 = new Cart(user1);
			Cart cart2 = new Cart(user2);
			cartRepos.save(cart1);
			cartRepos.save(cart2);

			Orders order1 =  new Orders(user1, "15123asdfasdf", 0, 0);
			orderRepos.save(order1);

			Address address1 = new Address("pavo havaksen tie 6", "oulu", "finland", "90575", order1);
			order1.setBillingAddress(address1);
			address1.setBilling(true);

			Address address2 = new Address("pavo havaksen tie 3", "oulu", "finland", "90575", order1);
		
			order1.setShippingAddress(address2);
			address2.setShipping(true);
			orderRepos.save(order1);
			

			

		};
	}
}
