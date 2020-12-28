package server_api.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import server_api.model.Flight;

public interface FlightRepository extends CrudRepository<Flight, Integer> {
	
	List<Flight> findByCode(String code);
	
	List<Flight> findAllByOrderByDateAscDepartureAsc();
}