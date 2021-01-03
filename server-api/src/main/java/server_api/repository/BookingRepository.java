package server_api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import server_api.model.Account;
import server_api.model.Booking;
import server_api.model.BookingWithFlight;
import server_api.model.Flight;

public interface BookingRepository extends CrudRepository<Booking, Integer> {
	
	List<Booking> findByFlightAndSeatNumber(Flight flight, int seatNumber);
	
	List<Booking> findByFlightOrderBySeatNumber(Flight flight);
	
	@Query("SELECT b.id AS id, b.firstname AS firstname, b.lastname AS lastname, b.phone AS phone, b.age AS age,"
			+ "b.seatNumber AS seatNumber, f.code AS flightCode, f.source AS source, f.destination AS destination, "
			+ "f.date AS date, f.srcCity as srcCity, f.destCity as destCity, f.departure AS departure, f.arrival AS "
			+ "arrival FROM Booking AS b INNER JOIN b.flight AS f WHERE b.account = ?1 ORDER BY date ASC, departure ASC, id ASC")
	List<BookingWithFlight> findByAccount(Account account);
	
	@Query("SELECT b.seatNumber AS seatNumber FROM Booking AS b INNER JOIN b.flight AS f WHERE b.flight = ?1")
	Object[] findOccupiedSeatsByFlight(Flight flight);
}