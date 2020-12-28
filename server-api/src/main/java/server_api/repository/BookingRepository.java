package server_api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import server_api.model.Account;
import server_api.model.Booking;
import server_api.model.Flight;

public interface BookingRepository extends CrudRepository<Booking, Integer> {
	
	List<Booking> findByFlightAndSeatNumber(Flight flight, String seatNumber);
	
	List<Booking> findByAccount(Account account);

}