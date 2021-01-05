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
import org.springframework.web.bind.annotation.RequestBody;
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
	public @ResponseBody String createBooking(@RequestParam String flightCode, @RequestParam String email, @RequestBody Booking newBooking) {
		
		List<Flight> flight = flightRepository.findByCode(flightCode);
		List<Account> account = accountRepository.findByEmail(email);

		if(flight.isEmpty()) {
			return "Flight does not exist";
		}
		if(account.isEmpty()) {
			return "Account does not exist";
		}

		List<Booking> booking = bookingRepository.findByFlightAndSeatNumber(flight.get(0), newBooking.getSeatNumber());
		if(!booking.isEmpty()) {
			return "Seat already taken";
		}
		
		newBooking.setFlight(flight.get(0));
		newBooking.setAccount(account.get(0));
		bookingRepository.save(newBooking);
		return "New booking saved";
	}

	@PostMapping(path = "/edit")
	public @ResponseBody String editBooking(@RequestParam String id, @RequestParam String flightCode, @RequestBody Booking updatedBooking) {
		
		Booking booking = bookingRepository.findById(Integer.parseInt(id)).get();
		
		if(booking.getSeatNumber() != updatedBooking.getSeatNumber()) {
			Flight flight = flightRepository.findByCode(flightCode).get(0);
			List<Booking> bookings = bookingRepository.findByFlightAndSeatNumber(flight, updatedBooking.getSeatNumber());
			if(!bookings.isEmpty()) {
				return "Seat already taken";
			}
		}
		
		booking.setFirstname(updatedBooking.getFirstname());
		booking.setLastname(updatedBooking.getLastname());
		booking.setPhone(updatedBooking.getPhone());
		booking.setAge(updatedBooking.getAge());
		booking.setSeatNumber(updatedBooking.getSeatNumber());
		bookingRepository.save(booking);
		
		return "Booking updated.";
	}
	
	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Booking> allBookings() {
		
		return bookingRepository.findAll();
	}
	
	@GetMapping(path = "/find")
	public @ResponseBody Booking findBooking(@RequestParam String id) {
		
		return bookingRepository.findById(Integer.parseInt(id)).get();
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
		
		return bookingRepository.findByFlightOrderBySeatNumber(flight.get(0));
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