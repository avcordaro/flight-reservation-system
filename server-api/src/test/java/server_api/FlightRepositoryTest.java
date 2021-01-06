package server_api;

import static org.assertj.core.api.Assertions.assertThat;

import java.sql.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import server_api.model.Flight;
import server_api.repository.FlightRepository;

@DataJpaTest
@ExtendWith(SpringExtension.class)
public class FlightRepositoryTest {
	
	@Autowired
    private TestEntityManager testEntityManager;
	
    @Autowired
    private FlightRepository flightRepository;

    @BeforeEach
    public void setup() {
    	Flight f1 = new Flight();
    	f1.setCode("FA001");
    	f1.setDate(Date.valueOf("2021-01-02"));
    	f1.setSource("LHR");
    	f1.setDestination("LAX");

    	Flight f2 = new Flight();
    	f2.setCode("FA002");
    	f2.setDate(Date.valueOf("2021-01-01"));
    	f2.setSource("LGW");
    	f2.setDestination("LAX");
    	
    	testEntityManager.persist(f1);
    	testEntityManager.persist(f2);
    	testEntityManager.flush();
    }
    
    @Test
    public void testFindByCode() {
        Flight f = flightRepository.findByCode("FA001").get(0);
        assertThat(f.getSource()).isEqualTo("LHR");
    }
   
    @Test
    public void testFindAllByOrderByDate() {
        List<Flight> flights = flightRepository.findAllByOrderByDateAscDepartureAsc();
        assertThat(flights.get(0).getCode()).isEqualTo("FA002");
    }
}