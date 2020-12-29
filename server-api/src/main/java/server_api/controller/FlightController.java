package server_api.controller;

import server_api.repository.BookingRepository;
import server_api.repository.FlightRepository;
import server_api.model.Flight;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/flight")
public class FlightController {
	@Autowired
	private FlightRepository flightRepository;
	@Autowired
	private BookingRepository bookingRepository;
	
	@PostMapping(path = "/create")
	public @ResponseBody String createFlight(@RequestParam String code, @RequestParam String date, 
			@RequestParam String source, @RequestParam String destination, 
			@RequestParam String srcCity, @RequestParam String destCity, 
			@RequestParam String departure, @RequestParam String arrival) {
		
		if(!flightRepository.findByCode(code).isEmpty()) {
			return "Flight code already taken";
		}
		Flight f = new Flight();
		f.setCode(code);
		f.setDate(Date.valueOf(date));
		f.setSource(source);
		f.setDestination(destination);
		f.setSrcCity(srcCity);
		f.setDestCity(destCity);
		f.setDeparture(Time.valueOf(departure));
		f.setArrival(Time.valueOf(arrival));
		flightRepository.save(f);
		return "New flight saved";
	}
	
	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Flight> allFlights() {
		
		return flightRepository.findAll();
	}
	
	@GetMapping(path = "/all-chronological")
	public @ResponseBody Iterable<Flight> allFlightsChronological() {
		
		return flightRepository.findAllByOrderByDateAscDepartureAsc();
	}

	@GetMapping(path = "/occupied-seats")
	public @ResponseBody Object[] findOccupiedSeatsForFlight(@RequestParam String code) {
		
		List<Flight> flight = flightRepository.findByCode(code);
		if(flight.isEmpty()) {
			return new Object[0];
		}
		return bookingRepository.findOccupiedSeatsByFlight(flight.get(0));
	}
	
	@GetMapping(path = "/find")
	public @ResponseBody List<Flight> findFlight(@RequestParam String code) {
		
		return flightRepository.findByCode(code);
	}
	
	@DeleteMapping(path = "/delete")
	public @ResponseBody String deleteFlight(@RequestParam String code) {
		
		List<Flight> flight_list = flightRepository.findByCode(code);
		if(flight_list.isEmpty()) {
			return "Flight does not exist";
		}
		flightRepository.delete(flight_list.get(0));
		return "Flight deleted";
	}
}