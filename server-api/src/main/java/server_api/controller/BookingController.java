package server_api.controller;

import server_api.repository.BookingRepository;
import server_api.repository.FlightRepository;
import server_api.repository.AccountRepository;
import server_api.model.Booking;
import server_api.model.BookingWithFlight;
import server_api.model.Flight;
import server_api.model.Account;

import java.util.ArrayList;
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
	public @ResponseBody String createBooking(@RequestParam String flightCode, @RequestParam String email, 
			@RequestParam String firstname, @RequestParam String lastname, @RequestParam String phone, 
			@RequestParam String age, @RequestParam String seatNumber) {
		
		List<Flight> flight = flightRepository.findByCode(flightCode);
		List<Account> account = accountRepository.findByEmail(email);

		if(flight.isEmpty()) {
			return "Flight does not exist";
		}
		if(account.isEmpty()) {
			return "Account does not exist";
		}

		List<Booking> booking = bookingRepository.findByFlightAndSeatNumber(flight.get(0), Integer.parseInt(seatNumber));
		if(!booking.isEmpty()) {
			return "Seat already taken";
		}
		
		Booking b = new Booking();
		b.setFlight(flight.get(0));
		b.setAccount(account.get(0));
		b.setFirstname(firstname);
		b.setLastname(lastname);
		b.setPhone(phone);
		b.setAge(Integer.parseInt(age));
		b.setSeatNumber(Integer.parseInt(seatNumber));
		bookingRepository.save(b);
		return "New booking saved";
	}
	
	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Booking> allBookings() {
		
		return bookingRepository.findAll();
	}
	
	@GetMapping(path = "/find")
	public @ResponseBody List<Booking> findBooking(@RequestParam String email, @RequestParam String flightCode) {
		
		List<Flight> flight = flightRepository.findByCode(flightCode);
		List<Account> account = accountRepository.findByEmail(email);

		if(flight.isEmpty()) {
			return new ArrayList<Booking>();
		}
		if(account.isEmpty()) {
			return new ArrayList<Booking>();
		}
		
		return bookingRepository.findByAccountAndFlight(account.get(0), flight.get(0));
	}
	
	@GetMapping(path = "/find-by-account")
	public @ResponseBody List<BookingWithFlight> findByAccount(@RequestParam String email) {
		
		List<Account> account = accountRepository.findByEmail(email);
		
		if(account.isEmpty()) {
			return new ArrayList<BookingWithFlight>();
		}
		
		return bookingRepository.findByAccount(account.get(0));
	}

	@GetMapping(path = "/find-by-flight")
	public @ResponseBody List<Booking> findByFlight(@RequestParam String flightCode) {
		
		List<Flight> flight = flightRepository.findByCode(flightCode);
		
		if(flight.isEmpty()) {
			return new ArrayList<Booking>();
		}
		
		return bookingRepository.findByFlight(flight.get(0));
	}
	
	@DeleteMapping(path = "/delete")
	public @ResponseBody String deleteBooking(@RequestParam String id) {
		
		Optional<Booking> booking = bookingRepository.findById(Integer.parseInt(id));
		if(!booking.isPresent()) {
			return "Booking does not exist";
		}
		bookingRepository.delete(booking.get());
		return "Booking deleted";
	}
}