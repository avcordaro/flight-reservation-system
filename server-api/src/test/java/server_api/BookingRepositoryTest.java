package server_api;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import server_api.model.Account;
import server_api.model.Booking;
import server_api.model.BookingWithFlight;
import server_api.model.Flight;
import server_api.repository.AccountRepository;
import server_api.repository.BookingRepository;
import server_api.repository.FlightRepository;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class BookingRepositoryTest {
	
	@Autowired
    private TestEntityManager testEntityManager;
	
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private FlightRepository flightRepository;
    
    @BeforeEach
    public void setup() {
    	Account a = new Account();
    	a.setFullname("John Smith");
    	a.setEmail("john@email.com");
    	
    	Flight f = new Flight();
    	f.setCode("FA001");
    	
    	Booking b1 = new Booking();
    	b1.setAccount(a);
    	b1.setFlight(f);
    	b1.setFirstname("Steven");
    	b1.setSeatNumber(3);
    	
    	Booking b2 = new Booking();
    	b2.setAccount(a);
    	b2.setFlight(f);
    	b2.setFirstname("John");
    	b2.setSeatNumber(1);
    	
    	Booking b3 = new Booking();
    	b3.setAccount(a);
    	b3.setFlight(f);
    	b3.setFirstname("Robert");
    	b3.setSeatNumber(2);
    	
    	testEntityManager.persist(a);
    	testEntityManager.persist(f);
    	testEntityManager.persist(b1);
    	testEntityManager.persist(b2);
    	testEntityManager.persist(b3);
    	testEntityManager.flush();
    }
    
    @Test
    public void testFindByFlightAndSeatNumber() {
    	Flight f = flightRepository.findByCode("FA001").get(0);
        Booking b = bookingRepository.findByFlightAndSeatNumber(f, 3).get(0);
        assertThat(b.getFirstname()).isEqualTo("Steven");
    }
    
    @Test
    public void testFindByFlightOrderBySeatNumber() {
    	Flight f = flightRepository.findByCode("FA001").get(0);
        List<Booking> bookings = bookingRepository.findByFlightOrderBySeatNumber(f);
        assertThat(bookings.get(0).getSeatNumber()).isEqualTo(1);
    }
   
    @Test
    public void testFindByAccount() {
    	Account a = accountRepository.findByEmail("john@email.com").get(0);
        List<BookingWithFlight> bookings = bookingRepository.findByAccount(a);
        assertThat(bookings.get(0).getFlightCode()).isEqualTo("FA001");
    }
    
    @Test
    public void testFindOccupiedSeatsByFlight() {
    	Flight f = flightRepository.findByCode("FA001").get(0);
        Object[] bookings = bookingRepository.findOccupiedSeatsByFlight(f);
        Integer[] bookings_int = Arrays.copyOf(bookings, bookings.length, Integer[].class);
        Integer[] test_array = {3, 1, 2};
        assertThat(bookings_int).isEqualTo(test_array);
    }
    
}