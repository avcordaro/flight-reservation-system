package server_api.controller;

import server_api.repository.BookingRepository;
import server_api.repository.FlightRepository;
import server_api.repository.AccountRepository;
import server_api.model.Booking;
import server_api.model.Flight;
import server_api.model.Account;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/booking")
public class BookingController {
	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private FlightRepository flightRepository;

	@Autowired
	private AccountRepository accountRepository;
	
	@PostMapping(path = "/create")
	public @ResponseBody String createBooking(@RequestParam String flightCode, @RequestParam String username, 
			@RequestParam String firstname, @RequestParam String lastname, 
			@RequestParam String phone, @RequestParam String email,
			@RequestParam String age, @RequestParam String seatNumber) {
		
		List<Flight> flight = flightRepository.findByCode(flightCode);
		List<Account> account = accountRepository.findByUsername(username);

		if(flight.isEmpty()) {
			return "Flight does not exist";
		}
		if(account.isEmpty()) {
			return "Account does not exist";
		}

		List<Booking> booking = bookingRepository.findByFlightAndSeatNumber(flight.get(0), seatNumber);
		if(!booking.isEmpty()) {
			return "Seat already taken";
		}
		
		Booking b = new Booking();
		b.setFlight(flight.get(0));
		b.setAccount(account.get(0));
		b.setFirstname(firstname);
		b.setLastname(lastname);
		b.setPhone(phone);
		b.setEmail(email);
		b.setAge(Integer.parseInt(age));
		b.setSeatNumber(seatNumber);
		bookingRepository.save(b);
		return "New booking saved";
	}
	
	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Booking> allBookings() {
		
		return bookingRepository.findAll();
	}
	
	@GetMapping(path = "/find")
	public @ResponseBody List<Booking> findByAccount(@RequestParam String username) {
		
		List<Account> account = accountRepository.findByUsername(username);
		
		if(account.isEmpty()) {
			return null;
		}
		
		return bookingRepository.findByAccount(account.get(0));
	}

	
	@DeleteMapping(path = "/delete")
	public @ResponseBody String deleteBooking(@RequestParam String id) {
		
		Optional<Booking> booking = bookingRepository.findById(Integer.parseInt(id));
		if(booking.isPresent()) {
			return "Booking does not exist";
		}
		bookingRepository.delete(booking.get());
		return "Booking deleted";
		

	}
}